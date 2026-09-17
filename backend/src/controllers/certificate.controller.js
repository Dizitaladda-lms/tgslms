const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

// Safe uploads directory handler (gracefully ignores read-only serverless environments like Vercel)
try {
  const CERT_UPLOADS_DIR = path.join(__dirname, "..", "..", "data", "uploads", "certificates");
  if (!fs.existsSync(CERT_UPLOADS_DIR)) {
    fs.mkdirSync(CERT_UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  // Ignored in read-only / serverless environments
}

// ==========================================
// 1. GET ALL CERTIFICATES (Admin)
// ==========================================
exports.getAllCertificates = async (req, res, next) => {
  try {
    let result;
    try {
      result = await pool.query(`
        SELECT
          c.*,
          COALESCE(s.name, u.name, 'Student') AS student_name,
          COALESCE(s.email, u.email, '') AS student_email,
          COALESCE(s.phone, u.phone, '') AS student_phone,
          COALESCE(s.student_id, s.course_code, CONCAT('TSG-', c.user_id)) AS student_code,
          co.title AS course_title,
          co.duration AS course_duration,
          co.category AS course_category
        FROM certificates c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN students s ON (c.student_id = s.id OR c.user_id = s.user_id)
        LEFT JOIN courses co ON c.course_id = co.id
        ORDER BY
          CASE WHEN c.status = 'Pending' THEN 1 ELSE 2 END ASC,
          c.id DESC
      `);
    } catch (dbErr) {
      console.warn("Certificates table query failed, verifying table existence:", dbErr.message);
      try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS certificates (
            id SERIAL PRIMARY KEY,
            student_id INTEGER,
            user_id INTEGER,
            course_id INTEGER,
            certificate_code VARCHAR(100) UNIQUE,
            pdf_url TEXT,
            status VARCHAR(50) DEFAULT 'Pending',
            grade VARCHAR(50) DEFAULT 'Grade A+',
            issued_by VARCHAR(100) DEFAULT 'Admin',
            completion_percent INTEGER DEFAULT 100,
            requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            issue_date TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `);
        result = await pool.query("SELECT * FROM certificates ORDER BY id DESC");
      } catch (innerErr) {
        console.warn("Certificates fallback query warning:", innerErr.message);
        result = { rows: [] };
      }
    }

    const certs = result?.rows || [];
    res.status(200).json({
      success: true,
      certificates: certs,
      total: certs.length,
      pendingCount: certs.filter((c) => (c.status || "").toLowerCase() === "pending").length,
      issuedCount: certs.filter((c) => (c.status || "").toLowerCase() === "issued").length,
    });
  } catch (error) {
    console.error("getAllCertificates error:", error);
    res.status(200).json({
      success: true,
      certificates: [],
      total: 0,
      pendingCount: 0,
      issuedCount: 0,
    });
  }
};

// ==========================================
// 2. GET PENDING CERTIFICATES (Admin)
// ==========================================
exports.getPendingCertificates = async (req, res, next) => {
  try {
    let result;
    try {
      result = await pool.query(`
        SELECT
          c.*,
          COALESCE(s.name, u.name, 'Student') AS student_name,
          COALESCE(s.email, u.email, '') AS student_email,
          COALESCE(s.phone, u.phone, '') AS student_phone,
          COALESCE(s.student_id, s.course_code, CONCAT('TSG-', c.user_id)) AS student_code,
          co.title AS course_title
        FROM certificates c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN students s ON (c.student_id = s.id OR c.user_id = s.user_id)
        LEFT JOIN courses co ON c.course_id = co.id
        WHERE LOWER(c.status) = 'pending'
        ORDER BY c.id DESC
      `);
    } catch (dbErr) {
      result = { rows: [] };
    }

    const pending = result?.rows || [];
    res.status(200).json({
      success: true,
      pending,
      count: pending.length,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      pending: [],
      count: 0,
    });
  }
};

// ==========================================
// 3. GET MY CERTIFICATES (Student)
// ==========================================
exports.getMyCertificates = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        c.*,
        co.title AS course_title,
        co.duration AS course_duration,
        co.category AS course_category,
        co.thumbnail AS course_thumbnail
      FROM certificates c
      LEFT JOIN courses co ON c.course_id = co.id
      WHERE c.user_id = $1 OR c.student_id = $1
      ORDER BY c.id DESC
    `,
      [userId]
    );

    res.status(200).json({
      success: true,
      certificates: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. UPLOAD & ISSUE CERTIFICATE PDF (Admin)
// ==========================================
exports.uploadAndIssueCertificate = async (req, res, next) => {
  try {
    const { certificateId, userId, courseId, pdfUrl: manualPdfUrl, grade = "Grade A+" } = req.body;

    let finalPdfUrl = (manualPdfUrl || "").trim();

    // Check if a physical PDF file was uploaded via multipart/form-data
    if (req.file) {
      const fileName = `cert_${certificateId || `${userId}_${courseId}`}_${Date.now()}.pdf`;
      const filePath = path.join(CERT_UPLOADS_DIR, fileName);
      fs.writeFileSync(filePath, req.file.buffer);
      // In base64/data URI or relative route so it can always be viewed & downloaded cleanly
      finalPdfUrl = `data:application/pdf;base64,${req.file.buffer.toString("base64")}`;
    }

    if (!finalPdfUrl) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file or provide a valid PDF / Google Drive URL.",
      });
    }

    let updatedCert;

    if (certificateId) {
      // Update by Certificate ID
      const updateRes = await pool.query(
        `
        UPDATE certificates
        SET
          pdf_url = $1,
          status = 'Issued',
          grade = $2,
          issued_by = 'Admin',
          issue_date = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
      `,
        [finalPdfUrl, grade, Number(certificateId)]
      );
      updatedCert = updateRes.rows[0];
    } else if (userId && courseId) {
      // Upsert by userId and courseId
      const certCode = `TSG-CERT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const existing = await pool.query(
        "SELECT id FROM certificates WHERE user_id = $1 AND course_id = $2",
        [Number(userId), Number(courseId)]
      );

      if (existing.rows.length > 0) {
        const updateRes = await pool.query(
          `
          UPDATE certificates
          SET
            pdf_url = $1,
            status = 'Issued',
            grade = $2,
            issued_by = 'Admin',
            issue_date = CURRENT_TIMESTAMP
          WHERE id = $3
          RETURNING *
        `,
          [finalPdfUrl, grade, existing.rows[0].id]
        );
        updatedCert = updateRes.rows[0];
      } else {
        const insertRes = await pool.query(
          `
          INSERT INTO certificates
            (student_id, user_id, course_id, certificate_code, pdf_url, status, grade, issued_by, completion_percent, issue_date)
          VALUES
            ($1, $1, $2, $3, $4, 'Issued', $5, 'Admin', 100, CURRENT_TIMESTAMP)
          RETURNING *
        `,
          [Number(userId), Number(courseId), certCode, finalPdfUrl, grade]
        );
        updatedCert = insertRes.rows[0];
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "certificateId or (userId and courseId) is required",
      });
    }

    if (!updatedCert) {
      return res.status(404).json({
        success: false,
        message: "Certificate record not found to update.",
      });
    }

    // Get course and student name for notification
    const cRes = await pool.query("SELECT title FROM courses WHERE id = $1", [updatedCert.course_id]);
    const courseTitle = cRes.rows[0]?.title || "your enrolled program";

    // Create Notification for the Student
    try {
      await pool.query(
        `INSERT INTO notifications (user_id, title, message, type, created_at)
         VALUES ($1, $2, $3, 'certificate', CURRENT_TIMESTAMP)`,
        [
          updatedCert.user_id,
          `🎓 Your Verified Certificate is Ready!`,
          `Congratulations! Your official certificate for "${courseTitle}" has been verified and issued by TSG Administration. You can now download your official PDF from your dashboard.`,
        ]
      );
    } catch (notifErr) {
      console.warn("Notification insert warning:", notifErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Certificate PDF uploaded and issued successfully 🎉",
      certificate: updatedCert,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. VERIFY CERTIFICATE (Public)
// ==========================================
exports.verifyCertificate = async (req, res, next) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({ success: false, message: "Certificate code required" });
    }

    const result = await pool.query(
      `
      SELECT
        c.*,
        COALESCE(s.name, u.name, 'Student') AS student_name,
        COALESCE(s.email, u.email, '') AS student_email,
        COALESCE(s.student_id, s.course_code, CONCAT('TSG-', c.user_id)) AS student_code,
        co.title AS course_title,
        co.duration AS course_duration,
        co.category AS course_category
      FROM certificates c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN students s ON (c.student_id = s.id OR c.user_id = s.user_id)
      LEFT JOIN courses co ON c.course_id = co.id
      WHERE LOWER(c.certificate_code) = LOWER($1)
    `,
      [code.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: "Certificate not found or invalid certificate verification code.",
      });
    }

    const cert = result.rows[0];

    res.status(200).json({
      success: true,
      valid: true,
      certificate: {
        certificate_code: cert.certificate_code,
        student_name: cert.student_name,
        student_email: cert.student_email,
        student_code: cert.student_code,
        course_title: cert.course_title,
        course_duration: cert.course_duration,
        issue_date: cert.issue_date || cert.requested_at,
        grade: cert.grade || "Grade A+",
        status: cert.status,
        pdf_url: cert.pdf_url,
        issued_by: cert.issued_by || "TSG Administration",
      },
    });
  } catch (error) {
    next(error);
  }
};