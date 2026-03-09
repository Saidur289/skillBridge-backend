import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";


const createBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const result = await studentService.createBookings(data)
        res.status(201).json({ data: result, msg: "Student Booked  Session successfully" })
    } catch (error) {
        next(error)
    }
}
const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return null
        const result = await studentService.getBookings(user?.id as string)
        res.status(200).json({ data: result, msg: "Get all booked session" })
    } catch (error) {
        next(error)
    }
}
export const studentController = {
    createBookings,
    getBookings
}