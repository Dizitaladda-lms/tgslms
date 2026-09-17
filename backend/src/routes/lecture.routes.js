const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadLecture,
  getLectures,
  deleteLecture,
} = require("../controllers/lecture.controller");
const { verifyToken, optionalAuth } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

// Upload lecture (Teacher or Admin)
router.post(
  "/upload",
  verifyToken,
  checkRole("admin", "teacher"),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  uploadLecture
);

// Get lectures (Public or enrolled student progress check)
router.get("/", optionalAuth, getLectures);
router.get("/:course_id", optionalAuth, getLectures);

// Delete lecture (Admin or Teacher)
router.delete("/:id", verifyToken, checkRole("admin", "teacher"), deleteLecture);

module.exports = router;