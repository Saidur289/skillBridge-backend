import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategories = async (data: Category) => {
    const result = await prisma.category.create({ data })
    return result
}
export const adminService = {
    createCategories
}