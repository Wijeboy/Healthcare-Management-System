import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

export const getAdminProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check Prisma User
    const prismaUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
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

    let safeUser = null;
    let adminProfile = null;

    if (prismaUser && prismaUser.role === 'Admin') {
      const { password: _, ...rest } = prismaUser;
      safeUser = rest;
      if (prismaUser.admin) {
        adminProfile = prismaUser.admin;
      }
    }

    // 2. Check MongoDB for User/Admin if needed
    const db = await getDb();
    const mongoUser = await db.collection("User").findOne({ email: normalizedEmail });

    if (mongoUser && mongoUser.role === 'Admin') {
      if (!safeUser) {
        safeUser = {
          id: mongoUser._id.toString(),
          email: mongoUser.email,
          role: mongoUser.role,
          status: mongoUser.status,
          createdAt: mongoUser.createdAt,
          updatedAt: mongoUser.updatedAt,
        };
      }

      if (!adminProfile) {
        const userIdStr = mongoUser._id.toString();
        const foundAdmin = await db.collection("Admin").findOne({
          $or: [
            { userId: userIdStr },
            { userId: mongoUser._id },
            { userId: new ObjectId(mongoUser._id) }
          ]
        });

        if (foundAdmin) {
          adminProfile = {
            id: foundAdmin._id.toString(),
            fullName: foundAdmin.fullName || "System Admin",
            phone: foundAdmin.phone || "",
          };
        }
      }
    }

    if (!safeUser) {
      return res.status(404).json({ error: 'Admin profile not found' });
    }

    return res.json({
      ...safeUser,
      email: safeUser.email || normalizedEmail,
      profile: adminProfile || { fullName: "System Admin", phone: "" },
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

    const normalizedEmail = email.trim().toLowerCase();
    const targetEmail = newEmail ? newEmail.trim().toLowerCase() : normalizedEmail;

    const db = await getDb();

    // 1. Fetch User from MongoDB
    let mongoUser = await db.collection("User").findOne({ email: normalizedEmail });

    if (!mongoUser) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // 2. Collision check if email is changing
    if (newEmail && targetEmail !== normalizedEmail) {
      const existingUser = await db.collection("User").findOne({ email: targetEmail });
      if (existingUser) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }
    }

    // 3. Password verification & hashing
    if (newPassword && !currentPassword) {
      return res.status(400).json({ error: 'Current password is required to change the password' });
    }

    if (newPassword && mongoUser.password) {
      const validPassword = await bcrypt.compare(currentPassword, mongoUser.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
    }

    let hashedNewPassword = null;
    if (newPassword) {
      hashedNewPassword = await bcrypt.hash(newPassword, 10);
    }

    // 4. Update User record in MongoDB
    const userUpdateFields = {
      ...(newEmail && { email: targetEmail }),
      ...(hashedNewPassword && { password: hashedNewPassword }),
      updatedAt: new Date(),
    };

    await db.collection("User").updateOne(
      { _id: mongoUser._id },
      { $set: userUpdateFields }
    );

    // 5. Update Admin profile record in MongoDB
    const userIdStr = mongoUser._id.toString();
    const adminUpdateFields = {
      ...(fullName !== undefined && { fullName: fullName.trim() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      updatedAt: new Date(),
    };

    await db.collection("Admin").updateOne(
      {
        $or: [
          { userId: userIdStr },
          { userId: mongoUser._id },
          { userId: new ObjectId(mongoUser._id) }
        ]
      },
      {
        $set: {
          userId: userIdStr,
          ...adminUpdateFields
        }
      },
      { upsert: true }
    );

    const updatedAdminDoc = await db.collection("Admin").findOne({
      $or: [
        { userId: userIdStr },
        { userId: mongoUser._id },
        { userId: new ObjectId(mongoUser._id) }
      ]
    });

    return res.json({
      user: {
        id: userIdStr,
        email: targetEmail,
        role: 'Admin',
      },
      email: targetEmail,
      profile: {
        id: updatedAdminDoc?._id?.toString(),
        fullName: fullName !== undefined ? fullName.trim() : (updatedAdminDoc?.fullName || "System Admin"),
        phone: phone !== undefined ? phone.trim() : (updatedAdminDoc?.phone || ""),
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
