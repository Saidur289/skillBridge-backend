import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router()
router.post('/', auth(UserRole.STUDENT), bookingController.createBookings)
router.get("/session", auth(UserRole.TUTOR, UserRole.STUDENT), bookingController.getAllStudentAndTutorSession)
router.get("/session/:bookingId", auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.getSingleSession)
router.get('/', auth(UserRole.STUDENT), bookingController.getBookings)
router.patch("/update/:bookingId/status", auth(UserRole.TUTOR, UserRole.STUDENT), bookingController.updateBookingStatus)
export const bookingRoutes = router