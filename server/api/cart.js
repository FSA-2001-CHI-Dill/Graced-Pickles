const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else if (req.session.cart) {
      const cartId = req.session.cart
      const orderItems = await OrderItem.findAll({
        where: {
          orderId: cartId
        },
        include: {
          model: Pickle
        }
      })
      res.json(orderItems)
    } else {
      res.status(204).send('No pending order exists')
    }
  } catch (err) {
    next(err)
  }
})

//adding item to cart
router.put('/add', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else if (req.session.cart) {
      const cartId = req.session.cart
      const item = await OrderItem.findAll({
        where: {
          orderId: cartId,
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
          orderId: cartId,
          pickleId: req.body.id,
          price: req.body.price,
          quantity: 1
        })
      }
      const orderItems = await OrderItem.findAll({
        where: {
          orderId: cartId
        },
        include: {
          model: Pickle
        }
      })
      res.json(orderItems)
    } else {
      const order = await Order.create({
        userId: null,
        status: 'created'
      })
      req.session.cart = order.id

      await OrderItem.create({
        orderId: order.id,
        pickleId: req.body.id,
        price: req.body.price,
        quantity: 1
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
    }
  } catch (err) {
    next(err)
  }
})

//removing item from cart
router.put('/remove', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          status: 'created',
          userId: req.user.id
        },
        plain: true
      })

      const item = await OrderItem.findAll({
        where: {
          orderId: order.id,
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

      const orderItems = await OrderItem.findAll({
        where: {
          orderId: order.id
        },
        include: {
          model: Pickle
        }
      })
      res.json(orderItems)
    } else {
      const cartId = req.session.cart
      const item = await OrderItem.findAll({
        where: {
          orderId: cartId,
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

      const orderItems = await OrderItem.findAll({
        where: {
          orderId: cartId
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

router.put('/removeAll', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          status: 'created'
        },
        plain: true
      })
      console.log('order', order)
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
    } else {
      const cartId = req.session.cart
      await OrderItem.destroy({
        where: {
          orderId: cartId,
          pickleId: req.body.id
        }
      })
      const orderItems = await OrderItem.findAll({
        where: {
          orderId: cartId
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
