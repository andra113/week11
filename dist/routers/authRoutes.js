"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const schoolController_1 = require("../controllers/schoolController");
const noauthRouter = (0, express_1.Router)();
noauthRouter.post('/register', userController_1.registerUserController);
noauthRouter.post('/login', userController_1.loginUserController);
noauthRouter.post('/schools', schoolController_1.addSchoolController);
// router.post('/login', loginUser)
exports.default = noauthRouter;
