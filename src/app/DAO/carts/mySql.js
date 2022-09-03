const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const { createTable } = require('../../models/knex/cart');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'cart';
    createTable(this.tableName);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }

  async create(product_id, qty, client_id) {
    let data = await knex
      .from(this.tableName)
      .select('*')
      .where('product_id', product_id)
      .andWhere('client_id', client_id);

    if (data.length) {
      data[0].qty += qty;
      return await this.update(data[0].id, { qty: data[0].qty });
    } else {
      return await knex(this.tableName).insert({
        product_id: product_id,
        qty: qty,
        client_id: client_id,
      });
    }
  }

  async read(client_id) {
    let rows = await knex
      .from(this.tableName)
      .join('products', 'product_id', '=', 'products.id')
      .select(
        'cart.id',
        'cart.timestamp',
        'cart.product_id',
        'cart.qty',
        'cart.client_id',
        'product.name',
        'product.description',
        'product.code',
        'product.picture',
        'product.price',
        'product.stock'
      )
      .where('client_id', client_id);
    let items = rows.map((element) => {
      return {
        id: element.id,
        timestamp: element.timestamp,
        producto: {
          id: element.product_id,
          timestamp: element.timestamp,
          name: element.name,
          description: element.description,
          code: element.code,
          picture: element.picture,
          price: element.price,
          stock: element.stock,
        },
        qty: element.qty,
      };
    });
    return items;
  }

  async readId(id) {
    let cart = await knex
      .from(this.tableName)
      .join('product', 'product_id', '=', 'product.id')
      .select(
        'cart.id',
        'cart.timestamp',
        'cart.qty',
        'cart.product_id',
        'cart.client_id',
        'product.name',
        'product.description',
        'product.code',
        'product.picture',
        'product.price',
        'product.stock'
      )
      .where('cart.id', id);

    if (cart.length == 0) return false;
    return {
      id: cart[0].id,
      timestamp: cart[0].timestamp,
      producto: {
        id: cart[0].product_id,
        name: cart[0].name,
        description: cart[0].description,
        code: cart[0].code,
        picture: cart[0].picture,
        price: cart[0].price,
        stock: cart[0].stock,
      },
      qty: cart[0].qty,
    };
  }

  async update(id, data) {
    return await knex(this.tableName).where({ id: id }).update(data);
  }

  async delete(id) {
    return await knex(this.tableName).where({ id: id }).del();
  }
}

module.exports = MySQLDao;
