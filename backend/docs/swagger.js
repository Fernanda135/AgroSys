const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RuralSys API',
            description: 'API para sistema de gerenciamento rural',
            version: '1.0.0',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de Desenvolvimento'
            },
            // {
            //     url: 'https://api.ruralsys.com',
            //     description: 'Servidor de Produção'
            // }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Insira o token JWT para autenticação'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        './docs/*.js',
        './routes/*.js',
        './models/*.js'
    ]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;