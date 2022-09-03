module.exports = {
  definition: {
    info: {
      title: 'Documentación API Rest Ecommerce',
      description:
        'Esta es una aplicación API REST Ecommerce hecha con Express',
    },
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        description: 'Autorización JWT para la API',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
