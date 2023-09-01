import { Router } from "express";
import { getschoolsController, addSchoolController, deleteSchoolController, updatetSchoolController,  } from "../controllers/schoolController";
import { authorizationMiddleware } from "../middlewares/auth";

const schoolRouter = Router()



schoolRouter.post('/schools', authorizationMiddleware(["admin", "moderator", "user"]), addSchoolController);

schoolRouter.delete('/schools/:schoolId', authorizationMiddleware(["admin", "moderator"]),deleteSchoolController )

schoolRouter.patch('/schools/:schoolId', authorizationMiddleware(["admin", "moderator"]), updatetSchoolController)



// router.post('/login', loginUser)
export default schoolRouter;