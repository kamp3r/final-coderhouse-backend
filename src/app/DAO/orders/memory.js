const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.orders = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(client, cart) {
    let newOrder = {
      id: uuidv4(),
      status: 'generated',
      products: cart.map((e) => {
        return {
          id: uuidv4(),
          code: e.producto.code,
          name: e.producto.name,
          description: e.producto.description,
          price: e.producto.price,
          picture: e.producto.picture,
          qty: e.qty,
        };
      }),
      email: client.email,
      address: client.address,
      timestamp: new Date().toLocaleString(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  read(query) {
    let orderesclient = this.orders.filter((e) => e.email == query.email);
    return orderesclient;
  }

  readId(id) {
    let order = this.orders.filter((e) => e.id == id);
    return order[0];
  }

  update(id, data) {
    let order = this.orders.filter((p) => p.id == id);
    if (order.length) {
      let orderUpdate = Object.assign(order[0], data);
      orderUpdate.timestamp = new Date().toLocaleString();
      return orderUpdate;
    } else {
      return false;
    }
  }

  delete(id) {
    let index = this.orders.findIndex((e) => e.id == id);
    if (index >= 0) {
      const orderDeleted = this.orders.splice(index, 1);
      return orderDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
