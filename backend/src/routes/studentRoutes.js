const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

// ==========================================
// GET ALL STUDENTS (Admin & Teacher Access)
// ==========================================
router.get("/", verifyToken, checkRole("admin", "teacher"), async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.user_id,
        s.student_id,
        s.name,
        s.email,
        s.phone,
        s.course,
        s.teacher,
        s.status,
        s.created_at,
        u.avatar
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// ADD STUDENT (Admin Only)
// Creates both user record & student profile
// ==========================================
router.post("/", verifyToken, checkRole("admin"), async (req, res, next) => {
  const client = await pool.connect();
  try {
    const {
      student_id,
      password,
      name,
      email,
      phone,
      dob,
      course,
      teacher,
      teacher_id,
      status,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await client.query(
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
    const studentCode = student_id || `STU-${Date.now().toString().slice(-4)}`;

    await client.query("BEGIN");

    // 1. Create in users table so student can log in
    const userRes = await client.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
       VALUES ($1, $2, $3, $4, 'student', $5, $6, $7)
       RETURNING id`,
      [name, name, email, hashedPassword, phone, dob || null, status || "Active"]
    );
    const newUserId = userRes.rows[0].id;

    // 2. Create in students table for extended profile & management
    const studentRes = await client.query(
      `INSERT INTO students
       (user_id, student_id, password, name, email, phone, dob, course, teacher, teacher_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        newUserId,
        studentCode,
        hashedPassword,
        name,
        email,
        phone,
        dob || null,
        course,
        teacher,
        teacher_id || null,
        status || "Active",
      ]
    );

    await client.query("COMMIT");

    const responseStudent = { ...studentRes.rows[0] };
    delete responseStudent.password;

    res.status(201).json(responseStudent);
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
});

// ==========================================
// GET LOGGED-IN STUDENT PROFILE WITH PURCHASED COURSE
// ==========================================
router.get("/me/profile", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
         s.id,
         s.user_id,
         s.student_id,
         s.course_id,
         s.course_code,
         s.name,
         s.email,
         s.phone,
         COALESCE(s.dob, u.dob) as dob,
         s.course,
         s.teacher,
         s.teacher_id,
         s.image,
         s.status,
         s.created_at,
         u.avatar,
         u.role,
         c.id as course_numeric_id,
         c.course_id as course_code_val,
         c.title as course_title,
         c.thumbnail as course_thumbnail,
         c.duration as course_duration,
         c.level as course_level
       FROM students s
       LEFT JOIN users u ON s.user_id = u.id
       LEFT JOIN courses c ON (s.course_id = c.id OR s.course_code = c.course_id)
       WHERE s.user_id = $1
       ORDER BY s.id DESC
       LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      // Fallback: user might not have a separate students row yet
      const userRes = await pool.query(
        "SELECT id, name, email, phone, role, avatar, dob, created_at FROM users WHERE id = $1",
        [userId]
      );
      return res.json({
        success: true,
        student: null,
        user: userRes.rows[0] || null,
      });
    }

    res.json({
      success: true,
      student: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// GET SINGLE STUDENT PROFILE
// ==========================================
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = isNaN(Number(id)) ? null : Number(id);

    const result = await pool.query(
      `SELECT 
         s.*,
         u.avatar,
         u.created_at as registered_at,
         c.title as course_title,
         c.course_id as course_slug
       FROM students s
       LEFT JOIN users u ON s.user_id = u.id
       LEFT JOIN courses c ON (s.course_id = c.id OR s.course_code = c.course_id)
       WHERE s.id = $1 OR s.user_id = $1 OR s.student_id = $2`,
      [numId, String(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const student = result.rows[0];
    delete student.password;

    res.json(student);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// DELETE STUDENT (Admin Only)
// ==========================================
router.delete("/:id", verifyToken, checkRole("admin"), async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentQuery = await pool.query(
      "SELECT user_id FROM students WHERE id = $1",
      [id]
    );

    if (studentQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const userId = studentQuery.rows[0].user_id;

    if (userId) {
      // Deleting user cascades to students table
      await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    } else {
      await pool.query("DELETE FROM students WHERE id = $1", [id]);
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;