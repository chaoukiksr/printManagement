import express from "express";
import * as departmentController from "../controllers/departmentController.js";
import { checkRole } from "../utils/middelwares/auth.js";

const router = express.Router();

// Department routes (admin only)
router
  .route("/")
  .post(checkRole(["admin"]), departmentController.createDepartment)
  .get(checkRole(["admin"]), departmentController.getDepartments);

router
  .route("/:departmentId")
  .put(checkRole(["admin"]), departmentController.updateDepartment)
  .delete(checkRole(["admin"]), departmentController.deleteDepartment);

export default router;
