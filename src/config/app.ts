export default {
    env: process.env.APP_ENV,
    isTesting: process.env.NODE_ENV === 'test',
    port: process.env.PORT || 8080,
}