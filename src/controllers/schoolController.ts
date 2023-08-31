import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	getAllSchool,
	addSchool,
	getSchoolById,
	getSchoolByName,
	deletSchoolById,
	updatetSchoolById,
} from "../services/school";
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
		const status = "pending"

		if (!name || name.trim() === "") {
			loggerTimestamp("Invalid add request: School name is empty");
			return res.status(400).json({
				success: false,
				message:
					"School name cannot be empty or contain only whitespace.",
			});
		}

		const schoolExist = await getSchoolByName(name, req.db as Db);

		if (schoolExist) {
			loggerTimestamp("Add school failed: School already exists");
			return res.status(409).json({
				success: false,
				message: "School already exist",
			});
		}

		const newSchool = {
			name,
			location,
			description,
			status
		};

		await addSchool(newSchool, req.db as Db);

		loggerTimestamp("School added successfully: " + newSchool.name);
		res.status(201).json({
			success: true,
			message: "School added successfully",
			data: {
				name: newSchool.name,
				location: newSchool.location,
				description: newSchool.description,
				status: newSchool.status
			},
		});
	} catch (error) {
		loggerTimestamp("An error occurred during adding school: " + error);
		res.status(500).json({
			success: false,
			message: "An error occurred during adding",
		});
	}
}

export async function deleteSchoolController(req: Request, res: Response) {
	try {
		const schoolId = req.params.schoolId;

		const deleteResult = await deletSchoolById(schoolId, req.db as Db);
		if (!deleteResult.value) {
			return res.status(404).json({
				succes: false,
				message: "School doesn't exist",
			});
		}

		res.status(200).json({
			succes: false,
			message: "The school successfully deleted",
			data: {
				name: deleteResult.value?.name,
				location: deleteResult.value?.location,
				description: deleteResult.value?.description,
			},
		});

	} catch (error) {
		loggerTimestamp("An error occurred during deleting school: " + error);
		res.status(500).json({
			success: false,
			message: "An error occurred during deleting school",
		});
	}
}

export async function updatetSchoolController(req: Request, res: Response) {
	try {
		const {name, location, description} = req.body;
		const schoolId = req.params.schoolId;

		const schoolExist = await getSchoolById(schoolId, req.db as Db);

		if (!schoolExist) {
			loggerTimestamp("Updating school failed: School doesnt exist");
			return res.status(409).json({
				success: false,
				message: "School doesnt exist",
			});
		}

		const updateField: any = {};
		if (name) {
			updateField.name = name
		}
		if (location) {
			updateField.location = location
		}
		if (description) {
			updateField.description = description
		}

		await updatetSchoolById(schoolId, updateField, req.db as Db);
		
		const updatedSchool = await getSchoolById(schoolId, req.db as Db)

		res.status(200).json({
			succes: false,
			message: "Succesfully updating school",
			data: {
				originalValue: {
					name: schoolExist.name,
					location: schoolExist.location,
					description: schoolExist.description
				},
				newValue: {
					name: updatedSchool?.name,
					location: updatedSchool?.location,
					description: updatedSchool?.description,
				}		
			},
		});



	} catch (error) {
		loggerTimestamp("An error occurred during updating school: " + error);
		res.status(500).json({
			success: false,
			message: "An error occurred during updating school",
		});
	}
}