import { Router } from "express";
import { getReviewsController, addReviewController } from "../controllers/reviewController";

const reviewRouter = Router()


reviewRouter.get('/reviews', getReviewsController);

reviewRouter.post('/schools/:schoolId/reviews', addReviewController);

export default reviewRouter