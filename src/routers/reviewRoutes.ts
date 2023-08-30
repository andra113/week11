import { Router } from "express";
import { getReviewsController, addReviewController } from "../controllers/reviewController";
import { authorizationMiddleware } from "../middlewares/auth";

const reviewRouter = Router()


reviewRouter.get('/reviews', authorizationMiddleware(["admin", "moderator", "user"]), getReviewsController);

reviewRouter.post('/schools/:schoolId/reviews', authorizationMiddleware(["admin", "moderator", "user"]), addReviewController);

export default reviewRouter