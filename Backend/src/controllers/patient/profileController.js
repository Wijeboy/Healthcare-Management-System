import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma.js';
import { getDb, ObjectId, checkUniqueNic } from '../../config/mongo.js';

const JWT_SECRET = process.env.JWT_SECRET || "medimate_healthcare_super_secret_jwt_key_2026";

// Helper calc age from DOB string YYYY-MM-DD
const calcAgeFromDob = (dobStr) => {
  if (!dobStr) return null;
  const dobDate = new Date(dobStr);
  const today = new Date();
  let calculated = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) calculated--;
  return calculated > 0 ? calculated : null;
};

/**
 * Register a new Patient
 * POST /api/patient/auth/register or /api/auth/register
 */
export const registerPatient = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      phone,
      dob,
      bloodGroup,
      age,
      gender,
      nationalId,
      nic,
      address,
      allergies,
      existingConditions,
      currentMedications,
      medicalNotes,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      emergencyEmail,
    } = req.body;

    if (!email || !password || !fullName || !phone) {
      return res.status(400).json({ error: "Email, password, full name, and phone number are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const effectiveNic = nationalId || nic || null;

    const db = await getDb();

    // Check unique email
    const existingUserPrisma = await prisma.user.findUnique({ where: { email: normalizedEmail } }).catch(() => null);
    const existingUserMongo = existingUserPrisma ? null : await db.collection("User").findOne({ email: normalizedEmail });

    if (existingUserPrisma || existingUserMongo) {
      return res.status(409).json({ error: "An account with this email address already exists." });
    }

    // Check unique NIC / National ID if provided
    if (effectiveNic) {
      const existsInRole = await checkUniqueNic(db, effectiveNic);
      if (existsInRole) {
        return res.status(409).json({
          error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.`,
        });
      }
    }

    const userId = new ObjectId();
    const patientId = new ObjectId();
    const now = new Date();
    const computedAge = age ? parseInt(age) : calcAgeFromDob(dob);
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDoc = {
      _id: userId,
      email: normalizedEmail,
      password: hashedPassword,
      role: "Patient",
      status: "Active",
      createdAt: now,
      updatedAt: now,
    };

    const patientDoc = {
      _id: patientId,
      userId: userId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      dob: dob || null,
      bloodGroup: bloodGroup || null,
      age: computedAge,
      gender: gender || null,
      nationalId: effectiveNic,
      address: address || null,
      allergies: allergies || null,
      existingConditions: existingConditions || null,
      currentMedications: currentMedications || null,
      medicalNotes: medicalNotes || null,
      emergencyName: emergencyName || null,
      emergencyRelationship: emergencyRelationship || null,
      emergencyPhone: emergencyPhone || null,
      emergencyEmail: emergencyEmail || null,
      status: "Active",
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("User").insertOne(userDoc);
    await db.collection("Patient").insertOne(patientDoc);

    const token = jwt.sign(
      { id: userId.toString(), email: normalizedEmail, role: "Patient" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: userId.toString(), email: normalizedEmail, role: "Patient", type: "refresh" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Patient registered successfully.",
      token,
      accessToken: token,
      refreshToken,
      user: {
        id: userId.toString(),
        email: normalizedEmail,
        role: "Patient",
        status: "Active",
        createdAt: now,
      },
      patient: {
        id: patientId.toString(),
        userId: userId.toString(),
        ...patientDoc,
      },
    });
  } catch (error) {
    console.error("Patient Registration Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Patient Login
 * POST /api/patient/auth/login
 */
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check Prisma or Mongo
    let prismaUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { patient: true },
    }).catch(() => null);

    const db = await getDb();
    let mongoUser = null;
    let mongoPatient = null;

    if (!prismaUser) {
      mongoUser = await db.collection("User").findOne({ email: normalizedEmail });
      if (mongoUser) {
        mongoPatient = await db.collection("Patient").findOne({ userId: mongoUser._id });
      }
    }

    const user = prismaUser || mongoUser;

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const userRole = prismaUser ? prismaUser.role : mongoUser.role;
    if (userRole !== "Patient") {
      return res.status(403).json({ error: `This account is registered as ${userRole}, not Patient.` });
    }

    const userStatus = prismaUser ? prismaUser.status : mongoUser.status;
    if (userStatus !== "Active") {
      return res.status(403).json({ error: "Account is inactive or deactivated. Please contact support." });
    }

    const passwordHash = prismaUser ? prismaUser.password : mongoUser.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const userIdStr = prismaUser ? prismaUser.id : mongoUser._id.toString();
    const patientProfile = prismaUser ? prismaUser.patient : mongoPatient;

    const token = jwt.sign(
      { id: userIdStr, email: normalizedEmail, role: "Patient" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: userIdStr, email: normalizedEmail, role: "Patient", type: "refresh" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful.",
      token,
      accessToken: token,
      refreshToken,
      user: {
        id: userIdStr,
        email: normalizedEmail,
        role: "Patient",
        status: userStatus,
      },
      patient: patientProfile ? {
        id: patientProfile._id ? patientProfile._id.toString() : patientProfile.id,
        fullName: patientProfile.fullName,
        phone: patientProfile.phone,
        ...patientProfile,
      } : null,
    });
  } catch (error) {
    console.error("Patient Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get logged-in Patient Profile
 * GET /api/patient/profile
 */
export const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await getDb();

    // Try Prisma first
    try {
      const patient = await prisma.patient.findFirst({
        where: {
          OR: [
            { userId: userId },
            { id: userId },
          ],
        },
        include: {
          user: { select: { email: true, status: true, role: true, createdAt: true } },
        },
      });

      if (patient) {
        return res.json({
          success: true,
          data: patient,
        });
      }
    } catch (prismaErr) {}

    // Native Mongo fallback
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    const userDoc = await db.collection("User").findOne({ _id: userObjId });
    let patientDoc = await db.collection("Patient").findOne({ userId: userObjId });

    if (!patientDoc) {
      patientDoc = await db.collection("Patient").findOne({ _id: userObjId });
    }

    if (!patientDoc) {
      return res.status(404).json({ error: "Patient profile not found." });
    }

    const formattedProfile = {
      id: patientDoc._id.toString(),
      _id: patientDoc._id.toString(),
      userId: patientDoc.userId ? patientDoc.userId.toString() : userObjId.toString(),
      fullName: patientDoc.fullName || "",
      phone: patientDoc.phone || "",
      dob: patientDoc.dob || null,
      bloodGroup: patientDoc.bloodGroup || null,
      age: patientDoc.age || (patientDoc.dob ? calcAgeFromDob(patientDoc.dob) : null),
      gender: patientDoc.gender || null,
      nationalId: patientDoc.nationalId || null,
      address: patientDoc.address || null,
      allergies: patientDoc.allergies || null,
      existingConditions: patientDoc.existingConditions || null,
      currentMedications: patientDoc.currentMedications || null,
      medicalNotes: patientDoc.medicalNotes || null,
      emergencyName: patientDoc.emergencyName || null,
      emergencyRelationship: patientDoc.emergencyRelationship || null,
      emergencyPhone: patientDoc.emergencyPhone || null,
      emergencyEmail: patientDoc.emergencyEmail || null,
      status: patientDoc.status || userDoc?.status || "Active",
      createdAt: patientDoc.createdAt,
      updatedAt: patientDoc.updatedAt,
      user: {
        email: userDoc?.email || patientDoc.email || "",
        status: userDoc?.status || patientDoc.status || "Active",
        role: userDoc?.role || "Patient",
        createdAt: userDoc?.createdAt || patientDoc.createdAt,
      },
    };

    return res.json({
      success: true,
      data: formattedProfile,
    });
  } catch (error) {
    console.error("Get Patient Profile Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update logged-in Patient Profile
 * PUT /api/patient/profile
 */
export const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      phone,
      dob,
      bloodGroup,
      age,
      gender,
      nationalId,
      nic,
      address,
      allergies,
      existingConditions,
      currentMedications,
      medicalNotes,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      emergencyEmail,
    } = req.body;

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

    const effectiveNic = nationalId || nic || undefined;

    // NIC uniqueness check if updated
    if (effectiveNic && effectiveNic !== patientDoc.nationalId) {
      const existsInRole = await checkUniqueNic(db, effectiveNic, patientDoc._id);
      if (existsInRole) {
        return res.status(409).json({
          error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.`,
        });
      }
    }

    const computedAge = age !== undefined ? (age ? parseInt(age) : null) : (dob ? calcAgeFromDob(dob) : undefined);

    const updateFields = {
      ...(fullName !== undefined && { fullName: fullName.trim() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(dob !== undefined && { dob }),
      ...(bloodGroup !== undefined && { bloodGroup }),
      ...(computedAge !== undefined && { age: computedAge }),
      ...(gender !== undefined && { gender }),
      ...(effectiveNic !== undefined && { nationalId: effectiveNic }),
      ...(address !== undefined && { address }),
      ...(allergies !== undefined && { allergies }),
      ...(existingConditions !== undefined && { existingConditions }),
      ...(currentMedications !== undefined && { currentMedications }),
      ...(medicalNotes !== undefined && { medicalNotes }),
      ...(emergencyName !== undefined && { emergencyName }),
      ...(emergencyRelationship !== undefined && { emergencyRelationship }),
      ...(emergencyPhone !== undefined && { emergencyPhone }),
      ...(emergencyEmail !== undefined && { emergencyEmail }),
      updatedAt: new Date(),
    };

    const updatedPatient = await db.collection("Patient").findOneAndUpdate(
      { _id: patientDoc._id },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    const userDoc = await db.collection("User").findOne({ _id: patientDoc.userId || userObjId });

    return res.json({
      success: true,
      message: "Patient profile updated successfully.",
      data: {
        id: updatedPatient._id.toString(),
        userId: (updatedPatient.userId || userObjId).toString(),
        ...updatedPatient,
        user: {
          email: userDoc?.email || "",
          status: userDoc?.status || "Active",
        },
      },
    });
  } catch (error) {
    console.error("Update Patient Profile Error:", error);
    res.status(500).json({ error: error.message });
  }
};
