import Department from "../models/Department.js";
import User from "../models/User.js";
import crypto from "crypto";
import { emailSender } from "../utils/email/emailSender.js";
import { departmentInvitationTemplate } from "../utils/email/emailTemplates.js";


// Create department and send invitation
export const createDepartment = async (req, res) => {
    try {
        const { name, chefEmail, facultyId } = req.body;

        // Validate input
        if (!name || !chefEmail || !facultyId) {
            return res.status(400).json({
                success: false,
                message: "Department name, chef email, and faculty ID are required"
            }); 
        }

        // Check if department already exists
        const existingDepartment = await Department.findOne({ name, facultyId });
        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department with this name already exists"
            });
        }

        // ckeck if the chefEmail is already in use
        const existingUser = await User.findOne({ email: chefEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }


        // Generate invitation token
        const invitationToken = crypto.randomBytes(32).toString("hex");
        const invitationLink = `${process.env.CLIENT_URL}/register?token=${invitationToken}&role=department&email=${chefEmail}`;

        // Create department
        const department = await Department.create({
            name,
            chefEmail,
            facultyId,
            invitationLink: invitationToken
        });

        // Send invitation email
        await emailSender({
            email: chefEmail,
            subject: "Invitation - Print Management System",
            html: departmentInvitationTemplate(name, invitationLink)
        });

        res.status(201).json({
            success: true,
            message: "Department created and invitation sent successfully",
            data: {
                _id: department._id,
                name: department.name,
                chefEmail: department.chefEmail,
                facultyId: department.facultyId
            }
        });

    } catch (error) {
        console.error("Department creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating department",
            error: error.message
        });
    }
};

// Get departments by facultyId
export const getDepartments = async (req, res) => {
    try {
        const { facultyId } = req.user; // Get facultyId from authenticated user

        if (!facultyId) {
            return res.status(400).json({
                success: false,
                message: "Faculty ID is required"
            });
        }

        const departments = await Department.find({ facultyId });

        res.status(200).json({
            success: true,
            data: departments
        });

    } catch (error) {
        console.error("Get departments error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching departments",
            error: error.message
        });
    }
};

// Update department
export const updateDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { name, chefEmail } = req.body;
        const { facultyId } = req.user;

        // Validate input
        if (!name && !chefEmail) {
            return res.status(400).json({
                success: false,
                message: "At least one field (name or chefEmail) is required"
            });
        }

        // Find department
        const department = await Department.findOne({ _id: departmentId, facultyId });
        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        // If name is being updated, check for duplicates
        if (name && name !== department.name) {
            const existingDepartment = await Department.findOne({ name, facultyId });
            if (existingDepartment) {
                return res.status(400).json({
                    success: false,
                    message: "Department with this name already exists"
                });
            }
        }

        // If chefEmail is being updated
        if (chefEmail && chefEmail !== department.chefEmail) {
            // Check if new email is already in use
            const existingUser = await User.findOne({ email: chefEmail });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use"
                });
            }

            // Generate new invitation token
            const invitationToken = crypto.randomBytes(32).toString("hex");
            const invitationLink = `${process.env.CLIENT_URL}/register?token=${invitationToken}&role=department&email=${chefEmail}`;

            // Update department with new invitation
            department.invitationLink = invitationToken;
            department.chefEmail = chefEmail;
            department.isRegistered = false; // Reset registration status
            department.chefName = null; // Clear chef name

            // Send invitation email
            await emailSender({
                email: chefEmail,
                subject: "Invitation - Print Management System",
                html: departmentInvitationTemplate(name, invitationLink)
            });
        }

        // Update name if provided
        if (name) {
            department.name = name;
        }

        await department.save();

        res.status(200).json({
            success: true,
            message: "Department updated successfully",
            data: {
                _id: department._id,
                name: department.name,
                chefEmail: department.chefEmail,
                facultyId: department.facultyId,
                isRegistered: department.isRegistered
            }
        });

    } catch (error) {
        console.error("Department update error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating department",
            error: error.message
        });
    }
};

// Delete department
export const deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { facultyId } = req.user;

        // Find department
        const department = await Department.findOne({ _id: departmentId, facultyId });
        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        // If department is registered, find and remove the chef user
        if (department.isRegistered) {
            const chefUser = await User.findOne({ 
                email: department.chefEmail,
                departmentId: department._id
            });
            
            if (chefUser) {
                await chefUser.deleteOne();
            }
        }

        // Delete department
        await department.deleteOne();

        res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });

    } catch (error) {
        console.error("Department deletion error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting department",
            error: error.message
        });
    }
};