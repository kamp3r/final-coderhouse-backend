const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.integer('product_id').unsigned().notNullable();
      table.integer('cantidad').unsigned().notNullable();
      table.integer('client_id').unsigned().notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
      table
        .foreign('product_id')
        .references('id')
        .inTable('productos')
        .onDelete('CASCADE');
      table
        .foreign('client_id')
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE');
    });
  }
};
