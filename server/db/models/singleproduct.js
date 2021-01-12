const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.NUMBER,
    validate: {
      min: 0.01,
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  inStock: {
    type: Sequelize.BOOLEAN,
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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})
