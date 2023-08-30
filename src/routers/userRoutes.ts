import { Router } from "express";
import { getUsersController, registerUserController, loginUserController} from "../controllers/userController";

const userRouter = Router()


userRouter.get('/users', getUsersController);

// router.post('/login', loginUser)
export default userRouter;