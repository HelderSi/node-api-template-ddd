import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';

import { AppError } from './AppError';

const errorHandle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isCelebrateError(err)) {
        console.error(err);
        throw err;
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err);
    }

    const internalError = new AppError(err.message, 500)
    console.error(err)
    return res
        .status(internalError.statusCode)
        .json(internalError);
};

export default errorHandle;