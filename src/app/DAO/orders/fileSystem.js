const IDao = require('../IDao');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let instaciaFileSystem = null;

class FileSystemDao extends IDao {
  constructor() {
    super();

    this.urlPath = 'src/dbFile/orders.txt';
  }

  static getInstance() {
    if (!instaciaFileSystem) {
      instaciaFileSystem = new FileSystemDao();
    }

    return instaciaFileSystem;
  }

  create(client, cart) {
    let orders = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let newOrder = {
      id: uuidv4(),
      status: 'generated',
      products: cart.map((e) => {
        return {
          id: uuidv4(),
          code: e.product.code,
          name: e.product.name,
          description: e.product.description,
          price: e.product.price,
          picture: e.product.picture,
          qty: e.qty,
        };
      }),
      email: client.email,
      address: client.address,
      timestamp: new Date().toLocaleString(),
    };
    orders.push(newOrder);
    fs.writeFileSync(this.urlPath, JSON.stringify(orders, null, '\t'));
    return newOrder;
  }

  read(query) {
    let orders = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let ordersclient = orders.filter((e) => e.email == query.email);
    return ordersclient;
  }

  readId(id) {
    let orders = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let orden = orders.filter((e) => e.id == id);
    return orden[0];
  }

  update(id, data) {
    let orders = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let orden = orders.filter((p) => p.id == id);
    if (orden.length) {
      let orderUpdate = Object.assign(orden[0], data);
      orderUpdate.timestamp = new Date().toLocaleString();
      fs.writeFileSync(this.urlPath, JSON.stringify(orders, null, '\t'));
      return orderUpdate;
    } else {
      return false;
    }
  }

  delete(id) {
    let orders = JSON.parse(fs.readFileSync(this.urlPath, 'utf-8'));
    let index = orders.findIndex((e) => e.id == id);
    if (index >= 0) {
      const orderDeleted = orders.splice(index, 1);
      fs.writeFileSync(this.urlPath, JSON.stringify(orders, null, '\t'));
      return orderDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = FileSystemDao;
