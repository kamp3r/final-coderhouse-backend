const productRouter = require('./products.routes')
const authRouter = require('./auth.routes')
const chatRouter = require('./chat.routes')
const orderRouter = require('./orders.routes')
const cartRouter = require('./cart.routes')
const checkAuthentication = require('../app/middlewares/checkAuthentication');
const viewsRouter = require('./views.routes')

const routerAPI = (app) =>{
    app.use('/productos', productRouter)
    app.use('/carrito',checkAuthentication, authRouter)
    app.use('/ordenes',checkAuthentication, orderRouter)
    app.use('/auth', cartRouter)
    app.use('/', viewsRouter)
    app.use(chatRouter)
}

module.exports = routerAPI