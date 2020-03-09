'use strict'
const faker = require('faker')

const db = require('../server/db')
const {Order, Pickle, User, Review, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const createData = async (numOfEntries, create) => {
    for (let i = 0; i < numOfEntries; i++) {
      try {
        await create()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const users = async numOfEntries => {
    await createData(numOfEntries, async () => {
      await User.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    })
  }

  const pickles = async numOfEntries => {
    await createData(numOfEntries, async () => {
      await Pickle.create({
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: faker.random.number({min: 100, max: 10000}),
        inventory: faker.random.number(),
        vegetarian: faker.random.boolean(),
        spiceLevel: ['mild', 'medium', 'spicy'][Math.floor(Math.random() * 3)]
      })
    })
  }

  try {
    await users(100)
    await pickles(100)
    // await orders(100)
    // await orderItems(100)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
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
