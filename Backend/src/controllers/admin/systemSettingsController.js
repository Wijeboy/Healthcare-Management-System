import { getDb } from "../../config/mongo.js";

const DEFAULT_SETTINGS = {
  hospitalName: "City Hospital",
  administratorEmail: "",
  sessionTimeoutMinutes: 30,
};

const DEFAULT_ACCESS_CONTROL_RULES = [
  {
    id: 1,
    name: "Edit Records",
    description: "Ability to modify patient medical history and notes.",
    admin: true,
    doctor: true,
    nurse: false,
  },
  {
    id: 2,
    name: "Process Refunds",
    description: "Access to billing modules for financial adjustments.",
    admin: true,
    doctor: false,
    nurse: false,
  },
  {
    id: 3,
    name: "Issue Prescriptions",
    description: "Authorize and transmit digital prescriptions.",
    admin: false,
    doctor: true,
    nurse: false,
  },
  {
    id: 4,
    name: "Manage Inventory",
    description: "Update stock levels for medical supplies.",
    admin: true,
    doctor: true,
    nurse: true,
  },
];

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

// GET ACCESS CONTROL RULES
export const getAccessControlRules = async (req, res) => {
  try {
    const db = await getDb();

    const accessControl = await db
      .collection("SystemSettings")
      .findOne({ key: "accessControl" });

    if (!accessControl) {
      return res.status(200).json({
        success: true,
        configured: false,
        data: DEFAULT_ACCESS_CONTROL_RULES,
      });
    }

    return res.status(200).json({
      success: true,
      configured: true,
      data: accessControl.rules || DEFAULT_ACCESS_CONTROL_RULES,
    });
  } catch (error) {
    console.error("Get access control rules error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve access control rules",
    });
  }
};

// UPDATE ACCESS CONTROL RULES
export const updateAccessControlRules = async (req, res) => {
  try {
    const db = await getDb();

    const { rules } = req.body;

    if (!Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Access control rules must be a non-empty array",
      });
    }

    // Validate every access control rule
    for (const rule of rules) {
      if (
        typeof rule.id !== "number" ||
        typeof rule.name !== "string" ||
        typeof rule.description !== "string" ||
        typeof rule.admin !== "boolean" ||
        typeof rule.doctor !== "boolean" ||
        typeof rule.nurse !== "boolean"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid access control rule format",
        });
      }
    }

    const now = new Date();

    await db.collection("SystemSettings").updateOne(
      { key: "accessControl" },
      {
        $set: {
          rules,
          updatedAt: now,
        },
        $setOnInsert: {
          key: "accessControl",
          createdAt: now,
        },
      },
      { upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Access control rules updated successfully",
      data: rules,
    });
  } catch (error) {
    console.error("Update access control rules error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update access control rules",
    });
  }
};
