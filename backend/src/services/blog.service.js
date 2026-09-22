const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
const { SEED_BLOGS } = require("../db/seedBlogs");

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const STORE_FILE = path.join(DATA_DIR, "lms_store.json");

/**
 * Helper to slugify strings into clean kebab-case URL slugs
 */
const slugify = (text) => {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Helper to dynamically extract <h2> and <h3> headings from HTML content
 * for the Auto-Table of Contents (Auto-TOC)
 */
const extractHeadings = (htmlContent) => {
  if (!htmlContent) return [];
  const regex = /<(h[23])\b[^>]*>(.*?)<\/\1>/gi;
  const headings = [];
  let match;
  let index = 1;

  while ((match = regex.exec(htmlContent)) !== null) {
    const level = match[1].toLowerCase();
    const rawText = match[2].replace(/<[^>]+>/g, "").trim();
    if (rawText) {
      headings.push({
        id: `heading-${index++}-${slugify(rawText).slice(0, 30)}`,
        text: rawText,
        level: level === "h2" ? 2 : 3,
      });
    }
  }

  return headings;
};

/**
 * Helper to generate valid Schema.org JSON-LD
 * Includes: FAQPage schema, BreadcrumbList schema, and Article/BlogPosting schema
 */
const generateSchemaJsonLd = (blog) => {
  const baseUrl = "https://dizitaladda.com";
  const blogUrl = `${baseUrl}/blog/${blog.slug}`;
  const publishDate = blog.created_at || new Date().toISOString();
  const modifiedDate = blog.updated_at || publishDate;

  // 1. Article / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.meta_description || blog.summary,
    image: blog.featured_image ? [blog.featured_image] : [`${baseUrl}/images/blog-banner.jpg`],
    author: {
      "@type": "Person",
      name: blog.author_name || "Dr. Gulshan Kumar",
      jobTitle: blog.author_role || "Founder & Master Trainer, Dizital Adda",
    },
    publisher: {
      "@type": "Organization",
      name: "Dizital Adda",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    keywords: blog.keywords || "",
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.category || "Articles",
        item: `${baseUrl}/blogs?category=${encodeURIComponent(blog.category || "")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: blog.title,
        item: blogUrl,
      },
    ],
  };

  // 3. FAQPage Schema (if FAQs are present)
  let faqSchema = null;
  const faqs = Array.isArray(blog.faqs) ? blog.faqs : [];
  if (faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };
  }

  return {
    articleSchema,
    breadcrumbSchema,
    faqSchema,
    combined: [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])],
  };
};

class BlogService {
  constructor() {
    this.memoryBlogs = [...SEED_BLOGS];
    this.initStore();
  }

  initStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(STORE_FILE)) {
        const fileContent = fs.readFileSync(STORE_FILE, "utf8");
        const store = JSON.parse(fileContent);
        if (!store.blogs || !Array.isArray(store.blogs) || store.blogs.length === 0) {
          store.blogs = [...SEED_BLOGS];
          fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
          console.log("📝 Seeded flagship blogs into local store file ✅");
        }
        this.memoryBlogs = store.blogs;
      } else {
        const store = { blogs: [...SEED_BLOGS] };
        fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
        this.memoryBlogs = store.blogs;
      }
    } catch (err) {
      console.warn("⚠️ Blog store init note:", err.message);
    }

    // Auto-check PostgreSQL table if real PostgreSQL is connected
    this.ensurePostgresTable();
  }

  async ensurePostgresTable() {
    if (!pool.isPostgres || !pool.isPostgres()) return;

    try {
      const realPool = pool.getRealPool();
      if (!realPool) return;

      await realPool.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          slug VARCHAR(500) UNIQUE NOT NULL,
          category VARCHAR(100) NOT NULL,
          meta_title VARCHAR(255),
          meta_description TEXT,
          keywords TEXT,
          publisher VARCHAR(100) DEFAULT 'Dizital Adda',
          author_name VARCHAR(100) DEFAULT 'Dr. Gulshan Kumar',
          author_role VARCHAR(100) DEFAULT 'Founder & Master Trainer, Dizital Adda',
          read_time VARCHAR(50) DEFAULT '6 min read',
          featured_image TEXT,
          summary TEXT,
          content TEXT NOT NULL,
          faqs JSONB DEFAULT '[]'::jsonb,
          schema_markup JSONB,
          tags TEXT[],
          is_published BOOLEAN DEFAULT true,
          views INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
        CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
      `);

      const countCheck = await realPool.query("SELECT COUNT(*) FROM blogs");
      const count = parseInt(countCheck.rows[0].count, 10);

      if (count === 0) {
        console.log("📝 Seeding flagship blogs into PostgreSQL database...");
        for (const blog of SEED_BLOGS) {
          await realPool.query(
            `INSERT INTO blogs (
              title, slug, category, meta_title, meta_description, keywords,
              publisher, author_name, author_role, read_time, featured_image,
              summary, content, faqs, schema_markup, tags, is_published, views, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            ON CONFLICT (slug) DO NOTHING`,
            [
              blog.title,
              blog.slug,
              blog.category,
              blog.meta_title,
              blog.meta_description,
              blog.keywords,
              blog.publisher,
              blog.author_name,
              blog.author_role,
              blog.read_time,
              blog.featured_image,
              blog.summary,
              blog.content,
              JSON.stringify(blog.faqs || []),
              JSON.stringify(generateSchemaJsonLd(blog).combined),
              blog.tags || [],
              blog.is_published,
              blog.views || 0,
              blog.created_at,
            ]
          );
        }
        console.log("📝 Flagship blogs seeded into PostgreSQL successfully ✅");
      }
    } catch (err) {
      console.warn("⚠️ Postgres blog setup note:", err.message);
    }
  }

  saveMemoryToDisk() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const store = JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
        store.blogs = this.memoryBlogs;
        fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
      }
    } catch (e) {
      console.warn("⚠️ Could not persist blogs to disk:", e.message);
    }
  }

  /**
   * Get paginated blogs list with filtering
   */
  async getBlogs({ category, search, page = 1, limit = 12, onlyPublished = true }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));
    const offset = (pageNum - 1) * limitNum;

    // 1. Try PostgreSQL
    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          let whereClause = onlyPublished ? "WHERE is_published = true" : "WHERE 1=1";
          const params = [];

          if (category && category !== "All" && category !== "all") {
            params.push(category);
            whereClause += ` AND category = $${params.length}`;
          }

          if (search && search.trim()) {
            params.push(`%${search.trim()}%`);
            whereClause += ` AND (title ILIKE $${params.length} OR summary ILIKE $${params.length} OR keywords ILIKE $${params.length})`;
          }

          const countQuery = `SELECT COUNT(*) FROM blogs ${whereClause}`;
          const countRes = await realPool.query(countQuery, params);
          const total = parseInt(countRes.rows[0].count, 10);

          const dataParams = [...params, limitNum, offset];
          const dataQuery = `
            SELECT id, title, slug, category, meta_title, meta_description, keywords,
                   publisher, author_name, author_role, read_time, featured_image,
                   summary, tags, is_published, views, created_at, updated_at
            FROM blogs
            ${whereClause}
            ORDER BY created_at DESC
            LIMIT $${dataParams.length - 1} OFFSET $${dataParams.length}
          `;
          const dataRes = await realPool.query(dataQuery, dataParams);

          return {
            blogs: dataRes.rows,
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum) || 1,
          };
        }
      } catch (err) {
        console.warn("Falling back to in-memory blogs:", err.message);
      }
    }

    // 2. Memory / Local Store Fallback
    let list = [...this.memoryBlogs];

    if (onlyPublished) {
      list = list.filter((b) => b.is_published);
    }

    if (category && category !== "All" && category !== "all") {
      list = list.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q) ||
          b.keywords?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const total = list.length;
    const paginated = list.slice(offset, offset + limitNum).map((b) => {
      // Don't send full heavy HTML content on listing page for maximum speed
      const { content, ...rest } = b;
      return rest;
    });

    return {
      blogs: paginated,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    };
  }

  /**
   * Get single blog by slug with auto-TOC headings and Schema.org metadata
   */
  async getBlogBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = String(slug).trim().toLowerCase();

    let blog = null;

    // 1. Try PostgreSQL
    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          const res = await realPool.query("SELECT * FROM blogs WHERE LOWER(slug) = $1 LIMIT 1", [cleanSlug]);
          if (res.rows.length > 0) {
            blog = res.rows[0];
            // Increment view count asynchronously
            realPool.query("UPDATE blogs SET views = views + 1 WHERE id = $1", [blog.id]).catch(() => {});
          }
        }
      } catch (err) {
        console.warn("Postgres single blog fetch notice:", err.message);
      }
    }

    // 2. Memory Fallback
    if (!blog) {
      const foundIndex = this.memoryBlogs.findIndex((b) => b.slug?.toLowerCase() === cleanSlug);
      if (foundIndex !== -1) {
        this.memoryBlogs[foundIndex].views = (this.memoryBlogs[foundIndex].views || 0) + 1;
        blog = { ...this.memoryBlogs[foundIndex] };
        this.saveMemoryToDisk();
      }
    }

    if (!blog) return null;

    // Parse Headings dynamically for Auto Table of Contents (TOC)
    const headings = extractHeadings(blog.content);

    // Generate complete Schema.org JSON-LD
    const schema = generateSchemaJsonLd(blog);

    // Fetch related articles (same category or recent)
    const related = this.memoryBlogs
      .filter((b) => b.slug !== blog.slug && b.is_published)
      .slice(0, 3)
      .map(({ content, ...rest }) => rest);

    // Map natural cross-sell course based on category
    let crossSellCourse = null;
    const catLower = (blog.category || "").toLowerCase();
    if (catLower.includes("ai") || catLower.includes("prompt")) {
      crossSellCourse = {
        title: "Advanced Certification in Gen AI & Prompt Engineering",
        courseId: "ai-expert",
        badge: "Industry Accredited Track",
        duration: "6 Months",
        blurb: "Master LLM architectures, LangChain, RAG pipelines, and multi-agent systems with 10+ live enterprise labs.",
        link: "/course/ai-expert",
      };
    } else if (catLower.includes("marketing")) {
      crossSellCourse = {
        title: "Advanced Master Certification in Digital Marketing",
        courseId: "dm-advanced",
        badge: "Live Agency Labs",
        duration: "6 Months",
        blurb: "Run live brand campaigns with real client budgets, master 54+ AI tools, and earn 10+ global certifications.",
        link: "/course/dm-advanced",
      };
    } else if (catLower.includes("data") || catLower.includes("analytics")) {
      crossSellCourse = {
        title: "Certification in Data Analytics, SQL & Power BI",
        courseId: "data-analytics",
        badge: "Placement Ready",
        duration: "3 Months",
        blurb: "Transform raw data into executive intelligence with Advanced SQL, Power BI DAX, and real business capstones.",
        link: "/course/data-analytics",
      };
    } else if (catLower.includes("cyber") || catLower.includes("security")) {
      crossSellCourse = {
        title: "Certified Ethical Hacker & SOC Defense Practitioner",
        courseId: "cyber-security",
        badge: "Virtual Range CTF Labs",
        duration: "6 Months",
        blurb: "Hands-on virtual cyber range training covering Burp Suite, Kali Linux, SIEM monitoring, and penetration testing.",
        link: "/course/cyber-security",
      };
    }

    return {
      ...blog,
      headings,
      schema,
      related,
      crossSellCourse,
    };
  }

  /**
   * Get distinct categories with blog count
   */
  async getCategories() {
    const counts = {};
    this.memoryBlogs.forEach((b) => {
      if (b.is_published) {
        counts[b.category] = (counts[b.category] || 0) + 1;
      }
    });

    return Object.keys(counts).map((name) => ({
      name,
      count: counts[name],
    }));
  }

  /**
   * Admin: Get all blogs
   */
  async getAdminBlogs() {
    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          const res = await realPool.query("SELECT * FROM blogs ORDER BY created_at DESC");
          return res.rows;
        }
      } catch (err) {
        console.warn("Postgres admin blogs fetch:", err.message);
      }
    }

    return [...this.memoryBlogs].sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    );
  }

  /**
   * Admin: Create blog
   */
  async createBlog(data) {
    const slug = slugify(data.slug || data.title);
    const readTime = data.read_time || `${Math.max(3, Math.round((data.content || "").split(/\s+/).length / 200))} min read`;

    const newBlog = {
      id: Date.now(),
      title: data.title,
      slug,
      category: data.category || "General",
      meta_title: data.meta_title || `${data.title} | Dizital Adda`,
      meta_description: data.meta_description || data.summary || "",
      keywords: data.keywords || "",
      publisher: data.publisher || "Dizital Adda",
      author_name: data.author_name || "Dr. Gulshan Kumar",
      author_role: data.author_role || "Dizital Adda Faculty",
      read_time: readTime,
      featured_image: data.featured_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      summary: data.summary || "",
      content: data.content,
      faqs: Array.isArray(data.faqs) ? data.faqs : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      is_published: data.is_published !== undefined ? Boolean(data.is_published) : true,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Schema markup generated automatically
    newBlog.schema_markup = generateSchemaJsonLd(newBlog).combined;

    // PostgreSQL
    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          const res = await realPool.query(
            `INSERT INTO blogs (
              title, slug, category, meta_title, meta_description, keywords,
              publisher, author_name, author_role, read_time, featured_image,
              summary, content, faqs, schema_markup, tags, is_published, views, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING *`,
            [
              newBlog.title,
              newBlog.slug,
              newBlog.category,
              newBlog.meta_title,
              newBlog.meta_description,
              newBlog.keywords,
              newBlog.publisher,
              newBlog.author_name,
              newBlog.author_role,
              newBlog.read_time,
              newBlog.featured_image,
              newBlog.summary,
              newBlog.content,
              JSON.stringify(newBlog.faqs),
              JSON.stringify(newBlog.schema_markup),
              newBlog.tags,
              newBlog.is_published,
              0,
              newBlog.created_at,
              newBlog.updated_at,
            ]
          );
          return res.rows[0];
        }
      } catch (err) {
        console.warn("Postgres insert blog note:", err.message);
      }
    }

    // Memory Store
    this.memoryBlogs.unshift(newBlog);
    this.saveMemoryToDisk();
    return newBlog;
  }

  /**
   * Admin: Update blog
   */
  async updateBlog(id, data) {
    const blogId = Number(id);

    // PostgreSQL
    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          const slug = data.slug ? slugify(data.slug) : undefined;
          const res = await realPool.query(
            `UPDATE blogs SET
              title = COALESCE($1, title),
              slug = COALESCE($2, slug),
              category = COALESCE($3, category),
              meta_title = COALESCE($4, meta_title),
              meta_description = COALESCE($5, meta_description),
              keywords = COALESCE($6, keywords),
              author_name = COALESCE($7, author_name),
              author_role = COALESCE($8, author_role),
              read_time = COALESCE($9, read_time),
              featured_image = COALESCE($10, featured_image),
              summary = COALESCE($11, summary),
              content = COALESCE($12, content),
              faqs = COALESCE($13, faqs),
              tags = COALESCE($14, tags),
              is_published = COALESCE($15, is_published),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $16
            RETURNING *`,
            [
              data.title,
              slug,
              data.category,
              data.meta_title,
              data.meta_description,
              data.keywords,
              data.author_name,
              data.author_role,
              data.read_time,
              data.featured_image,
              data.summary,
              data.content,
              data.faqs ? JSON.stringify(data.faqs) : null,
              data.tags,
              data.is_published,
              blogId,
            ]
          );
          if (res.rows.length > 0) return res.rows[0];
        }
      } catch (err) {
        console.warn("Postgres update blog note:", err.message);
      }
    }

    // Memory Store
    const index = this.memoryBlogs.findIndex((b) => Number(b.id) === blogId);
    if (index === -1) return null;

    const current = this.memoryBlogs[index];
    const updated = {
      ...current,
      ...data,
      slug: data.slug ? slugify(data.slug) : current.slug,
      updated_at: new Date().toISOString(),
    };
    updated.schema_markup = generateSchemaJsonLd(updated).combined;

    this.memoryBlogs[index] = updated;
    this.saveMemoryToDisk();
    return updated;
  }

  /**
   * Admin: Delete blog
   */
  async deleteBlog(id) {
    const blogId = Number(id);

    if (pool.isPostgres && pool.isPostgres()) {
      try {
        const realPool = pool.getRealPool();
        if (realPool) {
          await realPool.query("DELETE FROM blogs WHERE id = $1", [blogId]);
          return true;
        }
      } catch (err) {
        console.warn("Postgres delete blog note:", err.message);
      }
    }

    const initialLen = this.memoryBlogs.length;
    this.memoryBlogs = this.memoryBlogs.filter((b) => Number(b.id) !== blogId);
    this.saveMemoryToDisk();
    return this.memoryBlogs.length < initialLen;
  }
}

const blogService = new BlogService();

module.exports = blogService;
