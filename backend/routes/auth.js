import express from "express";
import { register, verifyOTP, login, logout, verifyInvitation, checkAuth, getProfile } from "../controllers/authController.js";
import { checkEmailVerification, checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/verify-invitation", verifyInvitation);
router.post("/login", checkEmailVerification, login);
router.post("/logout", logout);

// Protected routes (authentication required)
router.get("/check", checkAuth);
router.get("/profile", checkRole(["admin", "department", "teacher", "printer"]), getProfile);

export default router;
