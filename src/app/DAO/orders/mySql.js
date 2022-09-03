const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const { createTableOrders } = require('../../models/knex/order');
const { createTableOrdersItems } = require('../../models/knex/order_items');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'orders';
    this.tableNameItems = 'orders_items';
    createTableOrders(this.tableName);
    createTableOrdersItems(this.tableNameItems);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }

  async create(client, itemsClientCart) {
    let newOrderData = await knex(this.tableName).insert({
      email: client.email,
      address: client.address,
    });

    let orderItems = itemsClientCart.map((e) => {
      return {
        order_id: newOrderData[0],
        product_id: e.producto.id,
        precio: e.producto.precio,
        cantidad: e.cantidad,
      };
    });

    let newOrderItemsData = await knex(this.tableNameItems).insert(orderItems);

    return newOrderItemsData.length;
  }

  async read(query) {
    let ordersDB = await knex(this.tableName).select('*').where(query);

    let ordersItemsDB = await knex(this.tableNameItems)
      .join('products', 'product_id', '=', 'products.id')
      .select(
        'products.codigo',
        'products.nombre',
        'products.descripcion',
        'products.foto',
        'orders_items.precio',
        'orders_items.cantidad',
        'orders_items.order_id'
      );

    let dataResult = ordersDB.map((orden) => {
      return {
        id: orden.id,
        email: orden.email,
        address: orden.address,
        status: orden.status,
        timestamp: orden.timestamp,
        products: ordersItemsDB.filter((item) => item.order_id == orden.id),
      };
    });

    return dataResult;
  }

  async readId(id) {
    let ordersDB = await knex(this.tableName).select('*').where('id', id);

    let ordersItemsDB = await knex(this.tableNameItems)
      .join('products', 'product_id', '=', 'products.id')
      .select(
        'products.codigo',
        'products.nombre',
        'products.descripcion',
        'products.foto',
        'orders_items.precio',
        'orders_items.cantidad',
        'orders_items.order_id'
      )
      .where('order_id', id);

    let dataResult = ordersDB.map((orden) => {
      return {
        id: orden.id,
        email: orden.email,
        address: orden.address,
        status: orden.status,
        timestamp: orden.timestamp,
        products: ordersItemsDB,
      };
    });

    return dataResult[0];
  }

  async update(id, data) {
    return await knex(this.tableName).where({ id: id }).update(data);
  }

  async delete(id) {
    return await knex(this.tableName).where({ id: id }).del();
  }
}

module.exports = MySQLDao;
