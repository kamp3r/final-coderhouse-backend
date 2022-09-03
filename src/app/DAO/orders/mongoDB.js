const IDao = require('../IDao');
const ordersModel = require('../../models/mongoose/order');
const shoppingCartModel = require('../../models/mongoose/cart');
const MongoDBConnection = require('../../../db/connection');
const config = require('../../../config/config');

let instanciaMongoDB = null;

class MongoDBDao extends IDao {
  constructor() {
    super();

    this.collection = ordersModel;
    this.conectarDB();
  }

  static getInstance() {
    if (!instanciaMongoDB) {
      instanciaMongoDB = new MongoDBDao();
    }

    return instanciaMongoDB;
  }

  async conectarDB() {
    const db = MongoDBConnection.getMongoDBInstance(config.MONGO_URL);
    await db.connect();
  }

  async create(client, cart) {
    let products = cart.map((e) => {
      return {
        code: e.producto.code,
        name: e.producto.name,
        description: e.producto.description,
        price: e.producto.price,
        picture: e.producto.picture,
        qty: e.qty,
      };
    });
    await shoppingCartModel.deleteMany({ client: client.id });
    return await this.collection.create({
      products: products,
      email: client.email,
      address: client.address,
    });
  }

  async read(query) {
    return await this.collection.find(query);
  }

  async readId(id) {
    return await this.collection.findById(id);
  }

  async update(id, data) {
    return await this.collection.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async delete(id) {
    return await this.collection.findByIdAndDelete(
      { _id: id },
      { rawResult: true }
    );
  }
}

module.exports = MongoDBDao;
