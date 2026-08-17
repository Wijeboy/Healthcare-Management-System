import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';

export const getAdminProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        admin: {
          select: {
            id: true,
            fullName: true,
            phone: true,
          }
        }
      }
    });

    if (!user || user.role !== 'Admin') {
      return res.status(404).json({ error: 'Admin profile not found' });
    }

    const { password: _, ...safeUser } = user;
    res.json({
      ...safeUser,
      profile: user.admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { email } = req.query;
    const { fullName, phone, newEmail, currentPassword, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { admin: true }
    });

    if (!user || user.role !== 'Admin') {
      return res.status(404).json({ error: 'Admin profile not found' });
    }

    if (newPassword && !currentPassword) {
      return res.status(400).json({ error: 'Current password is required to change the password' });
    }

    if (newPassword) {
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      const userUpdate = await tx.user.update({
        where: { id: user.id },
        data: {
          ...(newEmail && { email: newEmail }),
          ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
        }
      });

      const adminUpdate = await tx.admin.update({
        where: { id: user.admin.id },
        data: {
          ...(fullName !== undefined && { fullName }),
          ...(phone !== undefined && { phone }),
        }
      });

      return { userUpdate, adminUpdate };
    });

    const refreshed = await prisma.user.findUnique({
      where: { id: updatedUser.userUpdate.id },
      include: {
        admin: {
          select: { id: true, fullName: true, phone: true }
        }
      }
    });

    const { password: _, ...safeUser } = refreshed;
    res.json({
      ...safeUser,
      profile: refreshed.admin,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};
