const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const { createTable } = require('../../models/knex/product');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'productos';
    createTable(this.tableName);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }

  async create(producto) {
    return await knex(this.tableName).insert(producto);
  }

  async read() {
    let rows = await knex.from(this.tableName).select('*');
    return rows;
  }

  async readId(id) {
    let rows = await knex.from(this.tableName).select('*').where({ id: id });
    return rows[0];
  }

  async update(id, data) {
    return await knex(this.tableName).where({ id: id }).update(data);
  }

  async delete(id) {
    return await knex(this.tableName).where({ id: id }).del();
  }

  async search(filters) {
    return await knex(this.tableName)
      .where('name', filters.name)
      .orWhere('code', filters.code)
      .orWhere('category', filters.category)
      .orWhereBetween('price', [filters.priceMin, filters.priceMax])
      .orWhereBetween('stock', [filters.stockMin, filters.stockMax]);
  }
}

module.exports = MySQLDao;
