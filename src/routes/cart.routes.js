const { Router } = require('express');
const router = Router();
const carrito = require('../app/controllers/carts');
const { loggerWarn } = require('../config/log4js');

router.get('/listar', async (req, res) => {
  try {
    const data = await carrito.list(req.user.id);
    if (data.length) return res.status(200).json(data);
    throw new Error('No hay carritos cargados para el cliente.');
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

router.get('/listar/:id', async (req, res) => {
  try {
    const data = await carrito.listId(req.params.id);
    if (!data)
      throw new Error(`El carrito con id: ${req.params.id} no existe.`);
    return res.json(data);
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

router.post('/agregar/:id_producto', async (req, res) => {
  try {
    res.json(
      await carrito.save(req.params.id_producto, req.body.cantidad, req.user.id)
    );
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

router.put('/actualizar/:id', async (req, res) => {
  try {
    res.status(200).json(await carrito.update(req.params.id, req.body));
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

router.delete('/borrar/:id', async (req, res) => {
  try {
    res.json(await carrito.delete(req.params.id));
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
