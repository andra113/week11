import { Router } from "express";
import { getUsersController} from "../controllers/userController";

const router = Router()


router.get('/users', getUsersController);

// router.post('/register', createUserController)

// router.post('/login', loginUser)
export default router;