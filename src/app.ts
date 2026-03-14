import "dotenv/config";
import express, { Request, Response } from "express"
import { toNodeHandler } from "better-auth/node";
import cors from 'cors'
import { auth } from "./lib/auth";
import { tutorRoutes } from "./modules/tutor/tutor.routes";
import errorHandler from "./middleware/errorHandler";
import { adminRoutes } from "./modules/admin/admin.routes";
import { studentRoutes } from "./modules/student/student.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { reviewRoutes } from "./modules/review/review.routes";
const app = express()
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json())
app.use(
    cors({
        origin: [process.env.APP_URL as string, process.env.BASE_URL as string], // Replace with your frontend's origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/tutor", tutorRoutes)
app.use("/api/v1/booking", bookingRoutes)
app.use("/api/v1/review", reviewRoutes)
app.use("/api/v1/student", studentRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use(errorHandler)
export default app