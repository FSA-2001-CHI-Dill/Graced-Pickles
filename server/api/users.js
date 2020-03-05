const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

// for any /users/:userId routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('userId', async (req, res, next, userId) => {
  try {
    const user = await User.findByPk(userId)
    if (!user) throw Error
    req.requestedUser = user
    next()
    return null
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // REVIEW: does user creation already exist in boilermaker?
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  //if (req.user && req.user.id === req.requestedUser.uid) {
    try {
      const user = await req.requestedUser.reload({
        include: {
          model: Order
        }
      })
      res.json(user)
    } catch (err) {
      next(err)
    }
  //}
})

// REVIEW: missing param ":"
router.put('/userId', async (req, res, next) => {
  try {
    // REVIEW: req.body danger zone
    const user = await req.requestedUser.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// REVIEW: authorization patterns
router.delete('/:userId', async (req, res, next) => {
  try {
    await req.requestedUser.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await req.requestedUser.reload({
      include: {
        model: Order,
        include: {
          model: OrderItem
        }
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//adding item to cart
//req.body has three keys: pickleId, price, quantity
// REVIEW: use session to get userId req.session.user is trustworthy
// PUT /api/cart
router.put('/:userId/cart/add', async (req, res, next) => {
  try {
    const [order, created] = await Order.findOrCreate({
      where: {
        status: 'created',
        userId: req.params.userId
      }
    })
    const item = await OrderItem.findAll({
      where: {
        orderId: order.id,
        pickleId: req.body.pickleId
      },
      plain: true
    })
    if (item) {
      await item.update({
        quantity: item.quantity + req.body.quantity,
        // REVIEW: don't trust customers to tell us the price
        price: req.body.price
      })
    } else {
      await OrderItem.create({
        orderId: order.id,
        pickleId: req.body.pickleId,
        price: req.body.price,
        quantity: req.body.quantity
      })
    }

    // REVIEW: what data should this return?
    const user = await req.requestedUser.reload({
      include: {model: Order, include: {model: OrderItem}}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
