const IDao = require('../IDao');
const userModel = require('../../models/mongoose/user');
const MongoDBConnection = require('../../../db/connection');
const config = require('../../../config/config');

let instanciaMongoDB = null;

class MongoDBDao extends IDao {
  constructor() {
    super();

    this.collection = userModel;
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

  async read(user) {
    const data = await this.collection.find(user);
    return data;
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
}

module.exports = MongoDBDao;
