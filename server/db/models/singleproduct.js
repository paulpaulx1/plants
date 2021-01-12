const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    validate: {
      min: 0.01
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  inStock: {
    type: BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: true
  },

  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },

  brand: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
