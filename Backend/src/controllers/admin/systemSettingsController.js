import { getDb } from "../../config/mongo.js";

const DEFAULT_SETTINGS = {
  hospitalName: "City Hospital",
  administratorEmail: "",
  sessionTimeoutMinutes: 30,
};

// GET GLOBAL SYSTEM SETTINGS
export const getGlobalSystemSettings = async (req, res) => {
  try {
    const db = await getDb();

    const settings = await db
      .collection("SystemSettings")
      .findOne({ key: "global" });

    if (!settings) {
      return res.status(200).json({
        success: true,
        configured: false,
        data: DEFAULT_SETTINGS,
      });
    }

    const { _id, key, ...settingsData } = settings;

    return res.status(200).json({
      success: true,
      configured: true,
      data: settingsData,
    });
  } catch (error) {
    console.error("Get global system settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve global system settings",
    });
  }
};

// UPDATE GLOBAL SYSTEM SETTINGS
export const updateGlobalSystemSettings = async (req, res) => {
  try {
    const db = await getDb();

    const {
      hospitalName,
      administratorEmail,
      sessionTimeoutMinutes,
    } = req.body;

    const updateData = {};

    // Hospital name validation
    if (hospitalName !== undefined) {
      if (
        typeof hospitalName !== "string" ||
        hospitalName.trim().length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Hospital name cannot be empty",
        });
      }

      updateData.hospitalName = hospitalName.trim();
    }

    // Administrator email validation
    if (administratorEmail !== undefined) {
      if (typeof administratorEmail !== "string") {
        return res.status(400).json({
          success: false,
          message: "Administrator email must be a string",
        });
      }

      const cleanedEmail = administratorEmail.trim().toLowerCase();

      if (
        cleanedEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid administrator email",
        });
      }

      updateData.administratorEmail = cleanedEmail;
    }

    // Session timeout validation
    if (sessionTimeoutMinutes !== undefined) {
      const timeout = Number(sessionTimeoutMinutes);

      if (!Number.isInteger(timeout) || timeout <= 0) {
        return res.status(400).json({
          success: false,
          message: "Session timeout must be a positive whole number",
        });
      }

      updateData.sessionTimeoutMinutes = timeout;
    }

    // Make sure at least one setting was provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid settings were provided",
      });
    }

    const now = new Date();

    await db.collection("SystemSettings").updateOne(
      { key: "global" },
      {
        $set: {
          ...updateData,
          updatedAt: now,
        },
        $setOnInsert: {
          key: "global",
          createdAt: now,
        },
      },
      { upsert: true },
    );

    const updatedSettings = await db
      .collection("SystemSettings")
      .findOne({ key: "global" });

    const { _id, key, ...settingsData } = updatedSettings;

    return res.status(200).json({
      success: true,
      message: "Global system settings updated successfully",
      data: settingsData,
    });
  } catch (error) {
    console.error("Update global system settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update global system settings",
    });
  }
};