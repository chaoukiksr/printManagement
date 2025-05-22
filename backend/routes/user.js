import express from "express";
import * as userController from "../controllers/userController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Get printers (admin only)
router.get("/printer", checkRole(["admin"]), userController.getPrinter);

// Get teachers (department admin only)
router.get("/teachers", checkRole(["department"]), userController.getTeachers);

// Get sub-admins (admin or department admin)
router.get("/subadmins", checkRole(["admin", "department"]), userController.getSubAdmins);

router.delete("/:userId", checkRole(["admin", "department"]), userController.deleteUser);

export default router;
