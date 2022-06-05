import cors, { CorsOptions } from 'cors';
import appConfig from 'config/app';
import { AppError } from 'shared/errors/AppError';

const allowedOrigins: (string | undefined)[] = [
    'http://your.domain.here',
];

if (appConfig.env === 'development' || appConfig.isTesting) {
    allowedOrigins.push('*');
    allowedOrigins.push(undefined);
}

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            throw new AppError('Not Allowed', 403)
        }
    },
};

export default cors(corsOptions);

