import express from "express";
import * as authController from "../controllers/authController.js";
import { checkEmailVerification, checkRole } from "../utils/middelwares/auth.js";
import profileImageUpload from "../utils/profileImageUpload.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.post("/verify-invitation", authController.verifyInvitation);
router.post("/login", checkEmailVerification, authController.login);
router.post("/logout", authController.logout);

// Protected routes (authentication required)
router.get("/check", authController.checkAuth);
router.patch("/profile", profileImageUpload.single('image'), authController.updateProfile);

export default router;
