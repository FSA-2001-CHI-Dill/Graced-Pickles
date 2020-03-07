const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let order
    if (req.user) {
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        }
      })
    } else if (req.session.cart) {
      order = await Order.findOne({
        where: {
          id: req.session.cart
        }
      })
    }
    if (!order) {
      res.status(204).send('No pending order exists')
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

//adding or removing item to/from cart
router.put('/update', async (req, res, next) => {
  try {
    let order
    if (req.user) {
      ;[order] = await Order.findOrCreate({
        where: {
          status: 'created',
          userId: req.user.id
        }
      })
    } else if (req.session.cart) {
      order = await Order.findByPk(req.session.cart)
    } else {
      order = await Order.create({
        userId: null
      })
      req.session.cart = order.id
    }

    const item = await OrderItem.findOne({
      where: {
        orderId: order.id,
        pickleId: req.body.pickle.id
      }
    })

    if (item) {
      await item.update({
        quantity: item.quantity + req.body.qty,
        price: req.body.pickle.price
      })
      if (item.quantity === 0) {
        await item.destroy()
      }
    } else {
      await OrderItem.create({
        orderId: order.id,
        pickleId: req.body.pickle.id,
        price: req.body.pickle.price,
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

router.put('/removeAll', async (req, res, next) => {
  try {
    let order
    if (req.user) {
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        }
      })
    } else {
      order = await Order.findOne({
        where: {
          id: req.session.cart
        }
      })
    }
    await OrderItem.destroy({
      where: {
        orderId: order.id,
        pickleId: req.body.id
      }
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
