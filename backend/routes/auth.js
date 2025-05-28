import express from "express";
import * as authController from "../controllers/authController.js";
import { checkEmailVerification, checkRole } from "../utils/middelwares/auth.js";
import profileImageUpload from "../utils/profileImageUpload.js";
import validateData from "../utils/middelwares/requestsValidators/validateData.js";
import {validateOtp,validateResendOtp} from "../utils/middelwares/requestsValidators/validateOtp.js";
import validateVerifyInvitation from "../utils/middelwares/requestsValidators/validateVerifyInvitation.js";
import loginValidator from "../utils/middelwares/requestsValidators/loginValidator.js"
const router = express.Router();
// Public routes (no authentication required)
router.post("/register",validateData, authController.register);
router.post("/verify-otp",validateOtp, authController.verifyOTP);
router.post("/resend-otp",validateResendOtp, authController.resendOTP);
router.post("/verify-invitation",validateVerifyInvitation, authController.verifyInvitation);
router.post("/login",loginValidator, checkEmailVerification, authController.login);
router.post("/logout", authController.logout);
router.post("/request-password-reset", authController.requestPasswordReset);
router.post("/reset-password/:resetToken", authController.resetPassword);

// Protected routes (authentication required)
router.get("/check", authController.checkAuth);
router.patch("/profile", profileImageUpload.single('image'), authController.updateProfile);

export default router;
