const express = require("express");
const router = express.Router();

const {
  getAllCertificates,
  getPendingCertificates,
  getMyCertificates,
  uploadAndIssueCertificate,
  verifyCertificate,
} = require("../controllers/certificate.controller");

const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// Admin Routes
router.get("/all", verifyToken, getAllCertificates);
router.get("/pending", verifyToken, getPendingCertificates);
router.post(
  "/upload",
  verifyToken,
  upload.single("certificate"),
  uploadAndIssueCertificate
);

// Student Route
router.get("/my-certificates", verifyToken, getMyCertificates);

// Public Verification Route
router.get("/verify/:code", verifyCertificate);

module.exports = router;