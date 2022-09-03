const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTableOrders = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.enu('status', ['generated', 'sended']).defaultTo('generated');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }
};
