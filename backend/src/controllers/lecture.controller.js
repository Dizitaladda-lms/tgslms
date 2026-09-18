const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");

// Helper to upload buffer to Cloudinary with fallback
const uploadToCloudinary = (fileBuffer, resourceType = "auto", folder = "lms_lectures") => {
  return new Promise((resolve) => {
    // Check if Cloudinary is configured
    if (!process.env.CLOUD_NAME || process.env.CLOUD_NAME === "Root" || !process.env.CLOUD_API_KEY) {
      // Cloudinary not configured with valid production credentials
      return resolve(null);
    }

    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder },
        (error, result) => {
          if (error) {
            console.warn("Cloudinary upload failed, falling back:", error.message);
            resolve(null);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      uploadStream.end(fileBuffer);
    } catch (err) {
      console.warn("Cloudinary upload error:", err.message);
      resolve(null);
    }
  });
};

// ==========================================
// 1. UPLOAD / CREATE LECTURE
// ==========================================
const uploadLecture = async (req, res, next) => {
  try {
    const {
      title,
      description,
      course_id,
      section_id,
      duration,
      is_free_preview,
      order_num,
      lecture_number,
      video_url: manualVideoUrl,
      pdf_url: manualPdfUrl,
    } = req.body;

    if (!title || !course_id) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and course_id are required",
      });
    }

    // Auto-patch columns if missing
    await pool
      .query(
        `ALTER TABLE lectures ADD COLUMN IF NOT EXISTS order_num INTEGER DEFAULT 1;
         ALTER TABLE lectures ADD COLUMN IF NOT EXISTS lecture_number INTEGER DEFAULT 1;`
      )
      .catch(() => {});

    let videoUrl = manualVideoUrl || "";
    let pdfUrl = manualPdfUrl || "";

    const videoFile = req.files?.video?.[0];
    const pdfFile = req.files?.pdf?.[0];

    // Upload files if provided
    if (videoFile) {
      const uploaded = await uploadToCloudinary(videoFile.buffer, "video", "lectures/videos");
      videoUrl = uploaded || `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`;
    }

    if (pdfFile) {
      const uploaded = await uploadToCloudinary(pdfFile.buffer, "raw", "lectures/pdfs");
      pdfUrl = uploaded || `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
    }

    // Default sample video if none provided
    if (!videoUrl) {
      videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    }

    // Auto-calculate sequence order within this module / course if not specified
    let finalOrder = parseInt(order_num || lecture_number, 10);
    if (!finalOrder || isNaN(finalOrder)) {
      const orderQuery = await pool.query(
        `SELECT COALESCE(MAX(COALESCE(order_num, lecture_number, 0)), 0) + 1 as next_order
         FROM lectures
         WHERE course_id = $1 AND (section_id = $2 OR ($2 IS NULL AND section_id IS NULL))`,
        [Number(course_id), section_id ? Number(section_id) : null]
      );
      finalOrder = Number(orderQuery.rows[0]?.next_order) || 1;
    }

    const result = await pool.query(
      `INSERT INTO lectures
       (course_id, section_id, title, description, video_url, pdf_url, duration, is_free_preview, order_num, lecture_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        Number(course_id),
        section_id ? Number(section_id) : null,
        title,
        description || "",
        videoUrl,
        pdfUrl,
        duration || "25m",
        Boolean(is_free_preview),
        finalOrder,
        finalOrder,
      ]
    );

    res.status(201).json({
      success: true,
      message: `Lecture ${finalOrder} uploaded and created successfully 🚀`,
      lecture: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. GET LECTURES
// Supports filtering by courseId and joining progress
// ==========================================
const getLectures = async (req, res, next) => {
  try {
    const courseId =
      req.params.course_id ||
      req.params.id ||
      req.query.courseId ||
      req.query.course_id;
    const userId = req.user?.id;

    let query;
    let params = [];

    if (courseId) {
      query = `
        SELECT
          l.*,
          s.title as section_title,
          COALESCE(s.order_num, s.id, 0) as section_order,
          COALESCE(vp.completed, false) as is_completed,
          COALESCE(vp.watched_seconds, 0) as watched_seconds
        FROM lectures l
        JOIN courses c ON l.course_id = c.id
        LEFT JOIN sections s ON l.section_id = s.id
        LEFT JOIN video_progress vp ON (vp.lecture_id = l.id AND vp.user_id = $2)
        WHERE (c.id::text = $1 OR c.course_id = $1)
        ORDER BY COALESCE(s.order_num, s.id, 0) ASC, COALESCE(l.order_num, l.lecture_number, l.id, 0) ASC, l.id ASC
      `;
      params = [String(courseId), userId || 0];
    } else {
      query = `
        SELECT l.*, c.title as course_title
        FROM lectures l
        LEFT JOIN courses c ON l.course_id = c.id
        ORDER BY l.id DESC
        LIMIT 50
      `;
      params = [];
    }

    const result = await pool.query(query, params);

    // Calculate sequential lock state for students
    let rows = result.rows;
    if (courseId) {
      if (req.user?.role !== "admin" && req.user?.role !== "teacher") {
        let prevCompleted = true;
        rows = rows.map((lec, idx) => {
          const isCompleted = Boolean(lec.is_completed);
          const isLocked = idx === 0 ? false : !prevCompleted;
          if (!isCompleted) {
            prevCompleted = false;
          }
          return {
            ...lec,
            is_completed: isCompleted,
            is_locked: isLocked,
          };
        });
      } else {
        rows = rows.map((lec) => ({
          ...lec,
          is_completed: Boolean(lec.is_completed),
          is_locked: false,
        }));
      }
    }

    res.status(200).json({
      success: true,
      count: rows.length,
      lectures: rows,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. DELETE LECTURE
// ==========================================
const deleteLecture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM lectures WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    res.json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadLecture,
  getLectures,
  deleteLecture,
};