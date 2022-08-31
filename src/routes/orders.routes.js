const { Router } = require('express');
const router = Router();
const shoppingCartController = require('../app/controllers/carts');
const ordersController = require('../app/controllers/orders');
const { loggerError } = require('../config/log4js');
const { enviarMailOrdenGenerada } = require('../app/helpers/sendMail');

router.get('/listar', async (req, res) => {
  try {
    let ordenes = await ordersController.list({ email: req.user.email });
    res.json(ordenes);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ status: 'error' });
  }
});

router.get('/listar/:id', async (req, res) => {
  try {
    let orden = await ordersController.listId(req.params.id);
    res.json(orden);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ status: 'error' });
  }
});

router.post('/agregar', async (req, res) => {
  try {
    let cliente = {
      id: req.user.id,
      email: req.user.email,
      direccion: req.user.direccion,
    };
    const itemsClientCart = await shoppingCartController.list(req.user.id);
    if (itemsClientCart.length) {
      let data = await ordersController.save(cliente, itemsClientCart);
      if (data) {
        return res.json({ success: 'Orden generada con exito' });
      }
      throw new Error('Error al guardar orden');
    } else {
      res.json({
        error: 'Antes de generar un pedido debe agregar productos al carrito',
      });
    }
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser generada' });
  }
});

router.put('/actualizar/:id', async (req, res) => {
  try {
    res.json(await ordersController.update(req.params.id, req.body));
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser actualizada' });
  }
});

router.delete('/borrar/:id', async (req, res) => {
  try {
    res.json(await ordersController.delete(req.params.id));
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser eliminada' });
  }
});

router.put('/confirmar/:id', async (req, res) => {
  try {
    let ordenConfirmada = await ordersController.update(req.params.id, {
      estado: 'enviada',
    });
    enviarMailOrdenGenerada(ordenConfirmada);
    res.json(ordenConfirmada);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser confirmada' });
  }
});

module.exports = router;
