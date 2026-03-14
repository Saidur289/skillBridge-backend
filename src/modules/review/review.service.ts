
import { Review } from "../../generated/prisma/client";
import { BookingStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
    userId: string,
    bookingId: string,
    data: Omit<Review, "tutorId" | "studentId" | "bookingId">
) => {

    const bookedSession = await prisma.booking.findUnique({
        where: { id: bookingId },
        select: {
            status: true,
            studentId: true,
            tutorId: true
        }
    })

    if (!bookedSession) {
        throw new Error("Booking not found")
    }

    if (bookedSession.status !== BookingStatus.COMPLETED) {
        throw new Error("Session not completed")
    }

    if (userId !== bookedSession.studentId) {
        throw new Error("Unauthorized")
    }

    const existingReview = await prisma.review.findUnique({
        where: { bookingId }
    })

    if (existingReview) {
        throw new Error("Review already submitted")
    }

    return await prisma.review.create({
        data: {
            ...data,
            studentId: userId,
            tutorId: bookedSession.tutorId,
            bookingId
        }
    })
}
const getSingleReview = async (id: string) => {
    const result = await prisma.review.findUnique({
        where: {
            bookingId: id
        }
    })
    return result

}
export const reviewService = {
    createReview,
    getSingleReview
}