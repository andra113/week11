"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = require("../middlewares/auth");
const reviewRouter = (0, express_1.Router)();
reviewRouter.get('/reviews', (0, auth_1.authorizationMiddleware)(["admin", "moderator", "user"]), reviewController_1.getReviewsController);
reviewRouter.post('/schools/:schoolId/reviews', (0, auth_1.authorizationMiddleware)(["admin", "moderator", "user"]), reviewController_1.addReviewController);
exports.default = reviewRouter;
