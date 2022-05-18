import express from "express";
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors';
import cors from 'cors';

import errorHandle from 'shared/errors'
import { router } from './routes'
//import swaggerFile from '../../../swagger.json'

import openapiSpecification from '../../docs'

const app = express();

app.use(express.json());

app.use(cors())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
    //customCss: '.swagger-ui .topbar .link img { content: url("https://www.myapp.com/logo.png"); margin: 8px }',
    explorer: false,
    swaggerOptions: {
        operationsSorter: (a, b) => {
            var methodsOrder = ["post", "get", "put", "patch", "delete", "options", "trace"];
            var result = methodsOrder.indexOf(a.get("method")) - methodsOrder.indexOf(b.get("method"));

            if (result === 0) {
                result = a.get("path").localeCompare(b.get("path"));
            }

            return result;
        }
    }
}))

app.use('/v1', router)

app.use(errorHandle);

export { app }
