import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCheck,
  FaTimes,
  FaBookOpen,
  FaFileAlt,
  FaExternalLinkAlt,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

const CATEGORIES = [
  "AI & Prompt Engineering",
  "Digital Marketing",
  "Data Analytics & Science",
  "Cyber Security",
  "Career & Placement Guides",
  "Full Stack Web Development",
  "Competitive & Academic Prep",
];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "AI & Prompt Engineering",
    meta_title: "",
    meta_description: "",
    keywords: "",
    publisher: "Dizital Adda",
    author_name: "Dr. Gulshan Kumar",
    author_role: "Founder & Master Trainer, Dizital Adda",
    read_time: "7 min read",
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    summary: "",
    content: "",
    tags: "",
    is_published: true,
    faqs: [
      { question: "", answer: "" }
    ],
  });

  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const fetchAdminBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/blogs/admin/all");
      if (res.data?.success) {
        setBlogs(res.data.blogs || []);
      }
    } catch (err) {
      console.error("Failed to load admin blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val) => {
    const updated = { ...formData, title: val };
    if (!editingBlogId) {
      updated.slug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      updated.meta_title = `${val.slice(0, 45)} | Dizital Adda`;
    }
    setFormData(updated);
  };

  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setFormData({
      title: "",
      slug: "",
      category: "AI & Prompt Engineering",
      meta_title: "",
      meta_description: "",
      keywords: "",
      publisher: "Dizital Adda",
      author_name: "Dr. Gulshan Kumar",
      author_role: "Founder & Master Trainer, Dizital Adda",
      read_time: "7 min read",
      featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      summary: "",
      content: `<h2>Section 1: The Core Industry Challenge</h2>\n<p>Explain the critical industry context, tools, or pain points here...</p>\n\n<h2>Section 2: Step-by-Step Strategic Roadmap</h2>\n<p>Detail the methodology, active frameworks, and practical milestones...</p>\n\n<h2>Section 3: Practical Industry Comparison</h2>\n<p>Include comparison insights or career deliverables...</p>`,
      tags: "AI, Career, Roadmap",
      is_published: true,
      faqs: [
        { question: "What is the expected career growth in this field?", answer: "Professionals in this track consistently see strong compensation jumps of 40% to 100% within 12 to 18 months." }
      ],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "AI & Prompt Engineering",
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      keywords: blog.keywords || "",
      publisher: blog.publisher || "Dizital Adda",
      author_name: blog.author_name || "Dr. Gulshan Kumar",
      author_role: blog.author_role || "Dizital Adda Faculty",
      read_time: blog.read_time || "7 min read",
      featured_image: blog.featured_image || "",
      summary: blog.summary || "",
      content: blog.content || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags || ""),
      is_published: blog.is_published !== undefined ? blog.is_published : true,
      faqs: Array.isArray(blog.faqs) && blog.faqs.length > 0 ? blog.faqs : [{ question: "", answer: "" }],
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await api.delete(`/api/blogs/${id}`);
      if (res.data?.success) {
        showToast("Blog deleted successfully.");
        fetchAdminBlogs();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete blog.");
    }
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    });
  };

  const handleRemoveFaq = (idx) => {
    const updated = formData.faqs.filter((_, i) => i !== idx);
    setFormData({ ...formData, faqs: updated });
  };

  const handleFaqChange = (idx, field, value) => {
    const updated = [...formData.faqs];
    updated[idx][field] = value;
    setFormData({ ...formData, faqs: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please provide both Title and Content Body.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        tags: typeof formData.tags === "string" ? formData.tags.split(",").map(s => s.trim()).filter(Boolean) : formData.tags,
        faqs: formData.faqs.filter(f => f.question.trim() && f.answer.trim()),
      };

      if (editingBlogId) {
        await api.put(`/api/blogs/${editingBlogId}`, payload);
        showToast("Blog updated successfully!");
      } else {
        await api.post("/api/blogs", payload);
        showToast("Blog published successfully!");
      }

      setIsFormOpen(false);
      fetchAdminBlogs();
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data?.message || "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchCat = selectedCategory === "All" || b.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.slug?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AdminLayout title="Blog & Article Manager" subtitle="Create, edit and publish blog articles for the public site">
      <div className="flex-1">
        {/* TOAST NOTIFICATION */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce">
            <FaCheck />
            <span>{notification}</span>
          </div>
        )}

        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
              <FaBookOpen />
              <span>SEO Content & Editorial Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight mt-1">
              Blog & Article Manager
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage high-ranking SEO blogs, dynamic Auto-TOC headings, and Schema.org metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/blogs"
              target="_blank"
              className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition"
            >
              <FaExternalLinkAlt />
              <span>View Public Blog</span>
            </Link>

            <button
              onClick={handleOpenCreate}
              className="bg-[#0B1220] hover:bg-[#7C2D12] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md"
            >
              <FaPlus />
              <span>Create New Article</span>
            </button>
          </div>
        </div>

        {/* CONTROLS (SEARCH & CATEGORY FILTER) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <FaSearch className="text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or slug..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ARTICLES TABLE */}
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-slate-500 font-semibold text-sm">
              Loading articles...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <FaFileAlt className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">No blog articles match your criteria.</p>
              <button
                onClick={handleOpenCreate}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:underline"
              >
                + Write a new article now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-[#0B1220] text-white uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Article Title</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Author</th>
                    <th className="py-4 px-4 text-center">Reads</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredBlogs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="font-bold text-slate-900 line-clamp-1">
                          {b.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          /blog/{b.slug}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {b.author_name}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-900">
                        {(b.views || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.is_published
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {b.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(b.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <Link
                          to={`/blog/${b.slug}`}
                          target="_blank"
                          className="inline-flex p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                          title="View Live Article"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                          title="Edit Article"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Article"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CREATE / EDIT MODAL DRAWER */}
        {/* ========================================================= */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-3xl bg-white h-full overflow-y-auto p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-[#0B1220]">
                      {editingBlogId ? "Edit Blog Article" : "Create New SEO Blog Article"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Strict formatting: H2/H3 for Auto-TOC, Meta Title under 60 chars, and high-intent keywords.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Title & Slug */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Blog Title (H1 Equivalent) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Gen AI & Prompt Engineering: 2026 Roadmap"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {formData.title.length}/65 chars (Optimal for Google SERP)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL Slug (kebab-case) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. prompt-engineering-gen-ai-career-roadmap-2026"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Category & Read Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        placeholder="e.g. 7 min read"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Meta Title & Meta Description */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Meta Title (Google Snippet)
                      </label>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                        placeholder="Max 60 chars | Dizital Adda"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {formData.meta_title.length}/60 chars
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Keywords (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="8-12 search terms (e.g. prompt engineering, llm, rag)"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meta Description (140 – 160 chars)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Concise summary with a compelling call-to-action for Google search result snippets..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                    <span className="text-[10px] text-slate-400 block">
                      {formData.meta_description.length}/160 chars
                    </span>
                  </div>

                  {/* Author Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="e.g. Dr. Gulshan Kumar"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author Role / Bio
                      </label>
                      <input
                        type="text"
                        value={formData.author_role}
                        onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                        placeholder="e.g. Founder & Master Trainer, Dizital Adda"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Featured Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featured_image}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                  </div>

                  {/* Excerpt / Summary Hook */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Article Summary / Hook
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Immediate hook addressing the reader's real career pain point..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                  </div>

                  {/* Content Body (Rich HTML) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Content Body (HTML) *
                      </label>
                      <span className="text-[10px] text-amber-700 font-semibold">
                        Strict: Use &lt;h2&gt; for main sections, &lt;h3&gt; for sub-points. NO &lt;h1&gt;.
                      </span>
                    </div>
                    <textarea
                      rows={10}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="<h2>Your Main Section Heading</h2><p>Content text...</p>"
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                  </div>

                  {/* Dynamic FAQs Builder */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-bold text-slate-800">
                        Frequently Asked Questions (For FAQPage Schema)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="text-[11px] font-bold text-amber-800 hover:underline"
                      >
                        + Add Question
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 relative">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                            placeholder={`Question #${idx + 1}...`}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                            placeholder="Concise answer..."
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                          />
                          {formData.faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="text-[10px] text-red-500 font-bold hover:underline"
                            >
                              Remove Question
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Publish Status Toggle */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0B1220] focus:ring-0"
                    />
                    <label htmlFor="is_published" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Publish Live immediately (Uncheck to save as Draft)
                    </label>
                  </div>
                </form>
              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="blog-form"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold flex items-center gap-2 transition shadow-lg disabled:opacity-50"
                >
                  <FaSave />
                  <span>{saving ? "Saving..." : editingBlogId ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
