const mongoose = require('mongoose');
const { loggerInfo, loggerError } = require('../config/log4js');

let instanciaMongoDB = null;

class MongoDB {
  constructor(url) {
    this.url = url;

    this.msgConnect();
    this.msgError();
  }

  async connect() {
    const connection = await mongoose.connect(this.url);

    return connection;
  }

  msgConnect() {
    mongoose.connection.on('connected', () => {
      loggerInfo.info(`[Mongoose] - Conectado con éxito`);
    });
    return false;
  }

  msgError() {
    mongoose.connection.on('error', (err) => {
      loggerError.error('[Mongoose] - error:', err.message);
    });
    return false;
  }

  static getMongoDBInstance(url) {
    if (!instanciaMongoDB) {
      instanciaMongoDB = new MongoDB(url);
    }

    return instanciaMongoDB;
  }
}

module.exports = MongoDB;
