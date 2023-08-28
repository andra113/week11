import { Router } from "express";
import { getUsersController, registerUserController} from "../controllers/userController";

const userRouter = Router()


userRouter.get('/users', getUsersController);

userRouter.post('/register', registerUserController)

// router.post('/login', loginUser)
export default userRouter;