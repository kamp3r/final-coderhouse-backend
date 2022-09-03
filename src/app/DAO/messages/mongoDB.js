const IDao = require('../IDao');
const messageModel = require('../../models/mongoose/message');
const MongoDBConnection = require('../../../db/connection');
const config = require('../../../config/config');

let instanciaMongoDB = null;

class MongoDBDao extends IDao {
  constructor() {
    super();

    this.collection = messageModel;
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

  async create(message) {
    return this.collection.create(message);
  }

  async read() {
    return await this.collection.find({});
  }

  async readId(id) {
    return await this.collection.findById(id);
  }

  async update(id, data) {
    return await this.collection.findOneAndUpdate({ _id: id }, data);
  }

  async delete(id) {
    return await this.collection.deleteOne({ _id: id });
  }
}

module.exports = MongoDBDao;
