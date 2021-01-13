const Sequelize = require('sequelize')
const User = require('./user')
const Product = require('./singleproduct')
const db = require('../db')

const Cart = db.define('Cart', {
  quantity: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    unique: 'user_product'
  },
  productId: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    unique: 'user_product'
  }
})

module.exports = Cart
