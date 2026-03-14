import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";



const updateStudentProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return null
        const result = await studentService.updateStudentProfile(req.body, user.id)
        res.status(200).json({ data: result, message: "update profile successfully" })
    } catch (error) {
        next(error)
    }
}


export const studentController = {
    updateStudentProfile,

}