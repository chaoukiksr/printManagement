import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import "../stratigies/localStrategy.js";
import Department from "../models/Department.js";
import Invitation from "../models/Invitations.js";
import { emailSender } from "../utils/email/emailSender.js";
import { emailVerificationTemplate } from "../utils/email/emailTemplates.js";
import fs from 'fs';
import path from 'path';

export const register = async (req, res) => {
  try {
    const { username, email, password, role, facultyName } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role || !facultyName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    // Check if faculty exists, if not create it
    let faculty = await Faculty.findOne({ name: facultyName });
    if (!faculty) {
      faculty = await Faculty.create({ name: facultyName });
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Faculty with this name already exists , please use a different name",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      facultyId: faculty._id,
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      facultyId: user.facultyId,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Check if OTP exists and is not expired
    if (!user.emailVerificationOTP || !user.emailVerificationOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one",
      });
    }

    // Check OTP expiration
    if (new Date() > user.emailVerificationOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one",
      });
    }

    // Verify OTP
    if (user.emailVerificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationOTP = null;
    user.emailVerificationOTPExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error during authentication",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Authentication failed",
      });
    }

    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error during login",
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
      });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error during logout",
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  });
};

// handle the invitation links
// Verify invitation token and register user
export const verifyInvitation = async (req, res) => {
  try {
    const {
      token,
      email,
      username,
      password,
      role,
      isSubAdmin = false,
    } = req.body;

    if (!token || !email || !username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Token, email, username, password, and role are required",
      });
    }

    // Validate role
    const validRoles = ["department", "teacher", "printer", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Username or email is already taken",
      });
    }

    let userData = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      isEmailVerified: true, // Auto-verify email since it's from invitation
      isSubAdmin: isSubAdmin,
    };

    // Handle different roles and their relationships
    switch (role) {
      case "department":
        // Find department by invitation token and email
        const department = await Department.findOne({
          invitationLink: token,
          chefEmail: email,
        });

        if (!department) {
          return res.status(404).json({
            success: false,
            message: "Invalid or expired department invitation",
          });
        }

        if (department.isRegistered) {
          return res.status(400).json({
            success: false,
            message: "Department is already registered",
          });
        }

        // Update user data for department chef
        userData.departmentId = department._id;
        userData.facultyId = department.facultyId;
        userData.isSubAdmin = department.isRegistered;

        // Update department status
        department.isRegistered = true;
        department.invitationLink = null;
        department.chefName = username;
        await department.save();

        // Delete used invitation
        const departmentInvitation = await Invitation.findOne({
          invitationLink: token,
          email,
          role: "department",
        });
        if (departmentInvitation) {
          await departmentInvitation.deleteOne();
        }
        break;

      case "teacher":
        // Find invitation
        const teacherInvitation = await Invitation.findOne({
          invitationLink: token,
          email,
          role: "teacher",
        });

        if (!teacherInvitation) {
          return res.status(404).json({
            success: false,
            message: "Invalid or expired teacher invitation",
          });
        }

        // Find department
        const teacherDepartment = await Department.findById(
          teacherInvitation.from
        );
        if (!teacherDepartment) {
          return res.status(404).json({
            success: false,
            message: "Department not found",
          });
        }

        // Update user data for teacher
        userData.departmentId = teacherDepartment._id;
        userData.facultyId = teacherDepartment.facultyId;

        // Delete used invitation
        await teacherInvitation.deleteOne();
        break;

      case "printer":
        // Find invitation
        const printerInvitation = await Invitation.findOne({
          invitationLink: token,
          email,
          role: "printer",
        });

        if (!printerInvitation) {
          return res.status(404).json({
            success: false,
            message: "Invalid or expired printer invitation",
          });
        }

        // Find faculty
        const faculty = await Faculty.findById(printerInvitation.from);
        if (!faculty) {
          return res.status(404).json({
            success: false,
            message: "Faculty not found",
          });
        }

        // Update user data for printer
        userData.facultyId = faculty._id;

        // Delete used invitation
        await printerInvitation.deleteOne();
        break;

      case "admin":
        // Find invitation
        const adminInvitation = await Invitation.findOne({
          invitationLink: token,
          email,
          role: "admin",
        });

        if (!adminInvitation) {
          return res.status(404).json({
            success: false,
            message: "Invalid or expired admin invitation",
          });
        }

        // Find faculty
        const adminFrom =
          (await Faculty.findById(adminInvitation.from)) ||
          (await Department.findById(adminInvitation.from));
        if (!adminFrom) {
          return res.status(404).json({
            success: false,
            message: "Faculty or Department not found",
          });
        }

        // Update user data for admin
        userData.facultyId = adminFrom._id;
        userData.isSubAdmin = true;

        // Delete used invitation
        await adminInvitation.deleteOne();
        break;
    }

    // Create user
    const user = await User.create(userData);

    // Return success response with user data (excluding password)
    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId,
      facultyId: user.facultyId,
      isSubAdmin: user.isSubAdmin,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Invitation verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying invitation and creating user",
      error: error.message,
    });
  }
};

// Check if user is logged in and get their profile
export const checkAuth = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Get user data without sensitive information
    const userData = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      image: req.user.image,
      role: req.user.role,
      departmentId: req.user.departmentId,
      facultyId: req.user.facultyId,
      isSubAdmin: req.user.isSubAdmin,
      isEmailVerified: req.user.isEmailVerified,
    };

    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: userData,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking authentication",
      error: error.message,
    });
  }
};


// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Update user with new OTP
    user.emailVerificationOTP = otp;
    user.emailVerificationOTPExpiry = otpExpiry;
    await user.save();

    // Send verification email
    await emailSender({
      email: user.email,
      subject: "Email Verification - Print Management System",
      html: emailVerificationTemplate(user.username, otp),
    });

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Error resending OTP",
      error: error.message,
    });
  }
};

// Update profile (unified function for both profile info and image)
export const updateProfile = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const imageFile = req.file;

    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update username if provided
    if (username && username !== user.username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken"
        });
      }
      user.username = username;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect"
        });
      }

      // Hash and update new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Update profile image if provided
    if (imageFile) {
      // Delete previous image if it exists
      if (user.image) {
        try {
          const previousImagePath = path.resolve(user.image);
          if (fs.existsSync(previousImagePath)) {
            fs.unlinkSync(previousImagePath);
          }
        } catch (error) {
          console.error("Error deleting previous profile image:", error);
          // Continue with the update even if deletion fails
        }
      }
      user.image = imageFile.path;
    }

    await user.save();

    // Return updated user data (excluding sensitive information)
    const updatedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
      departmentId: user.departmentId,
      facultyId: user.facultyId,
      isSubAdmin: user.isSubAdmin,
      isEmailVerified: user.isEmailVerified
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message
    });
  }
};
