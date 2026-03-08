import { Router } from "express";
import { tutorController } from "./tutor.controller";

const router = Router()
router.post('/create-profile', tutorController.createProfile)
export const tutorRoutes = router