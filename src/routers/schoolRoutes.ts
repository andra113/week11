import { Router } from "express";
import { getschoolsController, addSchoolController, deleteSchoolController, updatetSchoolController,  } from "../controllers/schoolController";

const schoolRouter = Router()


schoolRouter.get('/schools', getschoolsController);

schoolRouter.post('/schools', addSchoolController);

schoolRouter.delete('/schools/:schoolId', deleteSchoolController )

schoolRouter.patch('/schools/:schoolId', updatetSchoolController)



// router.post('/login', loginUser)
export default schoolRouter;