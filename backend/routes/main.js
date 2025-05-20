import express from "express";
import { createDepartment, createInvitation, getInvitations, deleteInvitation } from "../controllers/mainController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Department routes (admin only)
router.post("/departments", checkRole(["admin"]), createDepartment);

// Invitation management routes (admin and sub-admin)
router.post("/invite", checkRole(["admin", "department"]), createInvitation);
router.get("/invitations", checkRole(["admin", "department"]), getInvitations);
router.delete("/invitations/:invitationId", checkRole(["admin", "department"]), deleteInvitation);

export default router;