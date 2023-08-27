import { error } from "console";
import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Format error
    if (err.name === 'UsernameUnavailableError') {
        console.log(err.status)
        res.status(409).json({ error: err.message });
    }
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: err.errors
    });
}

export default errorHandler;