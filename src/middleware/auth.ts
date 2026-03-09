import { auth as betterAuth } from "../lib/auth"
import { NextFunction, Request, Response } from "express";
export enum UserRole {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                name: string,
                emailVerified: boolean,
                role: string
            }
        }
    }
}
const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = await betterAuth.api.getSession({
            headers: req.headers as any
        })
        if (session === null) {
            return res.status(401).json({ success: false, massage: "You are not authorized" })
        }
        req.user = {
            id: session?.user.id,
            email: session?.user.email,
            name: session?.user.name,
            emailVerified: session?.user.emailVerified,
            role: session?.user.role as string
        }
        if (!roles.length && !roles.includes(req.user.role as UserRole)) {
            return res.status(401).json({ success: false, massage: "You are not authorized" })
        }
        next()
    }
}
export default auth