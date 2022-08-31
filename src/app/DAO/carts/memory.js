const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');
const memoryDaoProducts = require('../products/memory').getInstance();

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.shoppingCarts = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(id_producto, cantidad, id_cliente) {
    const producto = memoryDaoProducts.readId(id_producto);
    let previousItem = this.shoppingCarts.filter((e) => {
      return e.producto.id == id_producto && e.client_id == id_cliente;
    });
    if (previousItem.length) {
      previousItem[0].cantidad += cantidad;
      return previousItem[0];
    } else {
      const newProductCart = {
        id: uuidv4(),
        timestamp: new Date().toLocaleString(),
        producto: producto,
        cantidad: cantidad,
        client_id: id_cliente,
      };
      this.shoppingCarts.push(newProductCart);
      return newProductCart;
    }
  }

  read(client_id) {
    const carritoUser = this.shoppingCarts.filter(
      (e) => e.client_id == client_id
    );
    return carritoUser;
  }

  readId(id) {
    const shoppingCartItem = this.shoppingCarts.filter((e) => e.id == id);
    return shoppingCartItem[0];
  }

  delete(id) {
    let index = this.shoppingCarts.findIndex((p) => p.id == id);
    if (index >= 0) {
      const shoppingCartItemDeleted = this.shoppingCarts.splice(index, 1);
      return shoppingCartItemDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
