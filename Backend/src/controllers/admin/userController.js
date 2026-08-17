import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

// GET all users — pagination, search, filter by role/status
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(search && { email: { contains: search, mode: 'insensitive' } }),
      ...(role   && role   !== 'All' && { role }),
      ...(status && status !== 'All' && { status }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          admin:   { select: { fullName: true } },
          doctor:  { select: { fullName: true } },
          patient: { select: { fullName: true } },
          staff:   { select: { fullName: true } },
        },
      }),
      prisma.user.count({ where })
    ]);

    const safeUsers = users.map(({ password, ...u }) => u);

    res.json({
      data: safeUsers,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST — create a standalone user account
export const createUser = async (req, res) => {
  try {
    const { email, password, role, status } = req.body;
    const rawPassword = password || "User@123456";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role, status: status || 'Active' }
    });
    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// POST — create a new admin account with admin profile
export const createAdmin = async (req, res) => {
  try {
    const { email, password, fullName, phone, status = 'Active' } = req.body;
    const tempPassword = password || `Adm@${Math.random().toString(36).slice(2, 8).toUpperCase()}${Date.now().toString(36).slice(-4).toUpperCase()}`;

    if (!email || !fullName || !phone) {
      return res.status(400).json({ error: 'Email, full name, and phone are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = await getDb();

    const existingUser = await db.collection("User").findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const userId = new ObjectId();
    const adminId = new ObjectId();
    const now = new Date();

    const userDoc = {
      _id: userId,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'Admin',
      status,
      createdAt: now,
      updatedAt: now,
    };

    const adminDoc = {
      _id: adminId,
      userId: userId.toString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("User").insertOne(userDoc);
    await db.collection("Admin").insertOne(adminDoc);

    res.status(201).json({
      id: userId.toString(),
      email: normalizedEmail,
      role: 'Admin',
      status,
      tempPassword,
      admin: {
        id: adminId.toString(),
        fullName: fullName.trim(),
        phone: phone.trim(),
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT — update user email / status
export const updateUser = async (req, res) => {
  try {
    const { email, status } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, status }
    });
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: error.message });
  }
};

// PATCH — assign / change user role
export const assignRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['Patient', 'Doctor', 'Admin', 'Staff'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Role must be one of: ${validRoles.join(', ')}` });
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role }
    });
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: error.message });
  }
};

// DELETE — delete user account
export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        admin: true,
        doctor: true,
        patient: true,
        staff: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.$transaction(async (tx) => {
      if (user.admin) {
        await tx.admin.delete({ where: { id: user.admin.id } });
      }
      if (user.doctor) {
        await tx.doctor.delete({ where: { id: user.doctor.id } });
      }
      if (user.patient) {
        await tx.patient.delete({ where: { id: user.patient.id } });
      }
      if (user.staff) {
        await tx.staff.delete({ where: { id: user.staff.id } });
      }
      await tx.user.delete({ where: { id: req.params.id } });
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: error.message });
  }
};
