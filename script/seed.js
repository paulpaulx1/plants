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
      name: "Aglaonema 'Emerald Bay' 10",
      price: 270.95,
      description: 'Large silver and green variegated foliage.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/3990fe0df436e208b87caa9a6b020d2f_5000x.jpg?v=1606091715',
      brand: 'American Apparel'
    }),
    Product.create({
      name: "Aglaonema 'Golden Madonna' 14",
      price: 133.95,
      description: 'Large bright gold and green variegated foliage.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/628fea790b836d98dd30ab0533f7c647_5000x.jpg?v=1607818727',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Aglaonema 10in Silver Bay',
      price: 19.95,
      description:
        'Rich green leaves with silver patterns on a medium-sized bushy plant. Grows a spathe-type inflorescence.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/d2e942f00b2ba58b1b1d1491c944d387_5000x.jpg?v=1596841548',
      brand: 'American Apparel'
    }),
    Product.create({
      name: "Asplenium nidus 2in Crispy Wave Bird's Nest Fern",
      price: 20.5,
      description:
        'Lush, tropical fern that grows wavy sword-shaped fronds from a central rosette.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/c8a0e8a309cb4ec578322452adbe1f41_5000x.jpg?v=1614019345',
      brand: 'American Apparel'
    }),
    Product.create({
      name: "Pachira aquatica 'Money Tree Stump' 14",
      price: 19.95,
      description:
        'Thick central trunk topped with large, five-lobed, glossy green leaves.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/a48beb3560b28a437bbcd947001d5c60_5000x.jpg?v=1606064710',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Chlorophytum comosum 4in Curly Spider Plant',
      price: 44.95,
      description: 'Curly, long, white and green variegated foliage.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/9fe12c7d88c1ffcf137235f29e7c5b10_5000x.jpg?v=1602377251',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Calathea lancifolia 4in Rattlesnake Plant',
      price: 11.95,
      description:
        ' Uniquely patterned foliage with deep purple undersides to long, slender leaves with a slight frill. Rarely flowers indoors, but when it does it has white flowers that appear at the base of the plant.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/eca0c1ae1ebcc1fc4b432c28069fe0f3_5000x.jpg?v=1596842022',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Sansevieria trifasciata 8in Laurentii',
      price: 55.95,
      description:
        ' Long, narrow, thick leaves with yellow margins and mottled green centers that protrude directly from the ground. Flowers rarely, white or cream flowers grow on a long flower stalk.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/ac9ee1764abfd5d2d14bdaa926ae2e6f_5000x.jpg?v=1596841571',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Zebra Cactus (Haworthia Zebrina) 4in',
      price: 29.95,
      description:
        'Stiff, pointed dark green leaves with white stripes grow in a rosette. Flowers are white-pink, tubular, and grow on long stalks.',
      inStock: true,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/977092340befeca140b83a2a044553f1_5000x.jpg?v=1596913494',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Pilea peperomioides 4in Chinese Money Plant',
      price: 190.95,
      description:
        'Bright green circular leaves that emanate from a central stem. Grows pups under its leaves. Rarely flowers, but can grow white spikes with groups of small blooms.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/825dc03589bfb8563bd0edab31a2fbe6_5000x.jpg?v=1596841606',
      brand: 'American Apparel'
    }),
    Product.create({
      name: "Euphorbia ingens 'Candelabra Tree' 14",
      price: 190.95,
      description:
        'Succulent plant that features cactus-like, segmented arms growing from a single trunk.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/975a571e8969468a64fe2e1bd574cd80_5000x.jpg?v=1606064286',
      brand: 'American Apparel'
    }),
    Product.create({
      name: 'Ficus microcarpa 14in Moclame Standard',
      price: 190.95,
      description: 'Thick, rounded green leaves form a tree-shaped houseplant.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0004/9948/2668/products/3f960a0c0b8ea634fba355312ca99e43_5000x.jpg?v=1607817291',
      brand: 'American Apparel'
    })
  ])

  const generateOrders = () => {
    let orders = []
    for (let i = 0; i < users.length; i++) {
      orders.push(
        Order.create({
          processed: false,
          UserId: i + 1
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
