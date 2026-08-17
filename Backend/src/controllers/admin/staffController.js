import prisma from '../../config/prisma.js';

export const getStaff = async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({ include: { user: true } });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStaff = async (req, res) => {
  try {
    const { email, password, fullName, phone, permissions } = req.body;
    
    const newStaff = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Staff' }
      });
      return tx.staff.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          permissions
        }
      });
    });

    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { fullName, phone, permissions } = req.body;
    const updated = await prisma.staff.update({
      where: { id: req.params.id },
      data: { fullName, phone, permissions }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await prisma.staff.findUnique({ where: { id: req.params.id } });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });

    await prisma.$transaction([
      prisma.staff.delete({ where: { id: req.params.id } }),
      prisma.user.delete({ where: { id: staff.userId } })
    ]);

    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const staff = await prisma.staff.update({
      where: { id: req.params.id },
      data: { permissions }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
