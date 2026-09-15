const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

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

    const userRes = await client.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
       VALUES ($1, $2, $3, $4, 'student', $5, $6, 'Active')
       RETURNING id, name, email, role, dob`,
      [name, name, email.trim().toLowerCase(), hashedPassword, phone || null, dob || null]
    );

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

module.exports = {
  loginUser,
  registerUser,
  getMe,
};
