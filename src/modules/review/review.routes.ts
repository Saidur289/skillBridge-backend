import { Router } from "express";
import { reviewController } from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router()
router.post("/:bookingId", auth(UserRole.STUDENT), reviewController.createReview)
router.get("/:bookingId", auth(UserRole.TUTOR), reviewController.getSingleReview)
export const reviewRoutes = router
