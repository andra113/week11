"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSchoolController = exports.getschoolsController = void 0;
const school_1 = require("../services/school");
const utils_1 = require("../utils/utils");
function getschoolsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schools = yield (0, school_1.getAllSchool)(req.db);
            (0, utils_1.loggerTimestamp)("Schools fetched successfully");
            res.status(200).json({
                success: true,
                message: "Schools fetched successfully",
                data: schools,
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred while fetching Schools: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching Schools",
            });
        }
    });
}
exports.getschoolsController = getschoolsController;
function addSchoolController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, location, description } = req.body;
            if (!name || name.trim() === "") {
                (0, utils_1.loggerTimestamp)("Invalid add request: School name is empty");
                return res.status(400).json({
                    success: false,
                    message: "School name cannot be empty or contain only whitespace.",
                });
            }
            const schoolExist = yield (0, school_1.getSchoolByName)(name, req.db);
            if (schoolExist) {
                (0, utils_1.loggerTimestamp)("Add school failed: School already exists");
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
            yield (0, school_1.addSchool)(newSchool, req.db);
            (0, utils_1.loggerTimestamp)("School added successfully: " + newSchool.name);
            res.status(201).json({
                success: true,
                message: "School added successfully",
                data: {
                    name: newSchool.name,
                    location: newSchool.location,
                    description: newSchool.description
                }
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred during adding school: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred during adding",
            });
        }
    });
}
exports.addSchoolController = addSchoolController;