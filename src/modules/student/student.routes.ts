import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { studentController } from "./student.controller";

const router = Router()
router.post('/bookings', auth(UserRole.STUDENT), studentController.createBookings)
router.get('/bookings', auth(UserRole.STUDENT), studentController.getBookings)
export const studentRoutes = router