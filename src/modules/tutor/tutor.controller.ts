import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { UserRole } from "../../middleware/auth";

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        console.log(data);
        const user = req.user
        if (!user) return null
        const result = await tutorService.createProfile(data, req.user?.id as string)
        res.status(201).json({ data: result, message: "Tutor Profile created successfully" })

    } catch (error) {
        next(error)
    }
}
const createAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const user = req.user
        if (!user) return null
        const result = await tutorService.createAvailability(data, user.id)
        res.status(201).json({ data: result, message: "Tutor Availability Schedule Created" })


    } catch (error) {
        next(error)
    }
}
const updateTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return null
        const result = await tutorService.updateTutorProfile(req.body, user.id)
        res.status(200).json({ data: result, message: "update profile successfully" })
    } catch (error) {
        next(error)
    }
}
const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await tutorService.updateAvailability(req.body, id as string)
        if (!result) return res.status(401).json({ data: null, message: "already booked you cannot update it" })
        res.status(200).json({ data: result, message: "update availability successfully" })
    } catch (error) {
        next(error)
    }
}

export const tutorController = {
    createProfile,
    createAvailability,
    updateTutorProfile,
    updateAvailability,
}