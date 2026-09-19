const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getMe,
  sendVerificationEmail,
  verifyEmail,
  checkVerification,
  migrateSchema,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Public Auth Endpoints
router.post("/login", loginUser);
router.post("/register", registerUser);

// Email Verification Endpoints
router.post("/send-verification-email", sendVerificationEmail);
router.get("/verify-email", verifyEmail);
router.post("/verify-email", verifyEmail);
router.post("/check-verification", checkVerification);
router.get("/migrate-schema", migrateSchema);
router.post("/migrate-schema", migrateSchema);

// Protected Auth Endpoints
router.get("/me", verifyToken, getMe);

module.exports = router;
