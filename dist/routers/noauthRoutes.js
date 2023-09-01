"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const schoolController_1 = require("../controllers/schoolController");
const reviewController_1 = require("../controllers/reviewController");
const noauthRouter = (0, express_1.Router)();
noauthRouter.post('/register', userController_1.registerUserController);
noauthRouter.post('/login', userController_1.loginUserController);
noauthRouter.get('/schools', schoolController_1.getschoolsController);
noauthRouter.get('/reviews', reviewController_1.getReviewsController);
// router.post('/login', loginUser)
exports.default = noauthRouter;
