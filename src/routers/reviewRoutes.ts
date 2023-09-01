import { Router } from "express";
import { getReviewsController, addReviewController, getReviewsBySchoolController, approveReviewController, rejectReviewController } from "../controllers/reviewController";
import { authorizationMiddleware } from "../middlewares/auth";

const reviewRouter = Router()



reviewRouter.get('/schools/:schoolId/reviews', authorizationMiddleware(["admin", "moderator", "user"]), getReviewsBySchoolController);

reviewRouter.post('/schools/:schoolId/reviews', authorizationMiddleware(["admin", "moderator", "user"]), addReviewController);

reviewRouter.patch('/reviews/:reviewId/approve', authorizationMiddleware(["admin", "moderator", "user"]), approveReviewController);

reviewRouter.patch('/reviews/:reviewId/reject', authorizationMiddleware(["admin", "moderator", "user"]), rejectReviewController);

export default reviewRouter