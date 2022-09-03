const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.products = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(product) {
    const newProduct = {
      id: uuidv4(),
      nombre: product.nombre,
      descripcion: product.descripcion,
      codigo: product.codigo,
      foto: product.foto,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      timestamp: new Date().toLocaleString(),
    };
    this.products.push(newProduct);
    return this.products[this.products.length - 1];
  }

  read() {
    return this.products;
  }

  readId(id) {
    const product = this.products.filter((e) => e.id == id);
    return product[0];
  }

  update(id, data) {
    let product = this.products.filter((p) => p.id == id);
    if (product.length) {
      let productUpdated = Object.assign(product[0], data);
      productUpdated.timestamp = new Date().toLocaleString();
      return productUpdated;
    } else {
      return false;
    }
  }

  delete(id) {
    let index = this.products.findIndex((p) => p.id == id);
    if (index >= 0) {
      const productDeleted = this.products.splice(index, 1);
      return productDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
