import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

import './config.js';

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                // Find user by email
                const user = await User.findOne({ email });

                // If user doesn't exist
                if (!user) {
                    return done(null, false, {
                        message: "No user found with this email",
                    });
                }

                // Check if email is verified
                if (!user.isEmailVerified) {
                    return done(null, false, {
                        message: "Please verify your email first",
                    });
                }

                // Compare password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, {
                        message: "Invalid password",
                    });
                }

                // Return user without password
                const userWithoutPassword = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    facultyId: user.facultyId,
                    departmentId: user.departmentId,
                    isSubAdmin: user.isSubAdmin,
                };

                return done(null, userWithoutPassword);
            } catch (error) {
                return done(error);
            }
        }
    )
);
