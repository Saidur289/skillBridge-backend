
import { Availability, BookingStatus, TutorProfile } from './../../generated/prisma/client';
import { prisma } from "../../lib/prisma"
import { UserRole } from '../../middleware/auth';


const createProfile = async (data: Omit<TutorProfile, "userId">, userId: string) => {
    const result = await prisma.tutorProfile.create({
        data: { ...data, userId }
    })
    //update user role field
    const updateRole = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: UserRole.TUTOR
        }
    })
    return result
}
const createAvailability = async (data: Omit<Availability, "tutorId">, userId: string) => {
    const findTutor = await prisma.tutorProfile.findFirstOrThrow({
        where: {
            userId: userId,


        },
        select: {
            id: true
        }


    },


    )
    if (!findTutor) return null
    const result = await prisma.availability.create({ data: { ...data, tutorId: findTutor.id } })
    return result
}
const updateTutorProfile = async (data: Partial<TutorProfile>, userId: string) => {
    const result = await prisma.tutorProfile.update({
        where: {
            userId
        }, data
    })
    return result
}
const updateAvailability = async (data: Availability, id: string) => {
    const checkSlot = await prisma.booking.findFirst({
        where: {
            availabilityId: id
        }
    })
    if (checkSlot) return null;
    const result = await prisma.availability.update({
        where: {

            id
        },
        data
    })
    return result
}

export const tutorService = {
    createProfile,
    createAvailability,
    updateTutorProfile,
    updateAvailability,

}