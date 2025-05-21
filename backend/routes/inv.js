import express from "express";
import {
  createInvitation,
  getInvitations,
  deleteInvitation,
} from "../controllers/invController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Invitation management routes (admin and sub-admin)
router
  .route("/")
  .post(checkRole(["admin", "department"]), createInvitation)
  .get(checkRole(["admin", "department"]), getInvitations);

  
router.delete(
  "/:invitationId",
  checkRole(["admin", "department"]),
  deleteInvitation
);

export default router;
