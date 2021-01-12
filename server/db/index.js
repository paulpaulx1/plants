const db = require('./db')

// register models
const User = require('./models/user')
const Product = require('./models/singleproduct')

module.exports = {db, Product, User}
