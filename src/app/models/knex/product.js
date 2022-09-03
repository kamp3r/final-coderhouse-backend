const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('code').unique().notNullable();
      table.string('picture');
      table.string('category');
      table.float('price').notNullable();
      table.integer('stock').unsigned().notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }
};
