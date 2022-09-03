const IDao = require('../IDao');
const shoppingCartModel = require('../../models/mongoose/cart');
const MongoDBConnection = require('../../../db/connection');
const config = require('../../../config/config');

let instanciaMongoDB = null;

class MongoDBDao extends IDao {
  constructor() {
    super();

    this.collection = shoppingCartModel;
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

  async create(id_product, qty, id_client) {
    let cant = await this.collection.find(
      { product: id_product, cliente: id_client },
      { qty }
    );
    if (cant.length) {
      cant[0].qty += qty;
      return await this.collection.findOneAndUpdate(
        { producto: id_product, cliente: id_client },
        { qty: cant[0].qty },
        { new: true }
      );
    } else {
      return await this.collection.create({
        producto: id_product,
        qty: qty,
        cliente: id_client,
      });
    }
  }

  async read(id_client) {
    const data = await this.collection
      .find({ cliente: id_client })
      .populate('producto');
    return data;
  }

  async readId(id) {
    return await this.collection.findById(id).populate('producto');
  }

  async update(id, data) {
    return await this.collection.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async delete(id) {
    let data = await this.collection.findByIdAndRemove(
      { _id: id },
      { rawResult: true }
    );
    return data.value;
  }
}

module.exports = MongoDBDao;
