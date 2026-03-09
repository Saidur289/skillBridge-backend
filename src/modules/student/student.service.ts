import { Booking } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"



const createBookings = async (data: Booking) => {
    const sessionDate = new Date(data.sessionDate)
    const checkSlot = await prisma.booking.findFirst({
        where: {
            sessionDate: sessionDate,
            tutorId: data.tutorId
        }
    })
    if (checkSlot) return console.log("already booked");
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
export const studentService = {
    createBookings,
    getBookings
}