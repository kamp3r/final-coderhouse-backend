# API Restful Ecommerce

Bienvenido a la API de ecommerce creada para el proyecto final de coderhouse

La misma fue construida con la siguientes dependencias:

*Bcrypt
*Dotenv
*EJS
*Express
*Express-Handlebars
*Express-validator
*JsonWebToken
*Knex
*Logs4js
*Mongoose
*MySQL
*NodeMailer
*Normalizr
*Multer
*Passport
*Socket.io
*Uuid


Para ejecutar el proyecto final de coderhouse, te invito a que clones el repositorio

Luego deberás rellenar los campos faltantes en los archivos development.env.example y production.env.example para poder comenzar a utilizar la API, tambien
deberas eliminar de la extensión de los archivos .example para comenzar a utilizar la API.

## Empezando..

Para ejecutar la API tenemos diferentes scripts los cuales pueden ser ejecutados con npm run...

    "start": "npm run production"
    "watch": "set NODE_ENV=development&& nodemon"
    "development": "set NODE_ENV=development&& node ./src/server.js"
    "production": "set NODE_ENV=production&& node ./src/server.js"

## Documentación

La api se encuentra documentada en Swagger, por lo cual para acceder a la documentación deberás acceder al localhost/api-docs/

## Vistas

Lo requerido en la consigna son una vista en handlebars que muestre la configuración del servidor, la cual se encuentra en:

    localhost:PORT/views/serverConfig

También una vista en EJS, la cual mostrara un error en caso de que la ejecucion de la API en el navegador de error.
Adicionalmente agregue una vista de chat para mostrar el correcto funcionamiento del mismo.

    localhost:PORT/views/chat


