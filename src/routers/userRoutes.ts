import { Router } from "express";
import { getUsersController, registerUserController, loginUserController} from "../controllers/userController";
import { authorizationMiddleware } from "../middlewares/auth";

const userRouter = Router()


userRouter.get('/users', authorizationMiddleware(["admin"]), getUsersController);

// router.post('/login', loginUser)
export default userRouter;