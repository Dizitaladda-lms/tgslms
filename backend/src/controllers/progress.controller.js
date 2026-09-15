const pool = require("../config/db");

// ==========================================
// 1. GET STUDENT PROGRESS
// ==========================================
const getStudentProgress = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.user?.id;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId required",
      });
    }

    const videos = await pool.query(
      `SELECT COUNT(*) FROM video_progress
       WHERE (student_id = $1 OR user_id = $1)
       AND completed = true`,
      [studentId]
    );

    const assignments = await pool.query(
      `SELECT COUNT(*) FROM assignment_submissions
       WHERE student_id = $1`,
      [studentId]
    );

    const tests = await pool.query(
      `SELECT COUNT(*) FROM test_results
       WHERE student_id = $1`,
      [studentId]
    );

    const completedVideos = Number(videos.rows[0].count) || 0;
    const completedAssignments = Number(assignments.rows[0].count) || 0;
    const completedTests = Number(tests.rows[0].count) || 0;

    const totalCompleted = completedVideos + completedAssignments + completedTests;
    const progress = Math.min(100, totalCompleted * 10);

    res.status(200).json({
      success: true,
      progress,
      completedVideos,
      assignments: completedAssignments,
      tests: completedTests,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. MARK LECTURE COMPLETE / UPDATE PROGRESS
// ==========================================
const updateLectureProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { lectureId, courseId, completed = true, watchedSeconds = 0 } = req.body;

    if (!lectureId) {
      return res.status(400).json({
        success: false,
        message: "lectureId is required",
      });
    }

    // Upsert video progress record
    const result = await pool.query(
      `INSERT INTO video_progress
       (user_id, student_id, lecture_id, course_id, completed, watched_seconds, updated_at)
       VALUES ($1, $1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, lecture_id)
       DO UPDATE SET
         completed = EXCLUDED.completed,
         watched_seconds = EXCLUDED.watched_seconds,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, Number(lectureId), courseId ? Number(courseId) : null, Boolean(completed), Number(watchedSeconds)]
    );

    // Calculate course progress percentage if courseId is available
    let progressPercent = 0;
    if (courseId) {
      const totalLecturesQuery = await pool.query(
        "SELECT COUNT(*) FROM lectures WHERE course_id = $1",
        [courseId]
      );
      const completedQuery = await pool.query(
        "SELECT COUNT(*) FROM video_progress WHERE user_id = $1 AND course_id = $2 AND completed = true",
        [userId, courseId]
      );

      const total = Number(totalLecturesQuery.rows[0].count) || 0;
      const done = Number(completedQuery.rows[0].count) || 0;
      progressPercent = total > 0 ? Math.round((done / total) * 100) : 0;

      // Auto-trigger certificate request & admin alert if 100% completed
      if (progressPercent >= 100 || (total > 0 && done >= total)) {
        try {
          const certCheck = await pool.query(
            "SELECT * FROM certificates WHERE user_id = $1 AND course_id = $2",
            [userId, courseId]
          );

          if (certCheck.rows.length === 0) {
            const uRes = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
            const cRes = await pool.query("SELECT * FROM courses WHERE id = $1", [courseId]);
            const sRes = await pool.query("SELECT * FROM students WHERE user_id = $1", [userId]);

            const studentUser = uRes.rows[0] || {};
            const courseObj = cRes.rows[0] || {};
            const studentRecord = sRes.rows[0] || {};
            const studentName = studentRecord.name || studentUser.name || "Student";
            const studentCode = studentRecord.student_id || studentRecord.course_code || `TSG-${userId}`;
            const certCode = `TSG-CERT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

            // Create Pending Certificate record
            await pool.query(
              `INSERT INTO certificates
               (student_id, user_id, course_id, certificate_code, status, grade, completion_percent, requested_at)
               VALUES ($1, $2, $3, $4, 'Pending', 'Grade A+', 100, CURRENT_TIMESTAMP)`,
              [studentRecord.id || userId, userId, courseId, certCode]
            );

            // Create Admin Notification
            await pool.query(
              `INSERT INTO notifications (user_id, title, message, type, created_at)
               VALUES ($1, $2, $3, 'certificate', CURRENT_TIMESTAMP)`,
              [
                1,
                `🎓 Certificate Issuance Pending: ${studentName}`,
                `Student ${studentName} (Roll ID: ${studentCode}, Email: ${studentUser.email || ""}) has completed 100% of "${courseObj.title || 'Course'}". Please review and upload their official PDF certificate.`,
              ]
            );

            // Also create a student notification
            await pool.query(
              `INSERT INTO notifications (user_id, title, message, type, created_at)
               VALUES ($1, $2, $3, 'info', CURRENT_TIMESTAMP)`,
              [
                userId,
                `🎉 Congratulations on 100% Course Completion!`,
                `You have completed all sessions of "${courseObj.title || 'Course'}". Your official PDF certificate is being processed and signed by TSG administration.`,
              ]
            );

            console.log(
              `[EMAIL ALERT -> admin@dizitaladda.com] Student ${studentName} (Roll: ${studentCode}) completed 100% of ${courseObj.title}. Certificate request generated.`
            );
          }
        } catch (certErr) {
          console.warn("Certificate auto-request notice:", certErr.message);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Progress updated successfully 🚀",
      progress: result.rows[0],
      progressPercent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentProgress,
  updateLectureProgress,
};