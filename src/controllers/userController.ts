import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getAllUsers, registerUser, getUsernameByUsername, loginAndReturnToken } from "../services/user";
import bcrypt from "bcrypt";
import { loggerTimestamp } from "../utils/utils";
import { Db } from "mongodb";

export async function getUsersController(req: Request, res: Response) {
    try {
        const users = await getAllUsers(req.db as Db);
        loggerTimestamp("Users fetched successfully");
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        loggerTimestamp("An error occurred while fetching users: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching users",
        });
    }
}

export async function registerUserController(req: Request, res: Response) {
    try {
        const { username, password, role } = req.body;

        if (!username || username.trim() === "") {
            loggerTimestamp("Invalid registration request: Username is empty");
            return res.status(400).json({
                success: false,
                message: "Username cannot be empty or contain only whitespace.",
            });
        }

        const usernameExist = await getUsernameByUsername(username, req.db as Db)

        if (usernameExist) {
            loggerTimestamp("Registration failed: Username already exists");
            return res.status(409).json({
                success: false,
                message: "Username already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
            role,
        };

        await registerUser(newUser, req.db as Db)

        loggerTimestamp("User registered successfully: " + newUser.username);
        res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: {
                username: newUser.username,
                role: newUser.role
            }
        });

    } catch (error) {
        loggerTimestamp("An error occurred during registration: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
        });
    }
}

export async function loginUserController(req: Request, res: Response) {
    try {
        const {username, password} = req.body;

        const userExist = await getUsernameByUsername(username, req.db as Db)
        if (!userExist) {
            loggerTimestamp("Login failed: User does not exist");
            return res.status(401).json({
                success: false,
                message: "Login failed: User does not exist"
            });
        }

        const passwordMatched : boolean = await bcrypt.compare(password, userExist.password)

        if (!passwordMatched) {
            loggerTimestamp("Login failed: Incorrect password");
            return res.status(401).json({
                success: false,
                message: "Login failed: Incorrect password"
            });
        }
        const token = await loginAndReturnToken(userExist._id, userExist.role)

        loggerTimestamp("User logged in successfully: " + userExist.username);
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: {
                token: token
            }
        });

    } catch (error) {
        loggerTimestamp("An error occurred during login: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
}
