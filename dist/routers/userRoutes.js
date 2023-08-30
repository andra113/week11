"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const userRouter = (0, express_1.Router)();
userRouter.get('/users', (0, auth_1.authorizationMiddleware)(["admin"]), userController_1.getUsersController);
// router.post('/login', loginUser)
exports.default = userRouter;
