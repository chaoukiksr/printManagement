import Department from "../models/Department.js";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import Invitation from "../models/Invitations.js";
import { emailSender } from "../utils/email/emailSender.js";
import { departmentInvitationTemplate } from "../utils/email/emailTemplates.js";
import crypto from "crypto";

// Create invitation (for teachers, printers, and admins)
export const createInvitation = async (req, res) => {
  try {
    const { email, role, isSubAdmin = false } = req.body;
    const userRole = req.user.role;
    let from;
    if (userRole === "admin") {
      from = req.user.facultyId;
    } else {
      from = req.user.departmentId;
    }

    // Validate input
    if (!email || !role || !from) {
      return res.status(400).json({
        success: false,
        message: "Email, role, and from (department/faculty ID) are required",
      });
    }

    // Validate role
    const validRoles = ["teacher", "printer", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be teacher, printer, or admin",
      });
    }

    // Check if invitation already exists for this email
    const existingInvitation = await Invitation.findOne({
      email,
      role,
      from,
    });

    if (existingInvitation) {
      return res.status(400).json({
        success: false,
        message: "Invitation already sent to this email",
      });
    }

    // Validate department/faculty based on role
    if (role === "teacher") {
      const department = await Department.findById(from);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }
    } else {
      const faculty = await Faculty.findById(from);
      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found",
        });
      }
    }

    // Generate invitation token
    const invitationToken = crypto.randomBytes(32).toString("hex");
    const invitationLink = `${process.env.CLIENT_URL}/register?token=${invitationToken}&role=${role}&email=${email}&isSubAdmin=${isSubAdmin}`;

    // Create invitation
    const invitation = await Invitation.create({
      email,
      role,
      from,
      isSubAdmin,
      invitationLink: invitationToken,
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
      subject: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } Invitation - Print Management System`,
      html: `
                <h1>${
                  role.charAt(0).toUpperCase() + role.slice(1)
                } Invitation</h1>
                <p>You have been invited to join ${entityName} as a ${role}.</p>
                <p>Click the link below to register:</p>
                <a href="${invitationLink}">Accept Invitation</a>
            `,
    });

    res.status(201).json({
      success: true,
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } invitation sent successfully`,
      data: {
        email: invitation.email,
        role: invitation.role,
        entity: entityName,
      },
    });
  } catch (error) {
    console.error("Invitation creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating invitation",
      error: error.message,
    });
  }
};

// Get all invitations for a department or faculty
export const getInvitations = async (req, res) => {
  try {
    const userRole = req.user.role;
    let from;
    if (userRole === "admin") {
      from = req.user.facultyId;
    } else {
      from = req.user.departmentId;
    }

    if (!from) {
      return res.status(400).json({
        success: false,
        message: "Department or faculty ID is required",
      });
    }

    const invitations = await Invitation.find({ from });

    res.status(200).json({
      success: true,
      data: invitations,
    });
  } catch (error) {
    console.error("Get invitations error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching invitations",
      error: error.message,
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
        message: "Invitation not found",
      });
    }

    await invitation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Invitation deleted successfully",
    });
  } catch (error) {
    console.error("Delete invitation error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting invitation",
      error: error.message,
    });
  }
};
