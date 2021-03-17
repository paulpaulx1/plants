/* eslint-disable camelcase */
const stripe = require('stripe')(
  'sk_test_51I9W62HLAzF5yr08Fk4Qtp292ucSrE06mrO76ktllgHfafenX8Il6IGVJmBcKkkJCRRyUDEsyvf9aKqgY5uTK6my00YBybUCzT'
)
const express = require('express')
const app = express()
app.use(express.static('.'))
const YOUR_DOMAIN = 'http://localhost:8888'
app.post('/createcheckoutsession', async (req, res) => {
  console.log('here')
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png']
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`
  })
  res.json({id: session.id})
})

module.exports = app
