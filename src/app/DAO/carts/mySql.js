const IDao = require('../IDao');
const { mySql } = require('../../../config/config');
const knex = require('knex')(mySql);
const { createTable } = require('../../models/knex/cart');

let instanciaMySQL = null;

class MySQLDao extends IDao {
  constructor() {
    super();

    this.tableName = 'carritos';
    createTable(this.tableName);
  }

  static getInstance() {
    if (!instanciaMySQL) {
      instanciaMySQL = new MySQLDao();
    }

    return instanciaMySQL;
  }

  async create(product_id, cantidad, client_id) {
    let data = await knex
      .from(this.tableName)
      .select('*')
      .where('product_id', product_id)
      .andWhere('client_id', client_id);

    if (data.length) {
      data[0].cantidad += cantidad;
      return await this.update(data[0].id, { cantidad: data[0].cantidad });
    } else {
      return await knex(this.tableName).insert({
        product_id: product_id,
        cantidad: cantidad,
        client_id: client_id,
      });
    }
  }

  async read(client_id) {
    let rows = await knex
      .from(this.tableName)
      .join('productos', 'product_id', '=', 'productos.id')
      .select(
        'carritos.id',
        'carritos.timestamp',
        'carritos.product_id',
        'carritos.cantidad',
        'carritos.client_id',
        'productos.nombre',
        'productos.descripcion',
        'productos.codigo',
        'productos.foto',
        'productos.precio',
        'productos.stock'
      )
      .where('client_id', client_id);
    let items = rows.map((element) => {
      return {
        id: element.id,
        timestamp: element.timestamp,
        producto: {
          id: element.product_id,
          timestamp: element.timestamp,
          nombre: element.nombre,
          descripcion: element.descripcion,
          codigo: element.codigo,
          foto: element.foto,
          precio: element.precio,
          stock: element.stock,
        },
        cantidad: element.cantidad,
      };
    });
    return items;
  }

  async readId(id) {
    let carrito = await knex
      .from(this.tableName)
      .join('productos', 'product_id', '=', 'productos.id')
      .select(
        'carritos.id',
        'carritos.timestamp',
        'carritos.cantidad',
        'carritos.product_id',
        'carritos.client_id',
        'productos.nombre',
        'productos.descripcion',
        'productos.codigo',
        'productos.foto',
        'productos.precio',
        'productos.stock'
      )
      .where('carritos.id', id);

    if (carrito.length == 0) return false;
    return {
      id: carrito[0].id,
      timestamp: carrito[0].timestamp,
      producto: {
        id: carrito[0].product_id,
        nombre: carrito[0].nombre,
        descripcion: carrito[0].descripcion,
        codigo: carrito[0].codigo,
        foto: carrito[0].foto,
        precio: carrito[0].precio,
        stock: carrito[0].stock,
      },
      cantidad: carrito[0].cantidad,
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
