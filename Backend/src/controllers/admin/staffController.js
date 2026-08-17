import prisma from '../../config/prisma.js';
import bcrypt from 'bcrypt';
import { getDb, ObjectId, checkUniqueNic } from '../../config/mongo.js';

// GET all staff — pagination, search, filter by department/status
export const getStaff = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department, employeeStatus, accessLevel } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(search && {
        OR: [
          { fullName:   { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } },
          { role:       { contains: search, mode: 'insensitive' } },
        ]
      }),
      ...(department     && department     !== 'All' && { department }),
      ...(employeeStatus && employeeStatus !== 'All' && { employeeStatus }),
      ...(accessLevel    && accessLevel    !== 'All' && { accessLevel }),
    };

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { email: true, status: true } } }
      }),
      prisma.staff.count({ where })
    ]);

    res.json({
      data: staff,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single staff by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { email: true, status: true, createdAt: true } } }
    });
    if (!staff) return res.status(404).json({ error: 'Staff member not found' });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calcAgeFromDob = (dobStr) => {
  if (!dobStr) return null;
  const dobDate = new Date(dobStr);
  const today = new Date();
  let calculated = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) calculated--;
  return calculated > 0 ? calculated : null;
};

// POST — create new staff member (creates User record with userId, but staff cannot log in)
export const createStaff = async (req, res) => {
  try {
    const {
      email, password,
      fullName, phone, dob, age, gender, nationalId, nic, address,
      department, role, employeeStatus, accessLevel, shift, joiningDate,
      permissions, notes
    } = req.body;

    const db = await getDb();
    const effectiveNic = nationalId || nic || null;

    if (email) {
      const existingUser = await db.collection("User").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'A staff member with this email already exists' });
      }
    }

    if (effectiveNic) {
      const existsInRole = await checkUniqueNic(db, effectiveNic);
      if (existsInRole) {
        return res.status(409).json({ error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.` });
      }
    }

    const userId = new ObjectId();
    const staffId = new ObjectId();
    const now = new Date();
    const computedAge = age ? parseInt(age) : calcAgeFromDob(dob);
    const rawPassword = password || "Staff@123456";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const userDoc = {
      _id: userId,
      email: email || `staff_${staffId.toString().slice(-6)}@medimate.com`,
      password: hashedPassword,
      role: 'Staff',
      status: employeeStatus || 'Active',
      createdAt: now,
      updatedAt: now,
    };

    const staffDoc = {
      _id: staffId,
      userId: userId,
      fullName: fullName || "Staff Member",
      phone: phone || "",
      email: email || null,
      dob: dob || null,
      age: computedAge,
      gender: gender || null,
      nationalId: effectiveNic,
      address: address || null,
      department: department || "Administration",
      role: role || "Nurse",
      employeeStatus: employeeStatus || 'Active',
      accessLevel: accessLevel || 'Standard',
      shift: shift || "Day",
      joiningDate: joiningDate || null,
      permissions: permissions || [],
      notes: notes || null,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("User").insertOne(userDoc);
    await db.collection("Staff").insertOne(staffDoc);

    const created = { id: staffId.toString(), userId: userId.toString(), ...staffDoc };
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStaff = createStaff;

// PUT — update staff details
export const updateStaff = async (req, res) => {
  try {
    const {
      fullName, phone, dob, age, gender, nationalId, nic, address,
      department, role, employeeStatus, accessLevel, shift, joiningDate,
      permissions, notes
    } = req.body;

    const db = await getDb();
    const staffId = new ObjectId(req.params.id);
    const effectiveNic = nationalId || nic || undefined;

    if (effectiveNic) {
      const existsInRole = await checkUniqueNic(db, effectiveNic, req.params.id);
      if (existsInRole) {
        return res.status(409).json({ error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.` });
      }
    }

    const computedAge = age !== undefined ? (age ? parseInt(age) : null) : (dob ? calcAgeFromDob(dob) : undefined);

    const updateFields = {
      ...(fullName !== undefined && { fullName }),
      ...(phone !== undefined && { phone }),
      ...(dob !== undefined && { dob }),
      ...(computedAge !== undefined && { age: computedAge }),
      ...(gender !== undefined && { gender }),
      ...(effectiveNic !== undefined && { nationalId: effectiveNic }),
      ...(address !== undefined && { address }),
      ...(department !== undefined && { department }),
      ...(role !== undefined && { role }),
      ...(employeeStatus !== undefined && { employeeStatus }),
      ...(accessLevel !== undefined && { accessLevel }),
      ...(shift !== undefined && { shift }),
      ...(joiningDate !== undefined && { joiningDate }),
      ...(permissions !== undefined && { permissions }),
      ...(notes !== undefined && { notes }),
      updatedAt: new Date(),
    };

    const result = await db.collection("Staff").findOneAndUpdate(
      { _id: staffId },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    const updated = { id: result._id.toString(), userId: result.userId?.toString(), ...result };
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH — deactivate/activate staff (soft delete)
export const updateStaffStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Active' | 'Inactive'
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ error: 'Status must be Active or Inactive' });
    }

    const db = await getDb();
    const staffId = new ObjectId(req.params.id);

    const staff = await db.collection("Staff").findOneAndUpdate(
      { _id: staffId },
      { $set: { employeeStatus: status, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!staff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    if (staff.userId) {
      await db.collection("User").updateOne(
        { _id: staff.userId },
        { $set: { status, updatedAt: new Date() } }
      );
    }

    res.json({ message: `Staff ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, staff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH — update staff permissions only
export const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const db = await getDb();
    const staffId = new ObjectId(req.params.id);

    const staff = await db.collection("Staff").findOneAndUpdate(
      { _id: staffId },
      { $set: { permissions: permissions || [], updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!staff) return res.status(404).json({ error: 'Staff member not found' });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete staff member
export const deleteStaff = async (req, res) => {
  try {
    const db = await getDb();
    const staffId = new ObjectId(req.params.id);

    const staff = await db.collection("Staff").findOne({ _id: staffId });
    if (!staff) return res.status(404).json({ error: 'Staff member not found' });

    await db.collection("Staff").deleteOne({ _id: staffId });
    if (staff.userId) {
      await db.collection("User").deleteOne({ _id: staff.userId });
    }

    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
