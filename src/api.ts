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
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { authenticationMiddleware } from "./middlewares/auth";
import noauthRouter from "./routers/noauthRoutes";

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
app.use('/api/noauth', noauthRouter);
app.use('/api', authenticationMiddleware);
app.use('/api', schoolRouter);
app.use('/api', reviewRouter);
app.use('/api', userRouter)
app.use(errorHandler);




app.listen(port, () => {
    console.log(`server listen at ${port}`);
});