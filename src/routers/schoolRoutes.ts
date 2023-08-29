import { Router } from "express";
import { getschoolsController, addSchoolController,  } from "../controllers/schoolController";

const schoolRouter = Router()


schoolRouter.get('/schools', getschoolsController);

schoolRouter.post('/schools', addSchoolController);



// router.post('/login', loginUser)
export default schoolRouter;