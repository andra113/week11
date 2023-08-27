import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { UserModel } from "../models/dataModel";
import { getAllUsers } from "../services/user";
// import { validatingUser } from "../utils/userValidationResponse";
import bcrypt from "bcrypt"
// import { secretKey } from "../middleware/jwtAuth";

export async function getUsersController(req:Request, res : Response) {
    try {
        const db = req
        const users = await getAllUsers(db)
        res.json(users)
    } catch (error) {
        return
    }
}