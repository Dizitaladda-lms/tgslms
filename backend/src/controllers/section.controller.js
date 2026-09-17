const pool = require("../config/db");

// Helper to resolve numeric course ID if slug is passed
const resolveCourseId = async (input) => {
  if (!input) return null;
  const num = Number(input);
  if (!isNaN(num)) return num;

  try {
    const courseRes = await pool.query(
      "SELECT id FROM courses WHERE course_id = $1 LIMIT 1",
      [String(input)]
    );
    if (courseRes.rows.length > 0) {
      return courseRes.rows[0].id;
    }
  } catch (e) {
    console.warn("Could not resolve course slug to id:", e.message);
  }
  return null;
};

exports.createSection = async (req, res) => {
  try {
    const { title, courseId, course_id, order_num, orderNum } = req.body;
    const rawCourseId = courseId || course_id;

    if (!title || !rawCourseId) {
      return res.status(400).json({
        success: false,
        message: "Section title and courseId are required",
      });
    }

    const numericCourseId = await resolveCourseId(rawCourseId);
    if (!numericCourseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid course identifier",
      });
    }

    let finalOrder = order_num !== undefined ? order_num : orderNum;
    if (finalOrder === undefined) {
      const countRes = await pool.query(
        "SELECT COUNT(*) FROM sections WHERE course_id = $1",
        [numericCourseId]
      );
      finalOrder = Number(countRes.rows[0]?.count || 0) + 1;
    }

    const newSection = await pool.query(
      `INSERT INTO sections (title, course_id, order_num) VALUES ($1, $2, $3) RETURNING *`,
      [title.trim(), numericCourseId, Number(finalOrder)]
    );

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section: newSection.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSections = async (req, res) => {
  try {
    const rawCourseId =
      req.params.course_id ||
      req.params.id ||
      req.query.courseId ||
      req.query.course_id;
    let query = "SELECT * FROM sections ORDER BY order_num ASC, id ASC";
    let params = [];

    if (rawCourseId) {
      const numericCourseId = await resolveCourseId(rawCourseId);
      if (numericCourseId) {
        query = "SELECT * FROM sections WHERE course_id = $1 ORDER BY order_num ASC, id ASC";
        params = [numericCourseId];
      }
    }

    const result = await pool.query(query, params);
    res.status(200).json({
      success: true,
      count: result.rows.length,
      sections: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, order_num, orderNum } = req.body;
    const targetOrder = order_num !== undefined ? order_num : orderNum;

    if (!title && targetOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title or order_num required to update section",
      });
    }

    const result = await pool.query(
      `UPDATE sections
       SET
         title = COALESCE($1, title),
         order_num = COALESCE($2, order_num)
       WHERE id = $3
       RETURNING *`,
      [
        title !== undefined ? title.trim() : null,
        targetOrder !== undefined ? Number(targetOrder) : null,
        Number(id),
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const secId = Number(id);

    // Remove or unassign child lectures in this section
    await pool.query("DELETE FROM lectures WHERE section_id = $1", [secId]).catch(() => {});

    const result = await pool.query("DELETE FROM sections WHERE id = $1 RETURNING id", [secId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};