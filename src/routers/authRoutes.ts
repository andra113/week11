import { Router } from "express";
import { registerUserController, loginUserController} from "../controllers/userController";

const authRouter = Router()

authRouter.post('/register', registerUserController)

authRouter.post('/login', loginUserController)

// router.post('/login', loginUser)
export default authRouter;