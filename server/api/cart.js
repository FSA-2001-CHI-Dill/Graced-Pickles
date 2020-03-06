const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

router.get('/', requireLogin, async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.user.id,
        status: 'created'
      },
      plain: true
    })

    if (!order) {
      res.status(204).send('No pending order exists')
    } else {
      const orderItems = await OrderItem.findAll({
        where: {
          orderId: order.id
        },
        include: {
          model: Pickle
        }
      })
      res.json(orderItems)
    }
  } catch (err) {
    next(err)
  }
})

//adding item to cart
router.put('/add', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        status: 'created',
        userId: req.user.id
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
        quantity: item.quantity + 1,
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

//removing item from cart
router.put('/remove', async (req, res, next) => {
  try {
    const item = await OrderItem.findAll({
      where: {
        pickleId: req.body.id
      },
      plain: true
    })
    await item.update({
      quantity: item.quantity - 1
    })

    if (item.quantity === 0) {
      await item.destroy()
    }

    const order = await Order.findAll({
      where: {
        userId: req.user.id,
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
