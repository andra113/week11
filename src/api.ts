import express, { Express, ErrorRequestHandler} from "express";
import * as dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import * as OpenApiValidator from "express-openapi-validator";
import cors from "cors";
import userRouter from "./routers/userRoutes";
import schoolRouter from "./routers/schoolRoutes";
import reviewRouter from "./routers/reviewRoutes";
import databaseMiddleware from "./middlewares/databaseMiddleware";
import errorHandler from "./middlewares/errorHandler";
import { AuthenticatedRequest } from "./middlewares/auth";

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import authRouter from "./routers/authRoutes";
import { authenticationMiddleware } from "./middlewares/auth";

const yamlContent = fs.readFileSync('docs/openApi.yaml', 'utf8');
const swaggerDocument: any = yaml.load(yamlContent)

dotenv.config()

const app: Express = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(databaseMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
    OpenApiValidator.middleware({
        apiSpec: swaggerDocument,
        validateRequests: true, // (default)
        validateResponses: true, // false by default
    }),
);
app.use(authenticationMiddleware);
app.use('/api/auth', authRouter);
app.use('/api', schoolRouter);
app.use('/api', reviewRouter);
app.use(errorHandler);




app.listen(port, () => {
    console.log(`server listen ${port}`);
});