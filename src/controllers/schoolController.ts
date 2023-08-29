import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getAllSchool, addSchool, getSchoolById, getSchoolByName } from "../services/school";
import bcrypt from "bcrypt";
import { loggerTimestamp } from "../utils/utils";
import { Db } from "mongodb";

export async function getschoolsController(req: Request, res: Response) {
    try {
        const schools = await getAllSchool(req.db as Db);
        loggerTimestamp("Schools fetched successfully");
        res.status(200).json({
            success: true,
            message: "Schools fetched successfully",
            data: schools,
        });
    } catch (error) {
        loggerTimestamp("An error occurred while fetching Schools: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching Schools",
        });
    }
}

export async function addSchoolController(req: Request, res: Response) {
    try {
        const { name, location, description } = req.body;

        if (!name || name.trim() === "") {
            loggerTimestamp("Invalid add request: School name is empty");
            return res.status(400).json({
                success: false,
                message: "School name cannot be empty or contain only whitespace.",
            });
        }

        const schoolExist = await getSchoolByName(name, req.db as Db)

        if (schoolExist) {
            loggerTimestamp("Add school failed: School already exists");
            return res.status(409).json({
                success: false,
                message: "School already exist"
            });
        }

        const newSchool = {
            name,
            location,
            description
        };

        await addSchool(newSchool, req.db as Db)

        loggerTimestamp("School added successfully: " + newSchool.name);
        res.status(201).json({
            success: true,
            message: "School added successfully",
            data: {
                name: newSchool.name,
                location: newSchool.location,
                description: newSchool.description
            }
        });

    } catch (error) {
        loggerTimestamp("An error occurred during adding school: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred during adding",
        });
    }
}