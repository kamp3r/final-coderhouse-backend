const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PERSISTENCIA: process.env.PERSISTENCIA || 'fileSystem',

  MODO_CLUSTER: process.env.MODO_CLUSTER === 'true',

  // config mySql Knex
  mySql: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 7 },
  },

  // url mongoDB
  MONGO_URL: process.env.MONGO_URL,

  // token secreto acceso
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME || '10m',

  // credenciales Gmail
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,

  // mail admin (destinatario avisos)
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,

  // puerto servidor express
  PORT: process.env.PORT || 8080,

  // configuración de permisos administrador (true o false)
  admin: process.env.ADMIN === 'true',
};
