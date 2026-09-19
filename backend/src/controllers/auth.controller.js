const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../config/db");
const emailService = require("../services/email.service");

const getJwtSecret = () => {
  return process.env.JWT_SECRET || "default_jwt_secret_dizital_adda_lms";
};

// ==========================================
// LOGIN
// ==========================================
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = userQuery.rows[0];

    if (user.status === "Blocked" || user.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive or suspended. Please contact administrator.",
      });
    }

    const isMatch = await bcrypt.compare(String(password), String(user.password));
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      getJwtSecret(),
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful 🚀",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        dob: user.dob || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// REGISTER (Self-registration for students)
// ==========================================
const registerUser = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { name, email, password, phone, dob } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existing = await client.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("BEGIN");

    let userRes;
    try {
      userRes = await client.query(
        `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
         VALUES ($1, $2, $3, $4, 'student', $5, $6, 'Active')
         RETURNING id, name, email, role, dob`,
        [name, name, email.trim().toLowerCase(), hashedPassword, phone || null, dob || null]
      );
    } catch (insertErr) {
      if (insertErr.message && insertErr.message.includes("dob")) {
        await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS dob VARCHAR(50)").catch(() => {});
        userRes = await client.query(
          `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
           VALUES ($1, $2, $3, $4, 'student', $5, $6, 'Active')
           RETURNING id, name, email, role, dob`,
          [name, name, email.trim().toLowerCase(), hashedPassword, phone || null, dob || null]
        );
      } else {
        throw insertErr;
      }
    }

    const newUser = userRes.rows[0];
    const studentCode = `STU-${Date.now().toString().slice(-4)}`;

    await client.query(
      `INSERT INTO students (user_id, student_id, name, email, password, phone, dob, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Active')`,
      [newUser.id, studentCode, name, email, hashedPassword, phone || null, dob || null]
    );

    await client.query("COMMIT");

    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        name: newUser.name,
      },
      getJwtSecret(),
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully 🚀",
      token,
      user: newUser,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};

// ==========================================
// GET CURRENT USER PROFILE (/me)
// ==========================================
const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userQuery = await pool.query(
      "SELECT id, name, full_name, email, role, phone, dob, specialization, avatar, status, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: userQuery.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SEND EMAIL VERIFICATION LINK
// ==========================================
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const studentName = name?.trim() || "Student";

    // 24-hour verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Check if user exists in DB
    const existing = await pool.query(
      "SELECT id, name, is_verified FROM users WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (existing.rows.length > 0) {
      // If user is already verified
      if (existing.rows[0].is_verified) {
        return res.status(200).json({
          success: true,
          alreadyVerified: true,
          message: "This email address is already verified! ✅",
        });
      }

      await pool.query(
        "UPDATE users SET verification_token = $1, verification_token_expires = $2 WHERE id = $3",
        [token, expires, existing.rows[0].id]
      );
    } else {
      // Create pending student user so their verification token is stored
      const tempPass = await bcrypt.hash("DA@" + Math.floor(100000 + Math.random() * 900000), 10);
      try {
        await pool.query(
          `INSERT INTO users (name, full_name, email, password, role, is_verified, verification_token, verification_token_expires, status)
           VALUES ($1, $1, $2, $3, 'student', false, $4, $5, 'Pending')`,
          [studentName, cleanEmail, tempPass, token, expires]
        );
      } catch (insertErr) {
        // Fallback if is_verified column not yet created
        await pool.query(
          `INSERT INTO users (name, full_name, email, password, role, status)
           VALUES ($1, $1, $2, $3, 'student', 'Pending')`,
          [studentName, cleanEmail, tempPass]
        ).catch(() => {});
      }
    }

    // Dispatch email
    const mailRes = await emailService.sendVerificationEmail({
      to: cleanEmail,
      name: studentName,
      token,
    });

    res.status(200).json({
      success: true,
      message: `Verification link sent to ${cleanEmail}. Please check your inbox and click the verify button.`,
      previewUrl: mailRes.previewUrl,
    });
  } catch (error) {
    console.error("Send verification email error:", error);
    next(error);
  }
};

// ==========================================
// VERIFY EMAIL (Handles browser click or API)
// ==========================================
const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token || req.body?.token;
    const isBrowserGet = req.method === "GET";
    const frontendUrl = (
      process.env.FRONTEND_URL ||
      process.env.CLIENT_URL ||
      (process.env.NODE_ENV === "production" ? "https://tsg-ecru.vercel.app" : "http://localhost:5173")
    ).replace(/\/+$/, "");

    if (!token) {
      if (isBrowserGet) {
        return res.redirect(`${frontendUrl}/verify-email?status=missing_token`);
      }
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const queryRes = await pool.query(
      "SELECT id, name, email, is_verified, verification_token_expires FROM users WHERE verification_token = $1",
      [String(token).trim()]
    );

    if (queryRes.rows.length === 0) {
      if (isBrowserGet) {
        return res.redirect(`${frontendUrl}/verify-email?status=invalid`);
      }
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link. Please request a new one.",
      });
    }

    const user = queryRes.rows[0];

    // Check expiry
    if (user.verification_token_expires && new Date() > new Date(user.verification_token_expires)) {
      if (isBrowserGet) {
        return res.redirect(`${frontendUrl}/verify-email?status=expired&email=${encodeURIComponent(user.email)}`);
      }
      return res.status(400).json({
        success: false,
        message: "This verification link has expired. Please request a new one.",
      });
    }

    // Mark verified
    await pool.query(
      "UPDATE users SET is_verified = true, verification_token = NULL, verification_token_expires = NULL WHERE id = $1",
      [user.id]
    );

    if (isBrowserGet) {
      return res.redirect(`${frontendUrl}/verify-email?status=success&email=${encodeURIComponent(user.email)}`);
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! 🎉",
      email: user.email,
    });
  } catch (error) {
    console.error("Verify email error:", error);
    next(error);
  }
};

// ==========================================
// CHECK EMAIL VERIFICATION STATUS
// Fast endpoint for checkout polling
// ==========================================
const checkVerification = async (req, res, next) => {
  try {
    const email = req.body?.email || req.query?.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email parameter is required",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const result = await pool.query(
      "SELECT id, email, is_verified FROM users WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        exists: false,
        verified: false,
      });
    }

    const user = result.rows[0];
    return res.status(200).json({
      success: true,
      exists: true,
      verified: Boolean(user.is_verified),
    });
  } catch (error) {
    console.error("Check verification error:", error);
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
  sendVerificationEmail,
  verifyEmail,
  checkVerification,
};
