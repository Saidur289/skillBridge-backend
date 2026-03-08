import { NextFunction, Request, Response } from "express";

// errorMiddleware.js
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack); // Log the error for server-side debugging
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}
export default errorHandler;
