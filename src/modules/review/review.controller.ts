import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookingId } = req.params
        const user = req.user
        if (!user) return undefined
        const result = await reviewService.createReview(user.id as string, bookingId as string, req.body)
        res.status(201).json({ data: result, message: "Review created successfully" })

    } catch (error) {
        next(error)
    }
}
const getSingleReview = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
}
export const reviewController = {
    createReview,
    getSingleReview
}