import prisma from '../../config/prisma.js';

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

// POST — add new staff member
export const addStaff = async (req, res) => {
  try {
    const {
      email, password,
      fullName, phone, dob, age, gender, nationalId, address,
      department, role, employeeStatus, accessLevel, shift, joiningDate,
      permissions, notes
    } = req.body;

    const newStaff = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Staff', status: employeeStatus || 'Active' }
      });
      return tx.staff.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          email,
          dob,
          age: age ? parseInt(age) : null,
          gender,
          nationalId,
          address,
          department,
          role,
          employeeStatus: employeeStatus || 'Active',
          accessLevel: accessLevel || 'Standard',
          shift,
          joiningDate,
          permissions: permissions || [],
          notes,
        }
      });
    });

    res.status(201).json(newStaff);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A staff member with this email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT — update staff details
export const updateStaff = async (req, res) => {
  try {
    const {
      fullName, phone, dob, age, gender, nationalId, address,
      department, role, employeeStatus, accessLevel, shift, joiningDate,
      permissions, notes
    } = req.body;

    const updated = await prisma.staff.update({
      where: { id: req.params.id },
      data: {
        fullName, phone, dob,
        age: age ? parseInt(age) : undefined,
        gender, nationalId, address,
        department, role, employeeStatus, accessLevel, shift, joiningDate,
        permissions: permissions || [],
        notes,
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Staff member not found' });
    }
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

    const [staff] = await prisma.$transaction([
      prisma.staff.update({
        where: { id: req.params.id },
        data: { employeeStatus: status }
      }),
      prisma.user.updateMany({
        where: { staff: { id: req.params.id } },
        data: { status }
      })
    ]);

    res.json({ message: `Staff ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, staff });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// PATCH — update staff permissions only
export const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const staff = await prisma.staff.update({
      where: { id: req.params.id },
      data: { permissions }
    });
    res.json(staff);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete staff member
export const deleteStaff = async (req, res) => {
  try {
    const staff = await prisma.staff.findUnique({ where: { id: req.params.id } });
    if (!staff) return res.status(404).json({ error: 'Staff member not found' });

    await prisma.$transaction([
      prisma.staff.delete({ where: { id: req.params.id } }),
      prisma.user.delete({ where: { id: staff.userId } })
    ]);

    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
