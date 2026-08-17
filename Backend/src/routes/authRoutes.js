import express from "express";
import { login, registerPatient } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerPatient);

export default router;
