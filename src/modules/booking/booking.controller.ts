import { NextFunction, Request, Response } from "express"
import { bookingService } from "./booking.service"
import { UserRole } from "../../middleware/auth"

const createBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const result = await bookingService.createBookings(data)
        if (!result) return res.status(201).json({ data: result, message: "already booked" })
        res.status(201).json({ data: result, message: "Student Booked  Session successfully" })
    } catch (error) {
        next(error)
    }
}
const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return null
        const result = await bookingService.getBookings(user?.id as string)
        res.status(200).json({ data: result, msg: "Get all booked session" })
    } catch (error) {
        next(error)
    }
}
const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookingId } = req.params
        const user = req.user
        if (!user) return undefined
        const isTutor = user.role === UserRole.TUTOR
        const { status } = req.body
        const result = await bookingService.updateBookingStatus(status, bookingId as string, isTutor as boolean, req.user?.id as string)

        // if (!result) return res.status(401).json({ data: null, message: "already booked you cannot update it" })
        res.status(200).json({ data: result, message: "update availability successfully" })
    } catch (error) {
        next(error)
    }
}
const getAllStudentAndTutorSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return null
        const isTutor = user.role === UserRole.TUTOR
        console.log(isTutor);
        const result = await bookingService.getAllStudentAndTutorSession(user.id, isTutor)
        res.status(200).json({ data: result, msg: "view booked session successfully" })
    } catch (error) {
        next(error)
    }
}
const getSingleSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookingId } = req.params
        const user = req.user
        if (!user) return null
        const isTutor = user.role === UserRole.TUTOR
        const result = await bookingService.getSingleSession(bookingId as string, user.id as string, isTutor)
        if (!result) {
            res.status(401).json({ data: null, message: "You are not authorized" })
        }
        res.status(200).json({ data: result, message: "view single session successfully" })
    } catch (error) {
        next(error)
    }
}

export const bookingController = {
    createBookings,
    getBookings,
    updateBookingStatus,
    getAllStudentAndTutorSession,
    getSingleSession
}