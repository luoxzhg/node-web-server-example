const { Router } = require('express')
const ShopController = require('./shop')

module.exports = async () => {
    const router = Router()
    router.use('/api/shop', await ShopController())
    return router
}
