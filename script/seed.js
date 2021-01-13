'use strict'
const faker = require('faker')

const db = require('../server/db')
const {User} = require('../server/db/models/')
const {Product} = require('../server/db/models/')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  function generateUsers() {
    let users = []

    for (let id = 1; id <= 100; id++) {
      users.push(
        User.create({
          name: faker.name.findName(),
          email: faker.internet.email(),
          address:
            faker.address.streetAddress() +
            ', ' +
            faker.address.city() +
            ', ' +
            faker.address.stateAbbr() +
            ', ' +
            faker.address.zipCode(),
          password: '123',
          paymentInfo:
            faker.finance.creditCardNumber() +
            ', CVV ' +
            faker.finance.creditCardCVV()
        })
      )
    }

    return users
  }

  const users = await Promise.all(generateUsers())

  const products = await Promise.all([
    Product.create({
      name: 'Shark Hat',
      price: 19.95,
      description: 'CHOMP CHOMP',
      inStock: true,
      imageUrl:
        'https://www.villagehatshop.com/photos/product/giant/4511390S75022/-/size-one-size-fits-most.jpg',
      brand: 'American Apparel'
    })
  ])
  //https://www.villagehatshop.com/photos/product/giant/4511390S75022/-/size-one-size-fits-most.jpg
  //https://wwf.hats2020s.com/i.php?https://images-na.ssl-images-amazon.com/images/I/71co9uaR6FL._AC_UX342_.jpg
  //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQ2QJfHUIWdsnchlPU7fbL2Z-3guOmWrzBD2ZLKRexgJ5ghsdwKoq_yr9QW7WA4qCBR2LMCsj&usqp=CAc
  //https://www.villagehatshop.com/photos/product/standard/4511390S836292/-/size-one-size-fits-most.jpg
  //https://cdn11.bigcommerce.com/s-a4990/images/stencil/1280x1280/products/1227/5550/DA2936-blk__59368.1541617592.jpg?c=2
  //https://wwf.hats2020s.com/i.php?https://www.villagehatshop.com/photos/product/giant/4511390S55459/alt/55459.jpg
  //https://wwf.hats2020s.com/i.php?https://www.villagehatshop.com/photos/product/giant/4511390S77663/-/size-one-size-fits-most.jpg

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
