const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.string('nombre').notNullable();
      table.string('descripcion').notNullable();
      table.string('codigo').unique().notNullable();
      table.string('foto');
      table.float('precio').notNullable();
      table.integer('stock').unsigned().notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }
};
