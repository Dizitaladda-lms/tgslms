const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const pool = require("../config/db");

// Protect ALL admin routes with token verification and admin role check
router.use(verifyToken);
router.use(checkRole("admin"));

// ==========================
// 1. ADMIN DASHBOARD TEST
// ==========================
router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin 🚀",
    user: req.user,
  });
});

// ==========================
// 1.1 SYNC FULL DATABASE (ADMIN ACTION)
// ==========================
router.post("/sync-database", async (req, res, next) => {
  try {
    const { syncDatabase } = require("../db/syncAllToDb");
    const activePool = pool.getRealPool ? pool.getRealPool() : null;
    const stats = await syncDatabase(activePool);
    res.status(200).json({
      success: true,
      message: "Database successfully synced with all 12 courses, 88 modules & 252 lectures! 🚀",
      stats,
    });
  } catch (error) {
    console.error("Admin DB Sync error:", error);
    res.status(500).json({
      success: false,
      message: "Database sync failed: " + error.message,
    });
  }
});

// ==========================
// 2. GET ALL TEACHERS
// ==========================
router.get("/teachers", async (req, res, next) => {
  try {
    const teachers = await pool.query(
      `SELECT id, name, email, role, phone, specialization, status, created_at
       FROM users
       WHERE role = 'teacher'
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      teachers: teachers.rows,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 3. ADD TEACHER
// ==========================
router.post("/add-teacher", async (req, res, next) => {
  try {
    const { name, email, password, phone, specialization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, specialization)
       VALUES ($1, $2, $3, $4, 'teacher', $5, $6)
       RETURNING id, name, email, role, phone, specialization, created_at`,
      [name, name, email, hashedPassword, phone, specialization]
    );

    res.status(201).json({
      success: true,
      message: "Teacher added successfully 🚀",
      teacher: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 4. GET ALL COURSES (ADMIN)
// ==========================
router.get("/courses", async (req, res, next) => {
  try {
    const courses = await pool.query(
      `SELECT * FROM courses ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      courses: courses.rows,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 5. ADD COURSE
// ==========================
router.post("/add-course", async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      duration,
      level,
      category,
      teacher,
      teacher_id,
      thumbnail,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Course title and price are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO courses
       (title, description, price, original_price, duration, level, category, teacher, teacher_id, thumbnail, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
       RETURNING *`,
      [
        title,
        description || "",
        Number(price),
        Number(originalPrice || price),
        duration || "",
        level || "Beginner",
        category || "General",
        teacher || "",
        teacher_id || null,
        thumbnail || "",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Course added successfully 🚀",
      course: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 6. EDIT COURSE
// ==========================
router.put("/edit-course/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      originalPrice,
      original_price,
      duration,
      level,
      category,
      teacher,
      thumbnail,
      is_published,
      course_id,
    } = req.body;

    const finalOriginalPrice = originalPrice !== undefined ? originalPrice : original_price;

    const result = await pool.query(
      `UPDATE courses
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         price = COALESCE($3, price),
         original_price = COALESCE($4, original_price),
         duration = COALESCE($5, duration),
         level = COALESCE($6, level),
         category = COALESCE($7, category),
         teacher = COALESCE($8, teacher),
         thumbnail = COALESCE($9, thumbnail),
         is_published = COALESCE($10, is_published),
         course_id = COALESCE($11, course_id),
         updated_at = CURRENT_TIMESTAMP
       WHERE id::text = $12 OR course_id = $12
       RETURNING *`,
      [
        title !== undefined && title !== null ? String(title).trim() : null,
        description !== undefined && description !== null ? String(description).trim() : null,
        price !== undefined && price !== null && price !== "" ? Number(price) : null,
        finalOriginalPrice !== undefined && finalOriginalPrice !== null && finalOriginalPrice !== "" ? Number(finalOriginalPrice) : null,
        duration !== undefined && duration !== null ? String(duration).trim() : null,
        level !== undefined && level !== null ? String(level).trim() : null,
        category !== undefined && category !== null ? String(category).trim() : null,
        teacher !== undefined && teacher !== null ? String(teacher).trim() : null,
        thumbnail !== undefined && thumbnail !== null ? String(thumbnail).trim() : null,
        is_published !== undefined && is_published !== null ? Boolean(is_published) : null,
        course_id !== undefined && course_id !== null ? String(course_id).trim() : null,
        String(id),
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully 🚀",
      course: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 7. DELETE COURSE
// ==========================
router.delete("/delete-course/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully 🚀",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 8. UPDATE PASSWORD (ADMIN SELF)
// ==========================
router.put("/update-password", async (req, res, next) => {
  try {
    // Take user identity from verified token rather than arbitrary client input!
    const adminUserId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [adminUserId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [hashedPassword, adminUserId]
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully 🚀",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 8.1 UPDATE PROFILE (ADMIN SELF)
// ==========================
router.put("/update-profile", async (req, res, next) => {
  try {
    const adminUserId = req.user.id;
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const updateRes = await pool.query(
      "UPDATE users SET name = $1, full_name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, name, email, role, phone, avatar",
      [name.trim(), phone ? phone.trim() : null, adminUserId]
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully 🚀",
      user: updateRes.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 9. GET ALL USERS (ADMIN)
// ==========================
router.get("/users", async (req, res, next) => {
  try {
    const users = await pool.query(
      `SELECT id, name, email, role, phone, status, created_at
       FROM users
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      users: users.rows,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;