const IDao = require('../IDao');
const productModel = require('../../models/mongoose/product');
const MongoDBConnection = require('../../../db/connection');
const config = require('../../../config/config');

let instanciaMongoDB = null;

class MongoDBDao extends IDao {
  constructor() {
    super();

    this.collection = productModel;
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

  async create(data) {
    return await this.collection.create(data);
  }

  async read() {
    const data = await this.collection.find({});
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  }

  async readId(id) {
    const data = await this.collection.findById(id);
    return data;
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

  async search(filters) {
    filters.name.length == 0 ? (filters.name = null) : '';
    return await this.collection.find({
      $or: [
        { name: { $regex: '.*' + filters.name + '.*', $options: 'i' } },
        { code: filters.code },
        { category: filters.category},
        { price: { $gte: filters.priceMin, $lte: filters.priceMax } },
        { stock: { $gte: filters.stockMin, $lte: filters.stockMax } },
      ],
    });
  }
}

module.exports = MongoDBDao;
