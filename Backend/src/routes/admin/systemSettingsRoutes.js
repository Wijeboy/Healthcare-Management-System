import express from "express";
import {
  getGlobalSystemSettings,
  updateGlobalSystemSettings,
  getAccessControlRules,
  updateAccessControlRules,
} from "../../controllers/admin/systemSettingsController.js";

const router = express.Router();

// Get global system settings
router.get("/", getGlobalSystemSettings);

// Update global system settings
router.put("/", updateGlobalSystemSettings);

// Get access control rules
router.get("/access-control", getAccessControlRules);

// Update access control rules
router.put("/access-control", updateAccessControlRules);

export default router;
