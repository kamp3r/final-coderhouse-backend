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

  create(id_product, qty, id_client) {
    const product = memoryDaoProducts.readId(id_product);
    let previousItem = this.shoppingCarts.filter((e) => {
      return e.product.id == id_product && e.client_id == id_client;
    });
    if (previousItem.length) {
      previousItem[0].qty += qty;
      return previousItem[0];
    } else {
      const newProductCart = {
        id: uuidv4(),
        timestamp: new Date().toLocaleString(),
        product: product,
        qty: qty,
        client_id: id_client,
      };
      this.shoppingCarts.push(newProductCart);
      return newProductCart;
    }
  }

  read(client_id) {
    const cartUser = this.shoppingCarts.filter(
      (e) => e.client_id == client_id
    );
    return cartUser;
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
