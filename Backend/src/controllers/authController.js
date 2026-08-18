import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { getDb, ObjectId } from "../config/mongo.js";
import { createPatient } from "./admin/patientController.js";

const JWT_SECRET = process.env.JWT_SECRET || "medimate_healthcare_super_secret_jwt_key_2026";

export const registerPatient = createPatient;

const safeUserResponse = (user, profile = null) => {
  const { password: _, ...safeUser } = user;
  return {
    user: safeUser,
    profile,
  };
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    const ALLOWED_LOGIN_ROLES = ["Patient", "Doctor", "Admin"];
    if (!ALLOWED_LOGIN_ROLES.includes(role)) {
      if (role === "Staff") {
        return res.status(403).json({ error: "Staff members do not have dashboard access and cannot log in" });
      }
      return res.status(403).json({ error: `Login is not permitted for role: ${role}` });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const prismaUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        admin: true,
        doctor: true,
        patient: true,
        staff: true,
      },
    });

    if (prismaUser) {
      if (prismaUser.role === "Staff") {
        return res.status(403).json({ error: "Staff members do not have dashboard access and cannot log in" });
      }

      if (prismaUser.role !== role) {
        return res.status(403).json({ error: `This account is registered as ${prismaUser.role}, not ${role}` });
      }

      if (prismaUser.status !== "Active") {
        return res.status(403).json({ error: "This account is inactive" });
      }

      const isPasswordValid = await bcrypt.compare(password, prismaUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      let profile = null;
      if (role === "Admin") profile = prismaUser.admin;
      if (role === "Doctor") profile = prismaUser.doctor;
      if (role === "Patient") profile = prismaUser.patient;

      const token = jwt.sign(
        { id: prismaUser.id, email: prismaUser.email, role: prismaUser.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const refreshToken = jwt.sign(
        { id: prismaUser.id, email: prismaUser.email, role: prismaUser.role, type: "refresh" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        accessToken: token,
        refreshToken,
        ...safeUserResponse(prismaUser, profile),
        role: prismaUser.role,
      });
    }

    const db = await getDb();
    const mongoUser = await db.collection("User").findOne({ email: normalizedEmail });

    if (!mongoUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (mongoUser.role === "Staff") {
      return res.status(403).json({ error: "Staff members do not have dashboard access and cannot log in" });
    }

    if (mongoUser.role !== role) {
      return res.status(403).json({ error: `This account is registered as ${mongoUser.role}, not ${role}` });
    }

    if (mongoUser.status !== "Active") {
      return res.status(403).json({ error: "This account is inactive" });
    }

    const isPasswordValid = await bcrypt.compare(password, mongoUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let profile = null;
    if (role === "Doctor") {
      profile = await db.collection("Doctor").findOne({ userId: new ObjectId(mongoUser._id) });
    } else if (role === "Patient") {
      profile = await db.collection("Patient").findOne({ userId: new ObjectId(mongoUser._id) });
    } else if (role === "Admin") {
      profile = await db.collection("Admin").findOne({ userId: new ObjectId(mongoUser._id) });
    }

    const safeMongoUser = {
      id: mongoUser._id.toString(),
      email: mongoUser.email,
      role: mongoUser.role,
      status: mongoUser.status,
      createdAt: mongoUser.createdAt,
      updatedAt: mongoUser.updatedAt,
    };

    const token = jwt.sign(
      { id: safeMongoUser.id, email: safeMongoUser.email, role: safeMongoUser.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: safeMongoUser.id, email: safeMongoUser.email, role: safeMongoUser.role, type: "refresh" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      accessToken: token,
      refreshToken,
      user: safeMongoUser,
      profile,
      role: mongoUser.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Forgot Password API — Generates a 15-minute reset token
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists in Prisma or Mongo
    const prismaUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    let mongoUser = null;
    if (!prismaUser) {
      const db = await getDb();
      mongoUser = await db.collection("User").findOne({ email: normalizedEmail });
    }

    if (!prismaUser && !mongoUser) {
      // Return successful response to avoid email enumeration
      return res.json({
        success: true,
        message: "If an account exists with that email, a password reset token has been issued.",
      });
    }

    const resetToken = jwt.sign(
      { email: normalizedEmail, purpose: "reset_password" },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({
      success: true,
      message: "Password reset token generated successfully.",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Reset Password API — Verifies token & updates password with bcrypt hash
 */
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ error: "Reset token and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired password reset token." });
    }

    if (decoded.purpose !== "reset_password" || !decoded.email) {
      return res.status(400).json({ error: "Invalid token payload for password reset." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const normalizedEmail = decoded.email.toLowerCase();

    const prismaUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (prismaUser) {
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { password: hashedPassword },
      });
    } else {
      const db = await getDb();
      await db.collection("User").updateOne(
        { email: normalizedEmail },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
    }

    return res.json({
      success: true,
      message: "Password reset successfully. You may now log in with your new password.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Token Refresh API — Issues new access token from valid refresh token
 */
export const refreshToken = async (req, res) => {
  try {
    const tokenToRefresh = req.body.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!tokenToRefresh) {
      return res.status(400).json({ error: "Refresh token is required." });
    }

    let decoded;
    try {
      decoded = jwt.verify(tokenToRefresh, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired refresh token." });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      success: true,
      token: newAccessToken,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Logout API
 */
export const logout = async (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
};
