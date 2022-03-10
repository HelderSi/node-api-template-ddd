import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';

import { AppError } from './AppError';

const errorHandle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof AppError) {
        return res.status(err.error.code).json(err);
    }

    if (isCelebrateError(err)) {
        let errorDetails = []
        err.details.forEach((value, key) => {
            console.error("Validation Error: ", JSON.stringify(value));
            value.details.forEach(error => {
                errorDetails.push({
                    message: error.message,
                    source: key,
                    key: error.context?.key || '',
                })
            })
        });

        const validationError = new AppError(err.message, 400, {
            details: errorDetails
        });

        return res.status(validationError.error.code).json(validationError);
    }

    const internalError = new AppError(err.message, 500);
    console.error(err);
    return res.status(internalError.error.code).json(internalError);
};

export default errorHandle;
