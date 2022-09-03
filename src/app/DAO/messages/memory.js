const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.messages = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(message) {
    let newMessage = {
      id: uuidv4(),
      email: message.email,
      body: message.body,
      type: message.type,
      fyh: new Date().toLocaleString(),
    };
    this.messages.push(newMessage);
    return this.messages[this.messages.length - 1];
  }

  read() {
    return this.messages;
  }

  readId(id) {
    let message = this.messages.filter((e) => e.id == id);
    return message[0];
  }

  update(id, data) {
    let message = this.messages.filter((p) => p.id == id);
    if (message.length) {
      let messageUpdated = Object.assign(message[0], data);
      messageUpdated.timestamp = new Date().toLocaleString();
      return messageUpdated;
    } else {
      return false;
    }
  }

  delete(id) {
    let index = this.messages.findIndex((e) => e.id == id);
    if (index >= 0) {
      const messageDeleted = this.messages.splice(index, 1);
      return messageDeleted;
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
