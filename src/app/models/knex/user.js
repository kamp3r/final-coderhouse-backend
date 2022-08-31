const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('nombre').notNullable();
      table.string('direccion').notNullable();
      table.integer('edad').unsigned().notNullable();
      table.string('telefono').notNullable();
      table.string('foto');
    });
  }
};
