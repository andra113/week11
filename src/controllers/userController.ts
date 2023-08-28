import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/dataModel";
import { getAllUsers, registerUser, getUsernameById } from "../services/user";
import bcrypt from "bcrypt";
import { loggerTimestamp } from "../utils/utils";
import { Db } from "mongodb";
// import { secretKey } from "../middleware/jwtAuth";

export async function getUsersController(req: Request, res: Response) {
	try {
		const users = await getAllUsers(req.db as Db);
		res.json({
			success: true,
			message: "Users fetched succesfully",
			data: users,
		});
	} catch (error) {
		res.json({});
	}
}
async function registerUserController(req: Request, res: Response) {
	try {
		const { username, password, role } = req.body;

		if (!username || username.trim() === "") {
			return res.status(400).json({
				success: false,
				message: "Username cannot be empty or contain only whitespace.",
			});
		}

		const usernameExist = await getUsernameById(username, req.db as Db)

		if (usernameExist) {
			return res.status(409).json({
				success: false,
				message: "Username already exist"
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = {
			username,
			password: hashedPassword,
			role,
		};

        await registerUser(newUser, req.db as Db)

        res.status(200).json({
            success: true,
            message: "Registered succesfully",
            data: {
                username: newUser.username,
                role: newUser.role
            }
        })

	} catch (error) {

	}
}
