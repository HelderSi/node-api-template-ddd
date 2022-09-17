export default {
    env: process.env.APP_ENV,
    isTesting: process.env.NODE_ENV === 'test',
    port: process.env.PORT || 8080,
    rateLimiter: {
        enabled: process.env.USE_RATE_LIMITER,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    }
}