
import { prisma } from "../../lib/prisma"
const updateStudentProfile = async (data: any, id: string) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data
    })
    return result
}
export const studentService = {
    updateStudentProfile
}