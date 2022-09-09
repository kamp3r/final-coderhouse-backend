const router = require('express').Router();
const cart = require('../app/controllers/carts');
const { loggerWarn } = require('../config/log4js');

/**
 * @swagger
 * tags:
 *   name: Cart
 */
/**
 * @openapi
 * /cart/:
 *   get:
 *     summary: 'Get all items from cart'
 *     description: Get all items from cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               Product:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   picture:
 *                     type: string
 *               qty:
 *                 type: 'integer'
 *               client:
 *                 type: string
 *               timestamp:
 *                 type: string
 *               id:
 *                 type: string
 *       403:
 *         description: You don't have permission to access this endpoint
 */

router.get('/', async (req, res) => {
  try {
    const data = await cart.list(req.user.id);
    if (data.length) return res.status(200).json(data);
    throw new Error('No found carts to this client');
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

/**
 * @openapi
 * /cart/{id}:
 *   get:
 *     summary: 'Get item in cart by id'
 *     description: Retrieve item in cart by id
 *     tags: [Cart]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID of the item to retrieve'
 *     responses:
 *       200:
 *         description: Item found in cart
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 picture:
 *                   type: string
 *             qty:
 *               type: 'integer'
 *             client:
 *               type: string
 *             timestamp:
 *               type: string
 *             id:
 *               type: string
 *       403:
 *         description: You don't have permission to access this endpoint
 */

router.get('/:id', async (req, res) => {
  try {
    const data = await cart.listId(req.params.id);
    if (!data)
      throw new Error(`Cart with Id: ${req.params.id} not found.`);
    return res.json(data);
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

/**
 * @openapi
 * /cart/add/{id_product}:
 *   post:
 *     summary: 'Add product to cart'
 *     description: Add new product to cart by id
 *     tags: [Cart]
 *     parameters:
 *     - name: 'id_producto'
 *       in: 'path'
 *       description: 'ID to add to cart'
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Quantity to add to cart'
 *       schema:
 *         type: object
 *         properties:
 *           qty:
 *             type: integer
 *     responses:
 *       200:
 *         description: Success on add product to cart
 */

router.post('/add/:id_product', async (req, res) => {
  try {
    res.json(
      await cart.save(req.params.id_product, req.body.qty, req.user.id)
    );
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

/**
 * @openapi
 * /cart/update/{id}:
 *   put:
 *     summary: 'Update quantity of item in cart'
 *     description: Update quantity of item in cart by id in params
 *     tags: [Cart]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID of item in cart'
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Quantity of item to update'
 *       schema:
 *         type: object
 *         properties:
 *           qty:
 *             type: integer
 *     responses:
 *       200:
 *         description: Product updated
 */

router.put('/update/:id', async (req, res) => {
  try {
    res.status(200).json(await cart.update(req.params.id, req.body));
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

/**
 * @openapi
 * /cart/delete/{id}:
 *   delete:
 *     summary: 'Delete a item in cart'
 *     description: Delete a item in cart by ID 
 *     tags: [Cart]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID of the item to be deleted'
 *     responses:
 *       200:
 *         description: Product deleted
 */

router.delete('/delete/:id', async (req, res) => {
  try {
    res.json(await cart.delete(req.params.id));
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
