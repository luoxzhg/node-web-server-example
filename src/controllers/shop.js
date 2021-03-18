const { Router } = require('express')
const shopService = require('../services/shop')
const { createShopFormSchema } = require('../moulds/ShopForm')

class ShopController {

    async init() {
        this.shopService = await shopService()

        const router = Router()
        router.get('/', this.getAll)
        router.get('/:shopId', this.getOne)
        router.put('/:shopId', this.put)
        router.delete('/:shodId', this.delete)
        return router
    }
    // 必须使用箭头函数捕获 this
    getAll = async (req, res) => {
        const {pageIndex, pageSize} = req.query
        console.log(this)
        console.log(this instanceof ShopController)
        const shopList = await this.shopService.find({pageIndex, pageSize})
        res.send({success:true, data: shopList})
    }

    getOne = async (req, res) => {
        const { shopId } = req.params
        const shopList = await this.shopService.find({id: shopId})
        if (shopList.length ) {
            res.send({success: true, data: shopList})
        } else {
            res.status(404).send({success: false, data: null})
        }
    }

    put = async (req, res)=> {
        const { shopId } = req.params
        const { name } = req.query

        try {
            await createShopFormSchema().validate({name})
        } catch (e) {
            res.status(400).send({success: false, message: e.message })
            return
        }

        const shopInfo = await this.shopService.modify({
            id: shopId,
            values: { name }
        })

        if (shopInfo) {
            res.send({success: true, data: null})
        } else {
            res.status(404).send({sucess: false, data: null})
        }
    }

    delete = async (req, res)=> {
        const { id } = req.params
        const success = await this.shopService.remove({id})

        if (!success) {
            res.status(404)
        }
        res.send({success})
    }
}

module.exports = async () => {
    const c = new ShopController()
    return await c.init()
}
