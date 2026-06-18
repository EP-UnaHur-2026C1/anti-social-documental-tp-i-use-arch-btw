const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Anti Social Documental tp I use arch btw',
            version: '1.0.0',
            description:
                'API documentation for the Anti-Social Documental Network',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.routes.js'],
};

module.exports = swaggerJsDoc(options);
