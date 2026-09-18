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
// GET SINGLE STUDENT PROFILE WITH REAL PROGRESS & ASSIGNMENTS (Admin, Teacher & Self)
// ==========================================
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = isNaN(Number(id)) ? null : Number(id);

    // 1. Look up student in students table
    let studentRes = await pool.query(
      `SELECT 
         s.*,
         u.avatar,
         u.created_at as registered_at,
         u.role as user_role,
         c.title as course_title,
         c.course_id as course_slug
       FROM students s
       LEFT JOIN users u ON s.user_id = u.id
       LEFT JOIN courses c ON (s.course_id = c.id OR s.course_code = c.course_id)
       WHERE s.id = $1 OR s.user_id = $1 OR s.student_id = $2`,
      [numId, String(id)]
    );

    let student = null;

    if (studentRes.rows.length > 0) {
      student = studentRes.rows[0];
    } else {
      // 2. Fallback: Check users table (student might be registered through checkout/auth)
      const userRes = await pool.query(
        `SELECT 
           u.id as user_id,
           u.name,
           u.email,
           u.phone,
           u.avatar,
           u.dob,
           u.created_at,
           u.created_at as registered_at,
           u.status
         FROM users u
         WHERE u.id = $1 OR u.email = $2`,
        [numId, String(id)]
      );

      if (userRes.rows.length > 0) {
        const u = userRes.rows[0];
        student = {
          id: u.user_id,
          user_id: u.user_id,
          student_id: `DA-STU-${u.user_id}`,
          name: u.name,
          email: u.email,
          phone: u.phone,
          dob: u.dob,
          status: u.status || "Active",
          created_at: u.created_at,
          registered_at: u.registered_at,
          avatar: u.avatar,
        };
      }
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.password) delete student.password;

    const targetUserId = student.user_id || student.id;
    const targetStudentId = student.id;

    // 3. Fetch Enrolled Courses with dynamic progress
    let enrolledCourses = [];
    try {
      const coursesRes = await pool.query(
        `SELECT DISTINCT
           c.id,
           c.course_id,
           c.title,
           c.thumbnail,
           c.duration,
           c.teacher,
           c.category,
           c.level,
           COALESCE(e.status, 'Active') as enrollment_status,
           e.enrollment_date,
           COALESCE(e.progress, 0) as stored_progress
         FROM courses c
         LEFT JOIN enrollments e ON e.course_id = c.id AND (e.user_id = $1 OR e.student_id = $2)
         WHERE e.user_id = $1 
            OR e.student_id = $2 
            OR c.id = $3 
            OR c.course_id = $4
         ORDER BY c.id ASC`,
        [targetUserId, targetStudentId, student.course_id || 0, student.course_code || ""]
      );
      enrolledCourses = coursesRes.rows;
    } catch (err) {
      console.warn("Course fetch notice:", err.message);
    }

    const courseIds = enrolledCourses.map((c) => c.id).filter(Boolean);

    // 4. Fetch Video Progress
    let completedVideosCount = 0;
    let totalWatchedSeconds = 0;
    let recentVideos = [];
    let totalCourseLectures = 0;

    try {
      const videoStats = await pool.query(
        `SELECT 
           COUNT(DISTINCT lecture_id) as completed_count,
           COALESCE(SUM(watched_seconds), 0) as total_seconds
         FROM video_progress
         WHERE (user_id = $1 OR student_id = $1 OR student_id = $2)
           AND completed = true`,
        [targetUserId, targetStudentId]
      );
      completedVideosCount = Number(videoStats.rows[0]?.completed_count) || 0;
      totalWatchedSeconds = Number(videoStats.rows[0]?.total_seconds) || 0;

      // Count total lectures in enrolled courses
      if (courseIds.length > 0) {
        const totalLecRes = await pool.query(
          `SELECT COUNT(*) as total FROM lectures WHERE course_id = ANY($1::int[])`,
          [courseIds]
        );
        totalCourseLectures = Number(totalLecRes.rows[0]?.total) || 0;
      } else {
        const allLecRes = await pool.query("SELECT COUNT(*) as total FROM lectures");
        totalCourseLectures = Number(allLecRes.rows[0]?.total) || 0;
      }

      // Recent completed/in-progress videos
      const recentRes = await pool.query(
        `SELECT 
           vp.lecture_id,
           vp.completed,
           vp.watched_seconds,
           vp.updated_at,
           l.title as lecture_title,
           l.duration as lecture_duration,
           l.lecture_number,
           c.title as course_title,
           c.id as course_id
         FROM video_progress vp
         JOIN lectures l ON vp.lecture_id = l.id
         LEFT JOIN courses c ON l.course_id = c.id
         WHERE (vp.user_id = $1 OR vp.student_id = $1 OR vp.student_id = $2)
         ORDER BY vp.updated_at DESC
         LIMIT 30`,
        [targetUserId, targetStudentId]
      );
      recentVideos = recentRes.rows;
    } catch (err) {
      console.warn("Video progress notice:", err.message);
    }

    // 5. Fetch Assignment Submissions & Course Assignments
    let submittedAssignments = [];
    let completedAssignmentsCount = 0;
    let totalAssignmentsCount = 0;

    try {
      const subRes = await pool.query(
        `SELECT 
           sub.id as submission_id,
           sub.assignment_id,
           sub.submission_url,
           sub.notes,
           sub.marks,
           sub.feedback,
           COALESCE(sub.status, 'Submitted') as status,
           sub.created_at as submitted_at,
           a.title as assignment_title,
           a.description as assignment_description,
           a.max_marks,
           a.due_date,
           c.title as course_title
         FROM assignment_submissions sub
         LEFT JOIN assignments a ON sub.assignment_id = a.id
         LEFT JOIN courses c ON a.course_id = c.id
         WHERE sub.student_id = $1 OR sub.student_id = $2
         ORDER BY sub.id DESC`,
        [targetUserId, targetStudentId]
      );
      submittedAssignments = subRes.rows;
      completedAssignmentsCount = submittedAssignments.length;

      // Total assignments in their courses
      if (courseIds.length > 0) {
        const totalAssignRes = await pool.query(
          `SELECT COUNT(*) as total FROM assignments WHERE course_id = ANY($1::int[])`,
          [courseIds]
        );
        totalAssignmentsCount = Number(totalAssignRes.rows[0]?.total) || 0;
      } else {
        const allAssignRes = await pool.query("SELECT COUNT(*) as total FROM assignments");
        totalAssignmentsCount = Number(allAssignRes.rows[0]?.total) || 0;
      }
    } catch (err) {
      console.warn("Assignment notice:", err.message);
    }

    // 6. Fetch Certificates
    let certificates = [];
    try {
      const certRes = await pool.query(
        `SELECT 
           cert.*,
           c.title as course_title
         FROM certificates cert
         LEFT JOIN courses c ON cert.course_id = c.id
         WHERE cert.user_id = $1 OR cert.student_id = $1 OR cert.student_id = $2
         ORDER BY cert.id DESC`,
        [targetUserId, targetStudentId]
      );
      certificates = certRes.rows;
    } catch (err) {
      console.warn("Certificates notice:", err.message);
    }

    // 7. Calculate Per-Course Progress
    const coursesWithProgress = await Promise.all(
      enrolledCourses.map(async (crs) => {
        try {
          const totRes = await pool.query("SELECT COUNT(*) as count FROM lectures WHERE course_id = $1", [crs.id]);
          const doneRes = await pool.query(
            "SELECT COUNT(*) as count FROM video_progress WHERE course_id = $1 AND (user_id = $2 OR student_id = $2 OR student_id = $3) AND completed = true",
            [crs.id, targetUserId, targetStudentId]
          );
          const total = Number(totRes.rows[0]?.count) || 0;
          const completed = Number(doneRes.rows[0]?.count) || 0;
          const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
          return {
            ...crs,
            totalLectures: total,
            completedLectures: completed,
            progressPercent: percent,
          };
        } catch {
          return {
            ...crs,
            totalLectures: 0,
            completedLectures: 0,
            progressPercent: 0,
          };
        }
      })
    );

    // 8. Stats calculations
    const videoPercent =
      totalCourseLectures > 0
        ? Math.min(100, Math.round((completedVideosCount / totalCourseLectures) * 100))
        : 0;
    const assignmentPercent =
      totalAssignmentsCount > 0
        ? Math.min(100, Math.round((completedAssignmentsCount / totalAssignmentsCount) * 100))
        : completedAssignmentsCount > 0 ? 100 : 0;
    const overallProgress =
      totalCourseLectures > 0 || totalAssignmentsCount > 0
        ? Math.round((videoPercent * 0.7) + (assignmentPercent * 0.3))
        : 0;
    const learningHours = (totalWatchedSeconds / 3600).toFixed(1);

    const stats = {
      completedVideos: completedVideosCount,
      totalLectures: totalCourseLectures,
      videoPercent,
      learningHours,
      completedAssignments: completedAssignmentsCount,
      totalAssignments: totalAssignmentsCount,
      assignmentPercent,
      overallProgress,
      enrolledCoursesCount: enrolledCourses.length,
      certificatesCount: certificates.length,
    };

    res.json({
      success: true,
      student,
      stats,
      courses: coursesWithProgress,
      recentVideos,
      assignments: submittedAssignments,
      certificates,
    });
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