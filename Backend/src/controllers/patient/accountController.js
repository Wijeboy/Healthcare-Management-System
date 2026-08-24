import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

/**
 * Update Password API
 * PUT /api/patient/account/password
 */
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long." });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New password and confirmation password do not match." });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different from current password." });
    }

    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    // Try Prisma first, fallback to Mongo
    let userDoc = await prisma.user.findUnique({ where: { id: userId } }).catch(() => null);
    if (!userDoc) {
      userDoc = await db.collection("User").findOne({ _id: userObjId });
    }

    if (!userDoc) {
      return res.status(404).json({ error: "User account not found." });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, userDoc.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect current password." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const now = new Date();

    await prisma.user.update({
      where: { id: userDoc.id || userId },
      data: { password: hashedPassword, updatedAt: now },
    }).catch(async () => {
      await db.collection("User").updateOne(
        { _id: userObjId },
        { $set: { password: hashedPassword, updatedAt: now } }
      );
    });

    return res.json({
      success: true,
      message: "Password updated successfully. Please use your new password for future logins.",
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update Email API
 * PUT /api/patient/account/email
 */
export const updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newEmail, password } = req.body;

    if (!newEmail || typeof newEmail !== 'string') {
      return res.status(400).json({ error: "New email address is required." });
    }

    const normalizedEmail = newEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    let userDoc = await prisma.user.findUnique({ where: { id: userId } }).catch(() => null);
    if (!userDoc) {
      userDoc = await db.collection("User").findOne({ _id: userObjId });
    }

    if (!userDoc) {
      return res.status(404).json({ error: "User account not found." });
    }

    if (userDoc.email.toLowerCase() === normalizedEmail) {
      return res.status(400).json({ error: "New email must be different from current email." });
    }

    if (password) {
      const isPasswordValid = await bcrypt.compare(password, userDoc.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password confirmation." });
      }
    }

    // Check if new email already exists
    const existingUser = await db.collection("User").findOne({
      email: normalizedEmail,
      _id: { $ne: userObjId },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email address is already in use by another account." });
    }

    const now = new Date();

    // Update in Prisma / Mongo
    await prisma.user.update({
      where: { id: userDoc.id || userId },
      data: { email: normalizedEmail, updatedAt: now },
    }).catch(async () => {
      await db.collection("User").updateOne(
        { _id: userObjId },
        { $set: { email: normalizedEmail, updatedAt: now } }
      );
    });

    return res.json({
      success: true,
      message: "Email address updated successfully.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Update Email Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update Phone Number API
 * PUT /api/patient/account/phone
 */
export const updatePhone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone } = req.body;

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    const cleanedPhone = phone.trim();
    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    let patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (!patientDoc) {
      return res.status(404).json({ error: "Patient profile not found." });
    }

    const now = new Date();
    await db.collection("Patient").updateOne(
      { _id: patientDoc._id },
      { $set: { phone: cleanedPhone, updatedAt: now } }
    );

    return res.json({
      success: true,
      message: "Phone number updated successfully.",
      phone: cleanedPhone,
    });
  } catch (error) {
    console.error("Update Phone Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deactivate Account API
 * PATCH /api/patient/account/deactivate
 */
export const deactivateAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, reason } = req.body;

    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    let userDoc = await db.collection("User").findOne({ _id: userObjId });
    if (!userDoc) {
      return res.status(404).json({ error: "User account not found." });
    }

    if (password) {
      const isPasswordValid = await bcrypt.compare(password, userDoc.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password. Cannot deactivate account." });
      }
    }

    const now = new Date();

    await db.collection("User").updateOne(
      { _id: userObjId },
      { $set: { status: "Inactive", updatedAt: now } }
    );

    await db.collection("Patient").updateOne(
      { $or: [{ userId: userObjId }, { _id: userObjId }] },
      { $set: { status: "Inactive", deactivationReason: reason || "Deactivated by patient", updatedAt: now } }
    );

    return res.json({
      success: true,
      message: "Account deactivated successfully. You have been logged out.",
    });
  } catch (error) {
    console.error("Deactivate Account Error:", error);
    res.status(500).json({ error: error.message });
  }
};
