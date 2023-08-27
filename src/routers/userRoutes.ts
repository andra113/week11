import { Router } from "express";
import { getUsersController} from "../controllers/userController";

const userRouter = Router()


userRouter.get('/users', getUsersController);

// router.post('/register', createUserController)

// router.post('/login', loginUser)
export default userRouter;