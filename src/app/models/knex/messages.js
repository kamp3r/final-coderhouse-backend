const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);

module.exports.createTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.increments('id');
      table.string('email').notNullable();
      table.string('body').notNullable();
      table.enu('type', ['user', 'system']).defaultTo('user');
      table.timestamp('fyh').defaultTo(knex.fn.now());
    });
  }
};
