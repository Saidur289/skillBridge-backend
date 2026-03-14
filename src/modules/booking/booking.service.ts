import { Booking, BookingStatus } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createBookings = async (data: Booking) => {
    const sessionDate = new Date(data.sessionDate)
    const checkSlot = await prisma.booking.findFirst({
        where: {
            tutorId: data.tutorId,
            sessionDate,
            sessionTime: data.sessionTime
        }
    })
    if (checkSlot) return null;
    const result = await prisma.booking.create({ data: { ...data, sessionDate } })
    return result

}
const getBookings = async (studentId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            studentId
        }
    })
    return result
}
const updateBookingStatus = async (status: BookingStatus, bookingId: string, isTutor: boolean, userId: string) => {
    const booking = await prisma.booking.findFirstOrThrow({
        where: {
            id: bookingId
        },
        select: {
            tutorId: true,
            status: true,
            studentId: true
        }
    })
    if (status === booking.status) return
    //verify student
    //student cannot update status into completed only update into cancelled
    if (!isTutor) {
        if (booking.studentId !== userId) {
            throw new Error("Unauthorized")
        }
        if (status === BookingStatus.COMPLETED) {
            throw new Error("Student cannot mark as completed")
        }
        return await prisma.booking.update({
            where: { id: bookingId, studentId: userId },
            data: { status }
        },
        )
    }
    //get tutorId
    if (status === BookingStatus.CANCELED) return
    const tutor = await prisma.tutorProfile.findFirstOrThrow({
        where: {
            userId
        },
        select: {
            id: true
        }
    })
    if (booking.tutorId !== tutor.id) {
        throw new Error("Unauthorized")
    }
    if (status === BookingStatus.CANCELED as BookingStatus) {
        throw new Error("Tutor cannot cancel completed")
    }

    return await prisma.booking.update({
        where: { id: bookingId, tutorId: tutor.id }, data: { status }
    })



}
const getAllStudentAndTutorSession = async (userId: string, isTutor: boolean) => {
    console.log(userId);
    if (!isTutor) {
        return await prisma.booking.findMany({
            where: {
                studentId: userId
            }
        })
    }
    const tutor = await prisma.tutorProfile.findUniqueOrThrow({
        where: {
            userId
        },
        select: {
            id: true
        }
    })
    return await prisma.booking.findMany({
        where: {
            tutorId: tutor.id
        }
    })
}
const getSingleSession = async (bookingId: string, userId: string, isTutor: boolean) => {
    if (!isTutor) {
        return await prisma.booking.findFirstOrThrow({
            where: {
                id: bookingId,
                studentId: userId
            }
        })
    }
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true
        }
    })
    if (!tutor) {
        throw new Error("You are not authorized")
    }
    return await prisma.booking.findFirstOrThrow({
        where: {
            id: bookingId,
            tutorId: tutor?.id as string
        }
    })
}
export const bookingService = {
    createBookings,
    getBookings,
    updateBookingStatus,
    getAllStudentAndTutorSession,
    getSingleSession
}