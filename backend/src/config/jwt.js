/**
 * Centralized JWT Configuration & Secret Validator
 * Enforces strong security in production and consistent secret resolution across all modules.
 */

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "FATAL SECURITY ERROR: JWT_SECRET environment variable must be set in production! Refusing to run with default secret."
      );
    }
    console.warn(
      "⚠️ [SECURITY WARNING]: JWT_SECRET is not configured in .env. Using fallback development secret."
    );
    return "dizital_adda_secret_jwt_key_2026";
  }
  return secret;
};

module.exports = {
  getJwtSecret,
};
