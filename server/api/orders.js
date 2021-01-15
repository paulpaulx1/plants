const router = require('express').Router()
const {User, Product, OrderHistory, Order} = require('../db/models')
module.exports = router

//why is this :action and why is it a get route resolve this
router.get('/:id/cart/:action', async function(req, res, next) {
  console.log(req.body, '<===body params====>', req.params)
  try {
    const {productId, orderId} = req.body
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    if (req.params.action === 'add') {
      await orderItem.increment('quantity')
    }
    if (req.params.action === 'remove') {
      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})

//(CART) add product to cart ?? check the methods
//should this be a post????

//add product to cart route needs to be on the product side
//it also needs to add the item to through table 'order history'
//order history has productid and userid-we use these two ids to
//update the user cart

router.put('/:id/cart', async (req, res, next) => {
  console.log('===========>', req.body.id)
  try {
    const currentProduct = await Product.findByPk(req.body.id)
    const currentOrder = await Order.findOne({
      where: {UserId: req.params.id, processed: false}
    })
    await currentOrder.addProduct(currentProduct)
    const newProduct = await Product.findByPk(req.body.id, {
      include: {
        model: Order
      }
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: req.body.id,
        orderId: currentOrder.id
      }
    })
    if (req.body.quantity) {
      //is this decreasing our inventory?
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
  console.log('req---->', req.body)
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

/////////// ORDER HISTORIES FUNCTIONS AS SHOPPING CART IN DATABASE
