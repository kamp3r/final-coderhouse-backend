const daoFactory = require('../DAO/DAOFactory');
const config = require('../../config/config');

class OrderController {

    constructor() {
        this.orderDao = daoFactory.getPersistencia('orders', config.PERSISTENCIA);
    }

    async list(query) {
        return await this.orderDao.read(query);
    }

    async listId(id) {
        return await this.orderDao.readId(id);
    }

    async save(client, cart) {
        return await this.orderDao.create(client, cart);
    }

    async update(id, data) {
        return await this.orderDao.update(id, data);
    }

    async delete(id) {
        return await this.orderDao.delete(id);
    }

}

module.exports = new OrderController();