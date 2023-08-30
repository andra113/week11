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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewController = exports.getReviewsController = void 0;
const review_1 = require("../services/review");
const school_1 = require("../services/school");
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envInit_1 = require("../configs/envInit");
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const schoolId = req.params.schoolId;
            const { rating, comment } = req.body;
            (0, utils_1.loggerTimestamp)("adding review");
            const schoolExist = yield (0, school_1.getSchoolById)(schoolId, req.db);
            if (!schoolExist) {
                (0, utils_1.loggerTimestamp)("Add school review failed: School doesn't exists on database");
                return res.status(404).json({
                    success: false,
                    message: "School doesn't exist: please add the school first."
                });
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, envInit_1.secretKey);
            const userId = decodedToken.id;
            const newReview = {
                schoolId,
                userId,
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
            console.log(newReview);
            res.status(201).json({
                success: true,
                message: "Review added successfully",
                data: {
                    schoolId: newReview.schoolId,
                    userId: newReview.userId,
                    rating: {
                        reputation: newReview.rating.reputation,
                        location: newReview.rating.location,
                        facilities: newReview.rating.facilities
                    },
                    comment
                }
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