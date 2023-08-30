"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', userController_1.registerUserController);
authRouter.post('/login', userController_1.loginUserController);
// router.post('/login', loginUser)
exports.default = authRouter;
