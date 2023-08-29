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
exports.addReviewController = exports.getReviewsController = void 0;
const review_1 = require("../services/review");
const utils_1 = require("../utils/utils");
function getReviewsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield (0, review_1.getAllReviews)(req.db); // You'll need to implement the `getAllReviews` function.
            (0, utils_1.loggerTimestamp)("Reviews fetched successfully");
            res.status(200).json({
                success: true,
                message: "Reviews fetched successfully",
                data: reviews,
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred while fetching Reviews: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching Reviews",
            });
        }
    });
}
exports.getReviewsController = getReviewsController;
function addReviewController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { schoolId, rating, comment } = req.body;
            // You might want to perform validation and error checking here
            const newReview = {
                schoolId,
                rating: {
                    reputation: rating.reputation,
                    location: rating.location,
                    facilities: rating.facilities
                },
                comment
            };
            // Assuming you have an addReview function to add the review to your database
            yield (0, review_1.addReview)(newReview, req.db);
            (0, utils_1.loggerTimestamp)("Review added successfully");
            res.status(201).json({
                success: true,
                message: "Review added successfully",
                data: newReview,
            });
        }
        catch (error) {
            (0, utils_1.loggerTimestamp)("An error occurred while adding review: " + error);
            res.status(500).json({
                success: false,
                message: "An error occurred while adding review",
            });
        }
    });
}
exports.addReviewController = addReviewController;
