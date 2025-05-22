import express from "express";
import * as invController from "../controllers/invController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Invitation management routes (admin and sub-admin)
router
  .route("/")
  .post(checkRole(["admin", "department"]), invController.createInvitation)
  .get(checkRole(["admin", "department"]), invController.getInvitations);

  
router.delete(
  "/:invitationId",
  checkRole(["admin", "department"]),
  invController.deleteInvitation
);

export default router;
