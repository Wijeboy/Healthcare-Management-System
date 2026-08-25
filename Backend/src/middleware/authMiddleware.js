import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "medimate_healthcare_super_secret_jwt_key_2026";

/**
 * Middleware to verify JWT token from Authorization header.
 * Expects header format: Authorization: Bearer <token>
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token required. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid authentication token." });
  }
};

/**
 * Middleware factory for Role-Based Access Control (RBAC).
 * Usage: requireRole("Admin") or requireRole("Admin", "Doctor")
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "User identity unverified." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access forbidden. Required role: [${allowedRoles.join(", ")}], but your role is: ${req.user.role}`,
      });
    }

    next();
  };
};
