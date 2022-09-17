import "reflect-metadata";
import 'dotenv/config';
import "shared/container"
import express from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors';
import cors from 'cors';
import errorHandle from 'shared/errors'
import AppConfig from 'config/app'

import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes'
//import swaggerFile from '../../../swagger.json'

import openapiSpecification from '../../docs'

const app = express();

if (AppConfig.rateLimiter.enabled) {
    app.use(rateLimiter);
}

if (AppConfig.sentry.enabled) {
    Sentry.init({
        dsn: AppConfig.sentry.dsn,
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app }),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
}

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

// The error handler must be before any other error middleware and after all controllers
AppConfig.sentry.enabled && app.use(Sentry.Handlers.errorHandler());

app.use(errorHandle);

export { app }
