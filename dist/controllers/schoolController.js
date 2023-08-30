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
exports.updatetSchoolController = exports.deleteSchoolController = exports.addSchoolController = exports.getschoolsController = void 0;
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
                    message: "School already exist",
                });
            }
            const newSchool = {
                name,
                location,
                description,
            };
            yield (0, school_1.addSchool)(newSchool, req.db);
            (0, utils_1.loggerTimestamp)("School added successfully: " + newSchool.name);
            res.status(201).json({
                success: true,
                message: "School added successfully",
                data: {
                    name: newSchool.name,
                    location: newSchool.location,
                    description: newSchool.description,
                },
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
function deleteSchoolController(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schoolId = req.params.schoolId;
            const deleteResult = yield (0, school_1.deletSchoolById)(schoolId, req.db);
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
                    name: (_a = deleteResult.value) === null || _a === void 0 ? void 0 : _a.name,
                    location: (_b = deleteResult.value) === null || _b === void 0 ? void 0 : _b.location,
                    description: (_c = deleteResult.value) === null || _c === void 0 ? void 0 : _c.description,
                },
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred during deleting school: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred during deleting school",
            });
        }
    });
}
exports.deleteSchoolController = deleteSchoolController;
function updatetSchoolController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, location, description } = req.body;
            const schoolId = req.params.schoolId;
            const schoolExist = yield (0, school_1.getSchoolById)(schoolId, req.db);
            if (!schoolExist) {
                (0, utils_1.loggerTimestamp)("Updating school failed: School doesnt exist");
                return res.status(409).json({
                    success: false,
                    message: "School doesnt exist",
                });
            }
            const updateField = {};
            if (name) {
                updateField.name = name;
            }
            if (location) {
                updateField.location = location;
            }
            if (description) {
                updateField.description = description;
            }
            yield (0, school_1.updatetSchoolById)(schoolId, updateField, req.db);
            const updatedSchool = yield (0, school_1.getSchoolById)(schoolId, req.db);
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
                        name: updatedSchool === null || updatedSchool === void 0 ? void 0 : updatedSchool.name,
                        location: updatedSchool === null || updatedSchool === void 0 ? void 0 : updatedSchool.location,
                        description: updatedSchool === null || updatedSchool === void 0 ? void 0 : updatedSchool.description,
                    }
                },
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred during updating school: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred during updating school",
            });
        }
    });
}
exports.updatetSchoolController = updatetSchoolController;
