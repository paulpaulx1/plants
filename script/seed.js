'use strict'
const faker = require('faker')

const db = require('../server/db')
const {User} = require('../server/db/models/')
const {Product, Order} = require('../server/db/models/')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: false}),
    User.create({email: 'murphy@email.com', password: '123', isAdmin: false}),
    User.create({email: 'admin@email.com', password: '123', isAdmin: true})
  ])

  // function generateUsers() {
  //   let users = []

  //   for (let id = 1; id <= 100; id++) {
  //     users.push(
  //       User.create({
  //         name: faker.name.findName(),
  //         email: faker.internet.email(),
  //         address:
  //           faker.address.streetAddress() +
  //           ', ' +
  //           faker.address.city() +
  //           ', ' +
  //           faker.address.stateAbbr() +
  //           ', ' +
  //           faker.address.zipCode(),
  //         password: '123',
  //         paymentInfo:
  //           faker.finance.creditCardNumber() +
  //           ', CVV ' +
  //           faker.finance.creditCardCVV()
  //       })
  //     )
  //   }

  //   return users
  // }

  // const users = await Promise.all(generateUsers())

  const products = await Promise.all([
    Product.create({
      name: 'Shark Hat',
      price: 19.95,
      description: 'CHOMP CHOMP',
      inStock: true,
      imageUrl:
        'https://www.villagehatshop.com/photos/product/giant/4511390S75022/-/size-one-size-fits-most.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Big Tophat',
      price: 19.95,
      description: 'Nice.',
      inStock: true,
      imageUrl:
        'https://wwf.hats2020s.com/i.php?https://images-na.ssl-images-amazon.com/images/I/71co9uaR6FL._AC_UX342_.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Weird Balaklava',
      price: 19.95,
      description: 'Stay back',
      inStock: true,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQ2QJfHUIWdsnchlPU7fbL2Z-3guOmWrzBD2ZLKRexgJ5ghsdwKoq_yr9QW7WA4qCBR2LMCsj&usqp=CAc',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'King Cobra',
      price: 19.95,
      description: 'Hssssssssssssssss',
      inStock: true,
      imageUrl:
        'https://www.villagehatshop.com/photos/product/standard/4511390S836292/-/size-one-size-fits-most.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Dire Wolf',
      price: 19.95,
      description: 'Dont murder me',
      inStock: true,
      imageUrl:
        'https://wwf.hats2020s.com/i.php?https://www.villagehatshop.com/photos/product/giant/4511390S55459/alt/55459.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Spanish Plague Doctor',
      price: 19.95,
      description: 'Timely!',
      inStock: true,
      imageUrl:
        'https://wwf.hats2020s.com/i.php?https://www.villagehatshop.com/photos/product/giant/4511390S77663/-/size-one-size-fits-most.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Angler Fish',
      price: 19.95,
      description: 'From the deep',
      inStock: true,
      imageUrl:
        'https://www.villagehatshop.com/photos/product/giant/4511390S438707/-/size-one-size-fits-most.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Parrot Head',
      price: 19.95,
      description: 'Jamaica Mistake-a',
      inStock: true,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51B-vCTFIxL._AC_.jpg',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Squid Hat',
      price: 19.95,
      description: 'Release the Kraken',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1706/5935/products/f9ced1926bc8d46dd2a12b11302c93be_1024x1024.jpg?v=1571710069',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Biker Boi',
      price: 19.95,
      description: 'Yes sir',
      imageUrl:
        'https://cdn.shoplightspeed.com/shops/608600/files/27491685/700x700x2/leather-man-garrison-pisscutter-leather-cap.jpg',
      brand: 'American Apparel'
    })
  ])

  const generateOrders = () => {
    let orders = []
    for (let i = 0; i < 50; i++) {
      orders.push(
        Order.create({
          processed: false
        })
      )
    }
    return orders
  }

  const orders = await Promise.all(generateOrders())

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
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
