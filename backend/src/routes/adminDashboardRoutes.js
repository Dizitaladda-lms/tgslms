const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

// Protect analytics with Admin role
router.use(verifyToken);
router.use(checkRole("admin"));

router.get("/dashboard", async (req, res, next) => {
  try {
    const studentsResult = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    const teachersResult = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role = 'teacher'"
    );

    const coursesResult = await pool.query(
      "SELECT COUNT(*) FROM courses"
    );

    const lecturesResult = await pool.query(
      "SELECT COUNT(*) FROM lectures"
    );

    const sectionsResult = await pool.query(
      "SELECT COUNT(*) FROM sections"
    );

    const revenueResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS revenue FROM payments WHERE status = 'Success'"
    );

    const recentStudents = await pool.query(`
      SELECT s.id, s.name, s.email, s.course, s.status, s.created_at
      FROM students s
      ORDER BY s.id DESC
      LIMIT 6
    `);

    const recentPayments = await pool.query(`
      SELECT p.id, p.amount, p.status, p.created_at, u.name as student_name, c.title as course_title
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN courses c ON p.course_id = c.id
      ORDER BY p.id DESC
      LIMIT 6
    `);

    res.json({
      success: true,
      stats: {
        totalStudents: Number(studentsResult.rows[0]?.count || 0),
        totalTeachers: Number(teachersResult.rows[0]?.count || 0),
        totalCourses: Number(coursesResult.rows[0]?.count || 0),
        totalLectures: Number(lecturesResult.rows[0]?.count || 0),
        totalSections: Number(sectionsResult.rows[0]?.count || 0),
        revenue: Number(revenueResult.rows[0]?.revenue || 0),
      },
      recentStudents: recentStudents.rows || [],
      recentPayments: recentPayments.rows || [],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;