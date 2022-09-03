const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.users = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(user) {
    const newUser = {
      id: uuidv4(),
      email: user.email,
      password: user.password,
      name: user.name,
      address: user.address,
      age: user.age,
      telephone: user.telephone,
      picture: user.picture,
    };
    this.users.push(newUser);
    return this.users[this.users.length - 1];
  }

  read() {
    return this.users;
  }

  readId(id) {
    const user = this.users.filter((e) => e.id == id);
    return user[0];
  }

  update(id, data) {
    let user = this.users.filter((p) => p.id == id);
    if (user.length) {
      let userUpdated = Object.assign(user[0], data);
      return userUpdated;
    } else {
      return false;
    }
  }

  delete(id) {
    let index = this.users.findIndex((p) => p.id == id);
    if (index >= 0) {
      const userDeleted = this.users.splice(index, 1);
      return userDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
