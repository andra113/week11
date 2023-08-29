"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolController_1 = require("../controllers/schoolController");
const schoolRouter = (0, express_1.Router)();
schoolRouter.get('/schools', schoolController_1.getschoolsController);
schoolRouter.post('/schools', schoolController_1.addSchoolController);
// router.post('/login', loginUser)
exports.default = schoolRouter;
