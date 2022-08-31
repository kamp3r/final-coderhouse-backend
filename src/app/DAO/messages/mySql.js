const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const { createTable } = require('../../models/knex/messages');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'mensajes';
    createTable(this.tableName);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }
  async create(message) {
    let newMessage = await knex(this.tableName).insert(message);
    let newMessages = await this.readId(newMessage[0]);
    return newMessages;
  }

  async read(message = {}) {
    return await knex.from(this.tableName).select('*').where(message);
  }

  async readId(email) {
    let message = await knex
      .from(this.tableName)
      .select('*')
      .where({ email: email });
    if (message.length) {
      return message;
    } else {
      return false;
    }
  }
}

module.exports = MySQLDao;
