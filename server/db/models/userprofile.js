const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('userprofile', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  paymentInfo: {
    type: Sequelize.INTEGER,
    validate: {
      isCreditCard: true
    }
  }
  //   orderHistory: {

  //   }
})
