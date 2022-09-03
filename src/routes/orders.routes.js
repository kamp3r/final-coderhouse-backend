const router = require('express').Router();
const shoppingCartController = require('../app/controllers/carts');
const ordersController = require('../app/controllers/orders');
const { loggerError } = require('../config/log4js');
const { enviarMailOrdenGenerada } = require('../app/helpers/sendMail');

/**
 * @swagger
 * tags:
 *   name: Orders
 */
/**
 * @openapi
 * /orders/:
 *   get:
 *     summary: 'Get all orders'
 *     description: Return a array of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: All orders are retrieved
 *         schema:
 *           type: array
 *           items: 
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: status of order
 *                 example: 'generated'
 *               products:
 *                 type: array
 *                 description: Arreglo de los productos que tiene la orden
 *                 items:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     picture:
 *                       type: string
 *                     qty:
 *                       type: integer
 *               email:
 *                 type: string
 *                 description: Email client
 *                 example: 'email@example.com'
 *               address:
 *                 type: string
 *                 description: Address to delivery order
 *                 example: 'Fake St. 123'
 *               timestamp:
 *                 type: string
 *                 description: Order creation date
 *                 example: '31/08/2022 - 06:00:00HS'
 *       403:
 *         description: You don't have permission to this endpoint
 */

router.get('/', async (req, res) => {
  try {
    let orders = await ordersController.list({ email: req.user.email });
    res.json(orders);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ status: 'error' });
  }
});

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: 'Get order by id'
 *     description: Return order by ID
 *     tags: [Orders]
 *     parameters:
 *     - name: id
 *       in: 'path'
 *       description: 'ID of order to retrieve'
 *     responses:
 *       200:
 *         description: order retrieved successfully
 *       403:
 *         description: You don't have permission to access this endpoint
 */

router.get('/:id', async (req, res) => {
  try {
    let order = await ordersController.listId(req.params.id);
    res.json(order);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ status: 'error' });
  }
});

/**
 * @openapi
 * /orders/add:
 *   post:
 *     summary: 'Add a new order'
 *     description: Create a new order with the items in a cart 
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: New order created
 *       403:
 *         description: You don't have permission to access this endpoint
 */

router.post('/add', async (req, res) => {
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
        return res.json({ success: 'Order generated successfully' });
      }
      throw new Error('Error creating Order');
    } else {
      res.json({
        error: 'You must have items in your cart to create a Order',
      });
    }
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'Order creation failed' });
  }
});

/**
 * @openapi
 * /order/update/{id}:
 *   put:
 *     summary: 'Update a Order'
 *     description: Update a Order by ID
 *     tags: [Orders]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID Order to update'
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Attributes to update'
 *       schema:
 *         type: object
 *         properties:
 *           address:
 *             type: string
 *             example: 'Truth St. 789'
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

router.put('/update/:id', async (req, res) => {
  try {
    res.json(await ordersController.update(req.params.id, req.body));
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser actualizada' });
  }
});

/**
 * @openapi
 * /orders/delete/{id}:
 *   delete:
 *     summary: 'Delete order by ID'
 *     description: Delete a order by ID Parameter
 *     tags: [Orders]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID of order to delete'
 *     responses:
 *       200:
 *         description: Order has been deleted
 */

router.delete('/delete/:id', async (req, res) => {
  try {
    res.json(await ordersController.delete(req.params.id));
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser eliminada' });
  }
});

/**
 * @openapi
 * /ordenes/sended/{id}:
 *   put:
 *     summary: 'Change status order to Sended'
 *     description: Change status order to Sended
 *     tags: [Orders]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'Order ID to change status'
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Attributes to update'
 *       schema:
 *         type: object
 *         properties:
 *           status:
 *             type: string
 *             example: 'sended'
 *     responses:
 *       200:
 *         Order has been updated successfully
 */

router.put('/sended/:id', async (req, res) => {
  try {
    let orderCreated = await ordersController.update(req.params.id, {
      estado: 'enviada',
    });
    enviarMailOrdenGenerada(orderCreated);
    res.json(orderCreated);
  } catch (error) {
    loggerError.error(error.message);
    res.json({ error: 'La orden no pudo ser confirmada' });
  }
});

module.exports = router;
