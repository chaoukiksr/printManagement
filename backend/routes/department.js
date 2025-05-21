import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Department routes (admin only)
router
  .route("/")
  .post(checkRole(["admin"]), createDepartment)
  .get(checkRole(["admin"]), getDepartments);

router
  .route("/:departmentId")
  .put(checkRole(["admin"]), updateDepartment)
  .delete(checkRole(["admin"]), deleteDepartment);

export default router;
