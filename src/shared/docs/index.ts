import swaggerJsdoc from 'swagger-jsdoc'

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Docs",
        version: '1.0.0',
        description: "API documentation",
        contact: {
            name: 'Helder Silva',
            email: "helder.dds@gmail.com",
            url: 'https://github.com/heldersi',
        },
    },
    servers: [
        {
            url: "https://dev.api.myapp.com/v1",
            description: "Sandbox server (uses test data)"
        },
        {
            url: "https://api.myapp.com/v1",
            description: "Production server (uses live data)"
        },
    ],
    tags: [
        {
            name: 'Foos',
            description: "Foos"
        },
    ],
    components: {
    }
};
// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: [`./src/shared/infra/http/routes/*.ts`, `./src/modules/*/infra/http/routes/*.ts`],

};

export default swaggerJsdoc(options)