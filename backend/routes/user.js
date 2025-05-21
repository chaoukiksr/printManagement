import express from "express";
import { getPrinter, getTeachers, getSubAdmins, deleteUser } from "../controllers/userController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Get printers (admin only)
router.get("/printer", checkRole(["admin"]), getPrinter);

// Get teachers (department admin only)
router.get("/teachers", checkRole(["department"]), getTeachers);

// Get sub-admins (admin or department admin)
router.get("/subadmins", checkRole(["admin", "department"]), getSubAdmins);

router.delete("/:userId", checkRole(["admin", "department"]), deleteUser);

export default router;
