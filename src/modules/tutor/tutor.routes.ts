import { Router } from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router()
router.post('/profile', auth(UserRole.STUDENT), tutorController.createProfile)
router.post('/availability', auth(UserRole.TUTOR), tutorController.createAvailability)
export const tutorRoutes = router