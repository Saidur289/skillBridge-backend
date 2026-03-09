import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";

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
export const tutorController = {
    createProfile,
    createAvailability
}