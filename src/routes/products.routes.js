const router = require('express').Router();
const products = require('../app/controllers/products');
const checkAuthentication = require('../app/middlewares/checkAuthentication');
const isAdmin = require('../app/middlewares/isAdmin');
const {
  productReqValidation,
} = require('../app/middlewares/requestValidation');
const { validationResult } = require('express-validator');
const { loggerWarn } = require('../config/log4js');

/**
 * @swagger
 * tags:
 *   name: Products
 */
/**
 * @openapi
 * /products/:
 *   get:
 *     summary: 'Get all products'
 *     description: Return all products from DB
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: All products are retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Product code
 *                 example: '82'
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Malbec Rosendo
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: Malbec vineyard
 *               category:
 *                 type: string
 *                 description: Product category
 *                 example: Red wine
 *               price:
 *                 type: number
 *                 description: Product price
 *                 example: 550.89
 *               stock:
 *                 type: integer
 *                 description: Product stock
 *                 example: 5
 *               picture:
 *                 type: string
 *                 description: Image URL Product
 *                 example: http://imager.com/1
 */

router.get('/', async (req, res) => {
  try {
    const data = await products.list();
    if (data.length > 0) return res.status(200).json(data);
    throw new Error('Products not found');
  } catch (error) {
    loggerWarn.warn(error.message);
    res.json({ error: error.message });
  }
});

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: 'Get Product by ID'
 *     tags: [Products]
 *     description: Get product by ID
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'Product ID to retrieve from the database'
 *     responses:
 *       200:
 *         description: 'Product retrieved successfully'
 *       404:
 *         description: 'Product not found'
 */

router.get('/:id', async (req, res) => {
  try {
    const product = await products.listId(req.params.id);
    if (product) return res.status(200).json(product);
    throw new Error(`Product with ID: ${req.params.id} not found.`);
  } catch (error) {
    loggerWarn.warn(error.message);
    res.status(404).json({ error: error.message });
  }
});

/**
 * @openapi
 * /products/add:
 *   post:
 *     summary: 'Add a new product'
 *     description: Add a new product to DB
 *     tags: [Products]
 *     parameters:
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Attributes of product to add to DB'
 *       schema:
 *         type: 'object'
 *         properties:
 *               code:
 *                 type: string
 *                 description: Product code
 *                 example: '82'
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Malbec Rosendo
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: Malbec vineyard
 *               category:
 *                 type: string
 *                 description: Product category
 *                 example: Red wine
 *               price:
 *                 type: number
 *                 description: Product price
 *                 example: 550.89
 *               stock:
 *                 type: integer
 *                 description: Product stock
 *                 example: 5
 *               picture:
 *                 type: string
 *                 description: Image URL Product
 *                 example: http://imager.com/1
 *     responses:
 *       200:
 *         description: 'Product created successfully'
 *       403:
 *         description: 'Dont have permission to create this product'
 */

router.post(
  '/add',
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

/**
 * @openapi
 * /products/update/{id}:
 *   put:
 *     summary: 'Update a product'
 *     description: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'Product ID to update'
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Attributes to update the product'
 *       schema:
 *         type: 'object'
 *         properties:
 *           code:
 *             type: string
 *             description: Product code
 *             example: '82'
 *           name:
 *             type: string
 *             description: Product name
 *             example: Malbec Rosendo
 *           description:
 *             type: string
 *             description: Product description
 *             example: Malbec vineyard
 *           category:
 *             type: string
 *             description: Product category
 *             example: Red wine
 *           price:
 *             type: number
 *             description: Product price
 *             example: 550.89
 *           stock:
 *             type: integer
 *             description: Product stock
 *             example: 5
 *           picture:
 *             type: string
 *             description: Image URL Product
 *             example: http://imager.com/1
 *     responses:
 *       200:
 *         description: 'Product updated successfully'
 *       403:
 *         description: 'Dont have permission to update this product'
 */

router.put(
  '/update/:id',
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

/**
 * @openapi
 * /products/delete/{id}:
 *   delete:
 *     summary: 'Delete a product'
 *     description: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'Product ID to delete'
 *     responses:
 *       200:
 *         description: 'Product was successfully deleted'
 *       403:
 *         description: 'You dont have permission to delete this product'
 */

router.delete('/delete/:id', checkAuthentication, isAdmin, async (req, res) => {
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

/**
 * @openapi
 * /products/search/?category={category}&name={name}&code={code}&stockMin={stockMin}&stockMax={stockMax}&priceMin={priceMin}&priceMax={priceMax}:
 *   get:
 *     summary: 'Search products by query'
 *     description: Search products by name, code, category, price and stock
 *     tags: [Products]
 *     parameters:
 *       - in: 'query'
 *         name: page
 *         description: Product category to search
 *       - in: 'query'
 *         name: name
 *         description: Product name to search
 *       - in: 'query'
 *         name: code
 *         description: Product code to search
 *       - in: 'query'
 *         name: stockMin
 *         description: Product stock minimum to search
 *       - in: 'query'
 *         name: stockMax
 *         description: Product stock maximum to search3
 *       - in: 'query'
 *         name: priceMin
 *         description: Product price minimum to search
 *       - in: 'query'
 *         name: priceMax
 *         description: Product price maximum to search
 * 
 *     responses:
 *       200:
 *         description: 'Search ended successfully'
 *       403:
 *         description: 'You dont have permission to delete this product'
 */

router.get('/search', async (req, res) => {
  try {
    const data = await products.search(req.query);
    if (data.length > 0) {
      res.json(data);
    } else {
      throw new Error('Product was not found');
    }
  } catch (error) {
    loggerWarn.warn(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
