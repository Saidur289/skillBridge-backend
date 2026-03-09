import { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";


export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = err?.message || err;

    // Prisma validation error
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Invalid data provided.";
    }

    // Prisma known request errors
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            errorMessage = "Duplicate value error.";
        }
        else if (err.code === "P2003") {
            statusCode = 400;
            errorMessage = "Foreign key constraint failed.";
        }
        else if (err.code === "P2025") {
            statusCode = 404;
            errorMessage = "Record not found.";
        }
    }

    // Prisma unknown request error
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = "Unknown database query error.";
    }

    // Prisma initialization error
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = 401;
            errorMessage = "Database authentication failed.";
        }
        else if (err.errorCode === "P1001") {
            statusCode = 500;
            errorMessage = "Cannot connect to database server.";
        }
    }

    // Prisma engine crash
    else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        errorMessage = "Prisma engine crashed.";
    }

    // normal JS error
    else if (err instanceof Error) {
        errorMessage = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        details: errorDetails,
    });
}
export default errorHandler