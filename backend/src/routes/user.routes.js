const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

// GET CURRENT USER PROFILE
router.get("/profile", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT id, name, full_name, email, role, phone, avatar, dob, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// UPDATE PROFILE (Name, Phone, Avatar, DOB)
router.put("/profile", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, phone, avatar, dob } = req.body;

    const updateRes = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           full_name = COALESCE($1, full_name),
           phone = COALESCE($2, phone),
           avatar = COALESCE($3, avatar),
           dob = COALESCE($4, dob),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, name, email, role, phone, avatar, dob`,
      [name?.trim() || null, phone?.trim() || null, avatar || null, dob?.trim() || null, userId]
    );

    // Also sync students table if student record exists
    await pool.query(
      `UPDATE students 
       SET name = COALESCE($1, name),
           phone = COALESCE($2, phone),
           image = COALESCE($3, image),
           dob = COALESCE($4, dob),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $5`,
      [name?.trim() || null, phone?.trim() || null, avatar || null, dob?.trim() || null, userId]
    );

    res.json({
      success: true,
      message: "Profile updated successfully! ✅",
      user: updateRes.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// CHANGE PASSWORD (Temporary to permanent or personal password)
router.put("/change-password", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const userRes = await pool.query(
      "SELECT id, password FROM users WHERE id = $1",
      [userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = userRes.rows[0];

    // If currentPassword is provided, verify it
    if (currentPassword) {
      const isMatch = await bcrypt.compare(String(currentPassword), String(user.password));
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password does not match",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in users table
    await pool.query(
      "UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [hashedPassword, userId]
    );

    // Update in students table
    await pool.query(
      "UPDATE students SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2",
      [hashedPassword, userId]
    );

    res.json({
      success: true,
      message: "Password changed successfully! You can now use your new password. 🚀",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;