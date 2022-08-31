const { Router } = require('express');
const router = Router();
const products = require('../app/controllers/products');
const checkAuthentication = require('../app/middlewares/checkAuthentication');
const isAdmin = require('../app/middlewares/isAdmin');
const {
  productReqValidation,
} = require('../app/middlewares/requestValidation');
const { validationResult } = require('express-validator');
const { loggerWarn } = require('../config/log4js');

router.get('/listar', async (req, res) => {
  try {
    const data = await products.list();
    if (data.length > 0) return res.status(200).json(data);
    throw new Error('No hay productos cargados.');
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

router.get('/listar/:id', async (req, res) => {
  try {
    const product = await products.listId(req.params.id);
    if (product) return res.status(200).json(product);
    throw new Error(`El producto con id: ${req.params.id} no existe.`);
  } catch (error) {
    loggerWarn.warn(error.message);
    res.status(404).json({ error: error.message });
  }
});

router.post(
  '/agregar',
  checkAuthentication,
  isAdmin,
  productReqValidation,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json(await products.save(req.body));
    } catch (error) {
      loggerWarn.warn(error);
      res.json({ error: error.message });
    }
  }
);

router.put(
  '/actualizar/:id',
  checkAuthentication,
  isAdmin,
  productReqValidation,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let productUpdated = await products.update(req.params.id, req.body);
      if (productUpdated) return res.status(200).json(productUpdated);
      res
        .status(404)
        .json({ error: 'El producto que intenta actualizar no existe.' });
    } catch (error) {
      loggerWarn.warn(error);
      res.json({ error: error.message });
    }
  }
);

router.delete('/borrar/:id', checkAuthentication, isAdmin, async (req, res) => {
  try {
    let productDeleted = await products.delete(req.params.id);
    if (productDeleted) return res.status(200).json(productDeleted);
    res
      .status(404)
      .json({ error: 'El producto que intenta eliminar no existe.' });
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

router.get('/buscar', async (req, res) => {
  try {
    const data = await products.search(req.query);
    if (data.length > 0) {
      res.json(data);
    } else {
      throw new Error('No hay productos que coincidan con la busqueda.');
    }
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
