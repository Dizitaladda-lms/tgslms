const pool = require("../config/db");

// ==========================================
// 1. GET ALL COURSES (Public)
// ==========================================
const getCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    let query = `
      SELECT
        c.*,
        (SELECT COUNT(*) FROM lectures WHERE lectures.course_id = c.id) as total_lectures,
        (SELECT COUNT(*) FROM enrollments WHERE enrollments.course_id = c.id) as total_students
      FROM courses c
      WHERE c.is_published = true
    `;
    const params = [];

    if (category && category !== "All") {
      params.push(category);
      query += ` AND c.category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      query += ` AND (c.title ILIKE $${params.length} OR c.description ILIKE $${params.length})`;
    }

    query += ` ORDER BY c.id DESC`;

    const result = await pool.query(query, params);

    // Edge Caching: 10k users arriving in 1 sec will be served from CDN Edge cache without touching DB
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

    res.status(200).json({
      success: true,
      courses: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. GET SINGLE COURSE WITH CURRICULUM
// ==========================================
const getSingleCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const courseResult = await pool.query(
      `SELECT * FROM courses WHERE id::text = $1 OR course_id = $1`,
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const course = courseResult.rows[0];

    // Fetch sections using numeric course.id
    const sectionsResult = await pool.query(
      `SELECT * FROM sections WHERE course_id = $1 ORDER BY order_num ASC, id ASC`,
      [course.id]
    );

    // Fetch lectures using numeric course.id
    const lecturesResult = await pool.query(
      `SELECT id, section_id, course_id, title, description, video_url, pdf_url, duration, order_num, is_free_preview
       FROM lectures
       WHERE course_id = $1
       ORDER BY order_num ASC, id ASC`,
      [course.id]
    );

    // Structure sections with lectures
    const sectionsWithLectures = sectionsResult.rows.map((sec) => ({
      ...sec,
      lectures: lecturesResult.rows.filter((lec) => lec.section_id === sec.id),
    }));

    // Edge Caching: High concurrency course page views served from CDN edge
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");

    res.status(200).json({
      success: true,
      course: {
        ...course,
        sections: sectionsWithLectures,
        lectures: lecturesResult.rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. ADD COURSE (Teacher or Admin)
// ==========================================
const addCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      duration,
      level,
      category,
      price,
      originalPrice,
      teacher,
      thumbnail,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required",
      });
    }

    const teacherName = teacher || req.user?.name || "Dizital Adda Instructor";
    const teacherId = req.user?.role === "teacher" ? req.user.id : null;

    const result = await pool.query(
      `INSERT INTO courses
       (title, description, duration, level, category, price, original_price, teacher, teacher_id, thumbnail, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
       RETURNING *`,
      [
        title,
        description || "",
        duration || "4 Weeks",
        level || "Beginner",
        category || "General",
        Number(price),
        Number(originalPrice || price),
        teacherName,
        teacherId,
        thumbnail || "",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Course Added Successfully 🚀",
      course: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. GET MY TEACHER COURSES
// ==========================================
const getTeacherCourses = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const teacherName = req.user.name;

    const result = await pool.query(
      `SELECT * FROM courses
       WHERE teacher_id = $1 OR teacher ILIKE $2
       ORDER BY id DESC`,
      [teacherId, `%${teacherName}%`]
    );

    res.json({
      success: true,
      courses: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getSingleCourse,
  addCourse,
  getTeacherCourses,
};