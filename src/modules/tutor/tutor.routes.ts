import { Router } from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router()
router.post('/profile', auth(UserRole.STUDENT), tutorController.createProfile)
router.post('/availability', auth(UserRole.TUTOR), tutorController.createAvailability)
router.put("/update-profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile)
router.put("/availability/:id", auth(UserRole.TUTOR), tutorController.updateAvailability)


export const tutorRoutes = router