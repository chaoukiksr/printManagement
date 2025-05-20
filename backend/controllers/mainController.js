import Department from "../models/Department.js";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import Invitation from "../models/Invitations.js";
import { emailSender } from "../utils/email/emailSender.js";
import { departmentInvitationTemplate } from "../utils/email/emailTemplates.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

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
        const invitationLink = `${process.env.CLIENT_URL}/register?token=${invitationToken}&role=department&name=${name}&email=${chefEmail}`;

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

// Create invitation (for teachers, printers, and admins)
export const createInvitation = async (req, res) => {
    try {
        const { email, role, from } = req.body;

        // Validate input
        if (!email || !role || !from) {
            return res.status(400).json({
                success: false,
                message: "Email, role, and from (department/faculty ID) are required"
            });
        }

        // Validate role
        const validRoles = ["teacher", "printer", "admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be teacher, printer, or admin"
            });
        }

        // Check if invitation already exists for this email
        const existingInvitation = await Invitation.findOne({
            email,
            role,
            from
        });

        if (existingInvitation) {
            return res.status(400).json({
                success: false,
                message: "Invitation already sent to this email"
            });
        }

        // Validate department/faculty based on role
        if (role === "teacher") {
            const department = await Department.findById(from);
            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });
            }
        } else {
            const faculty = await Faculty.findById(from);
            if (!faculty) {
                return res.status(404).json({
                    success: false,
                    message: "Faculty not found"
                });
            }
        }

        // Generate invitation token
        const invitationToken = crypto.randomBytes(32).toString("hex");
        const invitationLink = `${process.env.CLIENT_URL}/register?token=${invitationToken}&role=${role}&email=${email}`;

        // Create invitation
        const invitation = await Invitation.create({
            email,
            role,
            from,
            invitationLink: invitationToken
        });

        // Get entity name for email
        let entityName;
        if (role === "teacher") {
            const department = await Department.findById(from);
            entityName = department.name;
        } else {
            const faculty = await Faculty.findById(from);
            entityName = faculty.name;
        }

        // Send invitation email
        await emailSender({
            email,
            subject: `${role.charAt(0).toUpperCase() + role.slice(1)} Invitation - Print Management System`,
            html: `
                <h1>${role.charAt(0).toUpperCase() + role.slice(1)} Invitation</h1>
                <p>You have been invited to join ${entityName} as a ${role}.</p>
                <p>Click the link below to register:</p>
                <a href="${invitationLink}">Accept Invitation</a>
            `
        });

        res.status(201).json({
            success: true,
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} invitation sent successfully`,
            data: {
                email: invitation.email,
                role: invitation.role,
                entity: entityName
            }
        });

    } catch (error) {
        console.error("Invitation creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating invitation",
            error: error.message
        });
    }
};

// Get all invitations for a department or faculty
export const getInvitations = async (req, res) => {
    try {
        const { from } = req.query;

        if (!from) {
            return res.status(400).json({
                success: false,
                message: "Department or faculty ID is required"
            });
        }

        const invitations = await Invitation.find({ from });

        res.status(200).json({
            success: true,
            data: invitations
        });

    } catch (error) {
        console.error("Get invitations error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching invitations",
            error: error.message
        });
    }
};

// Delete invitation
export const deleteInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;

        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: "Invitation not found"
            });
        }

        await invitation.deleteOne();

        res.status(200).json({
            success: true,
            message: "Invitation deleted successfully"
        });

    } catch (error) {
        console.error("Delete invitation error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting invitation",
            error: error.message
        });
    }
};
