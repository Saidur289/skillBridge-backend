import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router()
router.post('/categories', adminController.createCategories)
export const adminRoutes = router