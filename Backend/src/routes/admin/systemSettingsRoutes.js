import express from "express";
import {
  getGlobalSystemSettings,
  updateGlobalSystemSettings,
} from "../../controllers/admin/systemSettingsController.js";

const router = express.Router();

// Get global system settings
router.get("/", getGlobalSystemSettings);

// Update global system settings
router.put("/", updateGlobalSystemSettings);

export default router;