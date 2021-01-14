const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
