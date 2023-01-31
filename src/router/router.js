const usersController = require('../users/controller.products')
const cartsController = require('../carts/controller.carts')

const router = (app) =>{
    app.use('/api/users',usersController)
    app.use('/api/carts',cartsController)
}

module.exports = router