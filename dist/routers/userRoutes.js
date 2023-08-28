"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.get('/users', userController_1.getUsersController);
userRouter.post('/register', userController_1.registerUserController);
userRouter.post('/login', userController_1.loginUserController);
// router.post('/login', loginUser)
exports.default = userRouter;
