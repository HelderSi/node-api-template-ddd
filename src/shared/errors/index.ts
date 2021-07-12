import { NextFunction, Request, Response } from 'express';

import { AppError } from './AppError';

const errorHandle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err);
    }

    const internalError = new AppError(err.message, 500)

    return res
        .status(internalError.statusCode)
        .json(internalError);
};

export default errorHandle;