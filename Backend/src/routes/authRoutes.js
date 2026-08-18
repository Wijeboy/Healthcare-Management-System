import express from "express";
import {
  login,
  registerPatient,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerPatient);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
