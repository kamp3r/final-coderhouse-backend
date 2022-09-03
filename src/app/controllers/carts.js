const daoFactory = require('../DAO/DAOFactory.js');
const config = require('../../config/config');

class ShoppingCartController {

    constructor() {
        this.shoppingCartDao = daoFactory.getPersistencia('carts', config.PERSISTENCIA);
    }

    async list(id_client) {
        return await this.shoppingCartDao.read(id_client);
    }

    async listId(id) {
        return await this.shoppingCartDao.readId(id);
    }

    async save(id_product, qty, id_client) {
        return await this.shoppingCartDao.create(id_producto, qty, id_client);
    }

    async update(id, data) {
        return await this.shoppingCartDao.update(id, data);
    }

    async delete(id) {
        return await this.shoppingCartDao.delete(id);
    }

}

module.exports = new ShoppingCartController();