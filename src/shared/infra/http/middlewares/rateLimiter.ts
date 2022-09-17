import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { AppError } from 'shared/errors/AppError';

const limiter = new RateLimiterMemory({
    keyPrefix: 'rateLimiter', // prefix your keys on redis store
    points: 5,
    duration: 1,
});

export default async function (
    req: Request,
    _: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(req.ip);
        return next();
    } catch (err) {
        throw new AppError(undefined, 429);
    }
}