import { Router } from "express";
import { registerUserController, loginUserController} from "../controllers/userController";
import { getschoolsController } from "../controllers/schoolController";
import { getReviewsController } from "../controllers/reviewController";

const noauthRouter = Router()

noauthRouter.post('/register', registerUserController)

noauthRouter.post('/login', loginUserController)

noauthRouter.get('/schools', getschoolsController);

noauthRouter.get('/reviews', getReviewsController);

// router.post('/login', loginUser)
export default noauthRouter;