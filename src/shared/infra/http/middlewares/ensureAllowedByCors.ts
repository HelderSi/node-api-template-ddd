import cors, { CorsOptions } from 'cors';
import appConfig from 'config/app';

const allowedOrigins: (string | undefined)[] = [
    'http://your.domain.here',
];

if (appConfig.env === 'development') {
    allowedOrigins.push('*');
    allowedOrigins.push(undefined);
}

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

export default cors(corsOptions);
