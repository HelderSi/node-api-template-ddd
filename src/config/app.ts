export default {
    env: process.env.APP_ENV,
    isTesting: process.env.NODE_ENV === 'test',
    port: process.env.PORT || 8080,
    rateLimiter: {
        enabled: !!Number(process.env.RATE_LIMITER_ENABLED),
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    },
    sentry: {
        enabled: !!Number(process.env.SENTRY_ENABLED),
        dsn: process.env.SENTRY_DSN,
    }
}