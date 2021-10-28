import express from "express";
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors';
import { errors as celebrateErrors } from 'celebrate';
import cors, { CorsOptions } from 'cors';

import errorHandle from 'shared/errors'
import { router } from './routes'
import swaggerFile from '../../../swagger.json'

const app = express();

app.use(express.json());

app.use(cors())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api/v1', router)

app.use(errorHandle);

app.use(celebrateErrors());

export { app }
