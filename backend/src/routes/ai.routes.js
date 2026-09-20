const express = require("express");
const router = express.Router();
const { askAI } = require("../controllers/ai.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Security: Require authentication to prevent unauthenticated API abuse & credit exhaustion
router.post("/ask", verifyToken, askAI);

module.exports = router;