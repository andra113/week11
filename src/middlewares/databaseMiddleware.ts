import { Request, Response, NextFunction } from 'express';
import connectToDatabase from '../configs/dbConfig';
import { loggerTimestamp } from '../utils/utils';
import { timeStamp } from 'console';


async function databaseMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const db = await connectToDatabase();
        loggerTimestamp("Connected to database")
        req.db = db; // Attach the database instance to the request object
        next();
    } catch (error) {
        timeStamp("Failed to connect to database")
        res.status(500).json({ 
            success: false,
            message: 'Database connection error' });
    }
}

export default databaseMiddleware