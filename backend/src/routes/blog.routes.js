const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getBlogCategories,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get("/", getBlogs);
router.get("/categories", getBlogCategories);
router.get("/slug/:slug", getBlogBySlug);

// ==========================================
// ADMIN MANAGEMENT ROUTES (Protected)
// ==========================================
router.get("/admin/all", verifyToken, checkRole("admin"), getAdminBlogs);
router.post("/", verifyToken, checkRole("admin"), createBlog);
router.put("/:id", verifyToken, checkRole("admin"), updateBlog);
router.delete("/:id", verifyToken, checkRole("admin"), deleteBlog);

// Single slug fallback (must be at the bottom so it doesn't collide with /categories or /admin)
router.get("/:slug", getBlogBySlug);

module.exports = router;
