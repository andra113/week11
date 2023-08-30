import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../configs/envInit";
import { loggerTimestamp } from "../utils/utils";

// Define a custom type that extends the Request type
export interface AuthenticatedRequest extends Request {
    role: string; // Add the role property
}

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const payload: any = jwt.verify(token, secretKey);
        req.role = payload.role; // Assign role directly to the request
        next();
    } catch (error) {
        loggerTimestamp(`Authentication error: ${error}`);
        return res.status(401).json({ message: "Token not valid" });
    }
}

export function authorizationMiddleware(roles: string[]): (req: Request, res: Response, next: NextFunction) => void {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!roles.includes(req.role!)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    };
}
