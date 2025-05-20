import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import "../stratigies/localStrategy.js";
import Department from "../models/Department.js";
import Invitation from "../models/Invitations.js";

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
                message: "Email and OTP are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if user is already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified"
            });
        }

        // Check if OTP exists and is not expired
        if (!user.emailVerificationOTP || !user.emailVerificationOTPExpiry) {
            return res.status(400).json({
                success: false,
                message: "No OTP found. Please request a new one"
            });
        }

        // Check OTP expiration
        if (new Date() > user.emailVerificationOTPExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one"
            });
        }

        // Verify OTP
        if (user.emailVerificationOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
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
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying OTP",
            error: error.message
        });
    }
};

export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error during authentication",
                error: err.message
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info.message || "Authentication failed"
            });
        }

        // Log in the user
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error during login",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: user
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
                error: err.message
            });
        }
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    });
};


// handle the invitation links
// Verify invitation token and register user
export const verifyInvitation = async (req, res) => {
    try {
        const { token, email, username, password, role } = req.body;

        if (!token || !email || !username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Token, email, username, password, and role are required"
            });
        }

        // Validate role
        const validRoles = ["department", "teacher", "printer", "admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role specified"
            });
        }

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken"
            });
        }

        let userData = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role,
            isEmailVerified: true, // Auto-verify email since it's from invitation
            isSubAdmin: false,
            departmentId: [] // Initialize as empty array
        };

        // Handle different roles and their relationships
        switch (role) {
            case "department":
                // Find department by invitation token and email
                const department = await Department.findOne({
                    invitationLink: token,
                    chefEmail: email
                });

                if (!department) {
                    return res.status(404).json({
                        success: false,
                        message: "Invalid or expired department invitation"
                    });
                }

                if (department.isRegistered) {
                    return res.status(400).json({
                        success: false,
                        message: "Department is already registered"
                    });
                }

                // Update user data for department chef
                userData.departmentId.push(department._id);
                userData.facultyId = department.facultyId;
                userData.isSubAdmin = department.isRegistered;

                // Update department status
                department.isRegistered = true;
                department.invitationLink = null;
                department.chefName = username;
                await department.save();
                break;

            case "teacher":
                // Find invitation
                const teacherInvitation = await Invitation.findOne({
                    invitationLink: token,
                    email,
                    role: "teacher"
                });

                if (!teacherInvitation) {
                    return res.status(404).json({
                        success: false,
                        message: "Invalid or expired teacher invitation"
                    });
                }

                // Find department
                const teacherDepartment = await Department.findById(teacherInvitation.from);
                if (!teacherDepartment) {
                    return res.status(404).json({
                        success: false,
                        message: "Department not found"
                    });
                }

                // Update user data for teacher
                userData.departmentId.push(teacherDepartment._id);
                userData.facultyId = teacherDepartment.facultyId;

                // Delete used invitation
                await teacherInvitation.deleteOne();
                break;

            case "printer":
                // Find invitation
                const printerInvitation = await Invitation.findOne({
                    invitationLink: token,
                    email,
                    role: "printer"
                });

                if (!printerInvitation) {
                    return res.status(404).json({
                        success: false,
                        message: "Invalid or expired printer invitation"
                    });
                }

                // Find faculty
                const faculty = await Faculty.findById(printerInvitation.from);
                if (!faculty) {
                    return res.status(404).json({
                        success: false,
                        message: "Faculty not found"
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
                    role: "admin"
                });

                if (!adminInvitation) {
                    return res.status(404).json({
                        success: false,
                        message: "Invalid or expired admin invitation"
                    });
                }

                // Find faculty
                const adminFaculty = await Faculty.findById(adminInvitation.from);
                if (!adminFaculty) {
                    return res.status(404).json({
                        success: false,
                        message: "Faculty not found"
                    });
                }

                // Update user data for admin
                userData.facultyId = adminFaculty._id;
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
            isSubAdmin: user.isSubAdmin
        };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: responseData
        });

    } catch (error) {
        console.error("Invitation verification error:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying invitation and creating user",
            error: error.message
        });
    }
};

// Check if user is logged in and get their profile
export const checkAuth = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Get user data without sensitive information
        const userData = {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
            departmentId: req.user.departmentId,
            facultyId: req.user.facultyId,
            isSubAdmin: req.user.isSubAdmin,
            isEmailVerified: req.user.isEmailVerified
        };

        res.status(200).json({
            success: true,
            message: "User is authenticated",
            data: userData
        });

    } catch (error) {
        console.error("Auth check error:", error);
        res.status(500).json({
            success: false,
            message: "Error checking authentication",
            error: error.message
        });
    }
};

// Get user profile with additional data
export const getProfile = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Get user with populated references
        const user = await User.findById(req.user._id)
            .populate('departmentId', 'name')
            .populate('facultyId', 'name');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Format user data
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            departments: user.departmentId ? user.departmentId.map(dept => ({
                _id: dept._id,
                name: dept.name
            })) : null,
            faculty: user.facultyId ? {
                _id: user.facultyId._id,
                name: user.facultyId.name
            } : null,
            isSubAdmin: user.isSubAdmin,
            isEmailVerified: user.isEmailVerified
        };

        res.status(200).json({
            success: true,
            data: userData
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
};
