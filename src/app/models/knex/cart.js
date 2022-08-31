const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTableOrdersItems = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.integer('order_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.float('precio').notNullable();
      table.integer('cantidad').unsigned().notNullable();
      table
        .foreign('order_id')
        .references('id')
        .inTable('ordenes')
        .onDelete('CASCADE');
      table.foreign('product_id').references('id').inTable('productos');
    });
  }
};
