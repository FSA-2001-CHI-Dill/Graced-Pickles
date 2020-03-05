const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
module.exports = router

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

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'created'
      },
      plain: true
    })

    const orderItems = await OrderItem.findAll({
      where: {
        orderId: order.id
      },
      include: {
        model: Pickle
      }
    })
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

//adding item to cart
router.put('/add/:userId', async (req, res, next) => {
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
        pickleId: req.body.id
      },
      plain: true
    })
    if (item) {
      await item.update({
        quantity: item.quantity++,
        price: req.body.price
      })
    } else {
      await OrderItem.create({
        orderId: order.id,
        pickleId: req.body.id,
        price: req.body.price,
        quantity: 1
      })
    }
  } catch (err) {
    next(err)
  }
})
