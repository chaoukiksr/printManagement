import User from "../../models/User.js";
import { emailSender } from "../email/emailSender.js";
import { emailVerificationTemplate } from "../email/emailTemplates.js";
import crypto from "crypto";

// Check if user is authenticated and has a valid role
export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });
        }

        // Check if user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Insufficient privileges"
            });
        }

        next();
    };
};

// Check email verification
export const checkEmailVerification = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isEmailVerified) {
            return next();
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user with new OTP
        user.emailVerificationOTP = otp;
        user.emailVerificationOTPExpiry = otpExpiry;
        await user.save();

        // Send verification email
        await emailSender({
            email: user.email,
            subject: "Email Verification - Print Management System",
            html: emailVerificationTemplate(user.username, otp)
        });

        return res.status(200).json({
            success: true,
            message: "Verification OTP has been sent to your email",
            isVerified: false
        });

    } catch (error) {
        console.error("Email verification check error:", error);
        return res.status(500).json({
            success: false,
            message: "Error checking email verification",
            error: error.message
        });
    }
};
