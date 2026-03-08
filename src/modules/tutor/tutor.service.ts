import { TutorProfile } from './../../generated/prisma/client';
import { prisma } from "../../lib/prisma"

const createProfile = async (data: TutorProfile) => {
    const result = await prisma.tutorProfile.create({
        data
    })
    return result
}
export const tutorService = {
    createProfile
}