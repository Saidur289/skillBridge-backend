import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { studentController } from "./student.controller";

const router = Router()
router.put('/update-profile', auth(UserRole.STUDENT), studentController.updateStudentProfile)
export const studentRoutes = router