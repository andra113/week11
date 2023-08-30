"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolController_1 = require("../controllers/schoolController");
const auth_1 = require("../middlewares/auth");
const schoolRouter = (0, express_1.Router)();
schoolRouter.get('/schools', (0, auth_1.authorizationMiddleware)(["admin", "moderator", "user"]), schoolController_1.getschoolsController);
schoolRouter.post('/schools', (0, auth_1.authorizationMiddleware)(["admin", "moderator", "user"]), schoolController_1.addSchoolController);
schoolRouter.delete('/schools/:schoolId', (0, auth_1.authorizationMiddleware)(["admin", "moderator"]), schoolController_1.deleteSchoolController);
schoolRouter.patch('/schools/:schoolId', (0, auth_1.authorizationMiddleware)(["admin", "moderator"]), schoolController_1.updatetSchoolController);
// router.post('/login', loginUser)
exports.default = schoolRouter;
