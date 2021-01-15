const router = require('express').Router()

const {Product, OrderHistory, Order} = require('../db/models')
module.exports = router

//ensure it remains as put, increases and decreases quantity inside cart
router.put('/:id/cart/:action', async function(req, res, next) {
  try {
    const {ProductId, OrderId} = req.body
    const orderItem = await OrderHistory.findOne({
      where: {
        ProductId: ProductId,
        OrderId: OrderId
      }
    })
    if (req.params.action === 'increment') {
      await orderItem.increment('quantity')
    }
    if (req.params.action === 'decrement') {

      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})


//adds to the cart
router.put('/:id/cart', async (req, res, next) => {
  //ensure that front-end has proper naming convention for id being sent as "ProductId"
  //ensure that front-end has proper naming convention for quantity being sent as "quantity"
  try {
    const currentProduct = await Product.findByPk(req.body.ProductId)
    const currentOrder = await Order.findOne({
      where: {UserId: req.params.id, processed: false}
    })
    await currentOrder.addProduct(currentProduct)

    const newProduct = await Product.findByPk(req.body.ProductId, {
      include: {
        model: Order
      }
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        ProductId: req.body.ProductId,
        OrderId: currentOrder.id
      }
    })
    if (req.body.quantity) {
      const newQuantity = req.body.quantity + orderItem.quantity - 1
      await orderItem.update({quantity: newQuantity})
    }
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

//(CART) remove product in cart
router.delete('/:id/cart/:productId', async (req, res, next) => {
  try {
    const removedProduct = await Product.findByPk(req.params.productId)
    const currentOrder = await Order.findOne({
      where: {UserId: req.params.id, processed: false}
    })
    await currentOrder.removeProduct(removedProduct)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//(CART) retrieve user cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Order,
        where: {
          UserId: req.params.id,
          processed: false
        }
      }
    })
    if (cartItems.length === 0) {
      const error = new Error('Your cart is empty')
      next(error)
    } else {
      res.json(cartItems)
    }
  } catch (error) {
    next(error)
  }
})

//GET user order history
router.get('/:id/orderHistory', async (req, res, next) => {
  try {
    const oldOrders = await Order.findAll({
      where: {UserId: req.params.id, processed: true},
      include: {model: Product}
    })
    res.json(oldOrders)
  } catch (error) {
    next(error)
  }
})
