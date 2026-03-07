import "dotenv/config";
import express, { Request, Response } from "express"
import { toNodeHandler } from "better-auth/node";
import cors from 'cors'
import { auth } from "./lib/auth";
const app = express()
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:4000", // Replace with your frontend's origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
export default app