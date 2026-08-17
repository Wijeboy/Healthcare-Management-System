import prisma from '../../config/prisma.js';

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        admin: true,
        doctor: true,
        patient: true,
        staff: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, role, status } = req.body;
    const user = await prisma.user.create({
      data: { email, password, role, status }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, password, role, status } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, password, role, status }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Note: In a real system, you might want to also delete the associated profile
    // Or you can cascade deletes in prisma schema. For now, just delete the user.
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
