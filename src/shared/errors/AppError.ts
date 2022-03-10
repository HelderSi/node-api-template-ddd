// https://github.com/prettymuchbryce/http-status-codes/blob/master/codes.json
const CODES = {
    // "200": {
    //     code: 200,
    //     phrase: "OK",
    //     constant: "OK",
    // },
    // "201": {
    //     code: 201,
    //     phrase: "Created",
    //     constant: "CREATED",
    // },
    // "204": {
    //     code: 204,
    //     phrase: "No Content",
    //     constant: "NO_CONTENT",
    // },
    "400": {
        code: 400,
        phrase: "Bad Request",
        constant: "BAD_REQUEST",
    },
    "401": {
        code: 401,
        phrase: "Unauthorized",
        constant: "UNAUTHORIZED",
    },
    "403": {
        code: 403,
        phrase: "Forbidden",
        constant: "FORBIDDEN",
    },
    "404": {
        code: 404,
        phrase: "Not Found",
        constant: "NOT_FOUND",
    },
    "429": {
        code: 429,
        phrase: "Too Many Requests",
        constant: "TOO_MANY_REQUESTS",
    },
    "500": {
        code: 500,
        phrase: "Internal Server Error",
        constant: "INTERNAL_SERVER_ERROR",
    },
    "501": {
        code: 501,
        phrase: "Not Implemented",
        constant: "NOT_IMPLEMENTED",
    }
}

type ErrorDetailType = {
    message: string;
    source: string;
    key: string;
}

export class AppError {
    public readonly message: string;

    private readonly success: boolean;

    public readonly error: {
        code: number;
        message: string;
        constant: string;
        details: ErrorDetailType[]
    };

    constructor(message?: string, statusCode = 400, options?: { details?: ErrorDetailType[] }) {
        const errorMessage = message || CODES[statusCode]?.phrase || CODES[400].phrase;
        this.success = false;
        this.message = errorMessage;
        this.error = {
            code: statusCode,
            message: errorMessage,
            constant: CODES[statusCode]?.constant || CODES[400].constant,
            details: options?.details || []
        };
    }
}