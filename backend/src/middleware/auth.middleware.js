const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../config/jwt");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required: No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing from header",
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
        expired: true,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid or malformed authentication token",
    });
  }
};

exports.optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
      if (token) {
        req.user = jwt.verify(token, getJwtSecret());
      }
    }
  } catch {
    // Ignore invalid tokens on optional routes
  }
  next();
};
