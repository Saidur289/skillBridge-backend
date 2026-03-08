import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

const createCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const result = await adminService.createCategories(data)
        res.status(201).json({ data: result, msg: "Categories Created successfully" })
    } catch (error) {
        next(error)
    }
}
export const adminController = {
    createCategories
}