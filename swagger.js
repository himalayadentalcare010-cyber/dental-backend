const swaggerJsdoc = require('swagger-jsdoc');const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Banner API',
      version: '1.0.0',
      description: 'API for managing banners',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Apply this security scheme globally (optional)
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // files containing annotations for the OpenAPI spec
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
