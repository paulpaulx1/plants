const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

//GET specifc cart
router.get('/:cartid', async (req, res, next) => {
  try {
    const productsInCart = await Cart.findByPk(req.params.cartid)
    res.json(productsInCart)
  } catch (err) {
    next(err)
  }
})
