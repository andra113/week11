import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { UserModel } from "../models/dataModel";
import { getAllUsers } from "../services/user";
// import { validatingUser } from "../utils/userValidationResponse";
import bcrypt from "bcrypt"
import { loggerTimestamp } from "../utils/utils";
import { Db } from "mongodb";
// import { secretKey } from "../middleware/jwtAuth";

export async function getUsersController(req:Request, res : Response) {
    try {
        const users = await getAllUsers(req.db as Db)
        res.json({
            success: true,
            message: "Users fetched succesfully",
            data: users
        })
    } catch (error) {
        res.json({})
    }
}