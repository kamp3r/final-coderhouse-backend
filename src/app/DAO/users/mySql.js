const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const UserDTO = require('../../DTO/userDTO');
const { createTable } = require('../../models/knex/user');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'usuarios';
    createTable(this.tableName);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }

  async create(user) {
    let newUserId = await knex(this.tableName).insert(user);
    let newUser = await this.readId(newUserId[0]);
    return newUser;
  }

  async read(user = {}) {
    return await knex.from(this.tableName).select('*').where(user);
  }

  async readId(id) {
    let user = await knex.from(this.tableName).select('*').where({ id: id });
    if (user.length) {
      let userDTO = new UserDTO(
        user[0].id,
        user[0].email,
        user[0].password,
        user[0].name,
        user[0].address,
        user[0].age,
        user[0].telephone,
        user[0].picture
      );
      return userDTO.ToJSON();
    } else {
      return false;
    }
  }

  async update(id, data) {
    return await knex(this.tableName).where({ id: id }).update(data);
  }

  async delete(id) {
    return await knex(this.tableName).where({ id: id }).del();
  }
}

module.exports = MySQLDao;
