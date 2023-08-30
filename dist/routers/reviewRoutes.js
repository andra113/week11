"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = (0, express_1.Router)();
reviewRouter.get('/reviews', reviewController_1.getReviewsController);
reviewRouter.post('/schools/:schoolId/reviews', reviewController_1.addReviewController);
exports.default = reviewRouter;
