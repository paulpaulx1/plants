/* eslint-disable camelcase */
const router = require('express').Router()

const {Product, OrderHistory, Order} = require('../db/models')
module.exports = router

//(CART) retrieve user cart
router.get('/cart', async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Order,
        where: {
          UserId: req.user.id,
          processed: false
        }
      }
    })
    if (cartItems.length === 0) {
      // const error = new Error('API Cart Is Empty')
      // next(error)
    } else {
      res.json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

// const stripe = window.Stripe(process.env.STRIPE_SECRET)

// const YOUR_DOMAIN = 'http://localhost:8888'
// router.post('/createcheckoutsession', async (req, res) => {
// console.log(req)
//   const stripeSession = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Stubborn Attachments',
//             images: ['https://i.imgur.com/EHyR2nP.png']
//           },
//           unit_amount: 2000
//         },
//         quantity: 1
//       }
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`
//   })
//   res.json({id: stripeSession.id})
// })

//ensure it remains as put, increases and decreases quantity inside cart
router.put('/cart/:action', async function(req, res, next) {
  try {
    console.log(req.body)
    const ProductId = req.body.ProductId
    const OrderId = req.body.OrderId
    const orderItem = await OrderHistory.findOne({
      where: {
        ProductId: ProductId,
        OrderId: OrderId
      }
    })
    if (req.params.action === 'add') {
      await orderItem.increment('quantity')
    }
    if (req.params.action === 'remove') {
      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  //ensure that front-end has proper naming convention for id being sent as "ProductId"
  //ensure that front-end has proper naming convention for quantity being sent as "quantity"
  try {
    const currentProduct = await Product.findByPk(req.body.ProductId)
    const currentOrder = await Order.findOrCreate({
      where: {UserId: req.user.id, processed: false}
    })
    await currentOrder[0].addProduct(currentProduct)

    const newProduct = await Product.findByPk(req.body.ProductId, {
      include: {
        model: Order
      }
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        ProductId: req.body.ProductId,
        OrderId: currentOrder[0].id
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
router.delete('/cart/:productId', async (req, res, next) => {
  try {
    const removedProduct = await Product.findByPk(req.params.productId)
    const currentOrder = await Order.findOne({
      where: {UserId: req.user.id, processed: false}
    })
    await currentOrder.removeProduct(removedProduct)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//GET user order history
router.get('/orderHistory', async (req, res, next) => {
  try {
    const oldOrders = await Order.findAll({
      where: {UserId: req.user.id, processed: true},
      include: {model: Product}
    })
    res.json(oldOrders)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  const UserId = req.user.id
  try {
    const currentOrder = await Order.findOne({
      where: {UserId: UserId, processed: false}
    })
    await currentOrder.update({
      processed: true
    })
    res.json(currentOrder)
    const newOrder = await Order.create()
    await newOrder.setUser(UserId)
  } catch (err) {
    next(err)
  }
})
