const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jSDoc');
const productRouter = require('./products.routes');
const chatRouter = require('./chat.routes')
const authRouter = require('./auth.routes');
const orderRouter = require('./orders.routes');
const cartRouter = require('./cart.routes');
const checkAuthentication = require('../app/middlewares/checkAuthentication');
const viewsRouter = require('./views.routes');
const specs = require('../docs/specs')

const routerAPI = (app) => {
  app.use('/products', productRouter);
  app.use('/cart', checkAuthentication, cartRouter);
  app.use('/chat', chatRouter);
  app.use('/orders', checkAuthentication, orderRouter);
  app.use('/auth', authRouter);
  app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(specs)))
  app.use('/views', viewsRouter);
};

module.exports = routerAPI;
