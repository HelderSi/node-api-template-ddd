import express from "express";
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors';

import errorHandle from 'shared/errors'
import { router } from './routes'
import swaggerFile from '../../../swagger.json'


const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(errorHandle);

export { app }
