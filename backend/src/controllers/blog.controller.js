const blogService = require("../services/blog.service");
const cacheService = require("../services/cache.service");

// ==========================================
// 1. GET ALL PUBLISHED BLOGS (Public)
// ==========================================
const getBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const cacheKey = `blogs:list:${category || "all"}:${search || ""}:${page}:${limit}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cached);
    }

    const data = await blogService.getBlogs({
      category,
      search,
      page,
      limit,
      onlyPublished: true,
    });

    const payload = {
      success: true,
      ...data,
    };

    // Cache for 2 minutes
    await cacheService.set(cacheKey, payload, 120);

    res.setHeader("X-Cache", "MISS");
    return res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. GET SINGLE BLOG BY SLUG (Public)
// ==========================================
const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const cacheKey = `blog:detail:${slug}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cached);
    }

    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with slug '${slug}' was not found.`,
      });
    }

    const payload = {
      success: true,
      blog,
    };

    // Cache single post for 3 minutes
    await cacheService.set(cacheKey, payload, 180);

    res.setHeader("X-Cache", "MISS");
    return res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. GET DISTINCT CATEGORIES (Public)
// ==========================================
const getBlogCategories = async (req, res, next) => {
  try {
    const cacheKey = "blogs:categories:all";
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const categories = await blogService.getCategories();
    const payload = {
      success: true,
      categories,
    };

    await cacheService.set(cacheKey, payload, 300);
    return res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. ADMIN: GET ALL BLOGS (Drafts + Published)
// ==========================================
const getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAdminBlogs();
    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. ADMIN: CREATE BLOG POST
// ==========================================
const createBlog = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog title is required.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog content body is required.",
      });
    }

    const blog = await blogService.createBlog(req.body);

    // Invalidate caches
    if (cacheService.redis && cacheService.isRedisReady) {
      try {
        const keys = await cacheService.redis.keys("blogs:*");
        if (keys.length > 0) await cacheService.redis.del(...keys);
      } catch {}
    } else {
      cacheService.memoryStore.clear();
    }

    return res.status(201).json({
      success: true,
      message: "Blog post published successfully.",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 6. ADMIN: UPDATE BLOG POST
// ==========================================
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await blogService.updateBlog(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    // Invalidate caches
    if (cacheService.redis && cacheService.isRedisReady) {
      try {
        const keys = await cacheService.redis.keys("blogs:*");
        if (keys.length > 0) await cacheService.redis.del(...keys);
      } catch {}
    } else {
      cacheService.memoryStore.clear();
    }

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully.",
      blog: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 7. ADMIN: DELETE BLOG POST
// ==========================================
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await blogService.deleteBlog(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found or could not be deleted.",
      });
    }

    // Invalidate caches
    if (cacheService.redis && cacheService.isRedisReady) {
      try {
        const keys = await cacheService.redis.keys("blogs:*");
        if (keys.length > 0) await cacheService.redis.del(...keys);
      } catch {}
    } else {
      cacheService.memoryStore.clear();
    }

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getBlogCategories,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
