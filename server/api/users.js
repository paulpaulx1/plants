const router = require('express').Router()
const {User, Product, OrderHistory, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// api/users/:id
router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  try {
    const thisUser = await User.findByPk(id)
    res.json(thisUser)
  } catch (error) {
    next(error)
  }
})

//(CART) update quantity of product in cart ??? double-check get or put
router.get('/:id/cart/:action', async function(req, res, next) {
  console.log(req.body)
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
router.put('/:id/cart', async (req, res, next) => {
  console.log(req.body)
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
  console.log('req---->', req)
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

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.json(user)
  } catch (ex) {
    next(ex)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findByPk(id)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.update(req.body)
      res.json(user)
    }
  } catch (ex) {
    next(ex)
  }
})
