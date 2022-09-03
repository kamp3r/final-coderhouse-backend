const IDao = require('../IDao');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fsDaoProducts = require('../products/fileSystem').getInstance();

let instaciaFileSystem = null;

class FileSystemDao extends IDao {
  constructor() {
    super();

    this.urlPath = 'src/dbFile/shoppingCarts.txt';
  }

  static getInstance() {
    if (!instaciaFileSystem) {
      instaciaFileSystem = new FileSystemDao();
    }

    return instaciaFileSystem;
  }

  create(id_product, qty, id_client) {
    const product = fsDaoProducts.readId(id_product);
    let cart = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let previousItem = cart.filter((e) => {
      return e.product.id == id_product && e.client_id == id_client;
    });
    if (previousItem.length) {
      previousItem[0].qty += qty;
      fs.writeFileSync(this.urlPath, JSON.stringify(cart, null, '\t'));
      return previousItem[0];
    } else {
      const newProductCart = {
        id: uuidv4(),
        timestamp: new Date().toLocaleString(),
        product: product,
        qty: qty,
        client_id: id_client,
      };
      cart.push(newProductCart);
      fs.writeFileSync(this.urlPath, JSON.stringify(cart, null, '\t'));
      return newProductCart;
    }
  }

  read(client_id) {
    const cart = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    const cartUser = cart.filter((e) => e.client_id == client_id);
    return cartUser;
  }

  readId(id) {
    const cart = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    const carts = cart.filter((e) => e.id == id);
    return carts;
  }

  delete(id) {
    let cart = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    const index = cart.findIndex((carts) => carts.id == id);
    if (index >= 0) {
      const cartsDeleted = cart.splice(index, 1);
      fs.writeFileSync(this.urlPath, JSON.stringify(cart, null, '\t'));
      return cartsDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = FileSystemDao;
