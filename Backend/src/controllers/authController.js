import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { getDb, ObjectId } from "../config/mongo.js";
import { createPatient } from "./admin/patientController.js";

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

      return res.json({
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

    return res.json({
      user: safeMongoUser,
      profile,
      role: mongoUser.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
