import prisma from '../../config/prisma.js';

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
        // Never return passwords
      }),
      prisma.user.count({ where })
    ]);

    // Strip passwords before sending
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
    const user = await prisma.user.create({
      data: { email, password, role, status: status || 'Active' }
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
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: error.message });
  }
};
