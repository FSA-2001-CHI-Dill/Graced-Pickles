/* eslint-disable complexity */
const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

// eslint-disable-next-line complexity
// eslint-disable-next-line max-statements
// eslint-disable-next-line complexity
// eslint-disable-next-line max-statements
// eslint-disable-next-line complexity
// eslint-disable-next-line max-statements
router.get('/', async (req, res, next) => {
  try {
    if (req.user && !req.session.cart) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        }
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
    } else if (req.user && req.session.cart) {
      const userOrder = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        }
      })
      if (!userOrder) {
        const guestOrder = await Order.findOne({
          where: {
            id: req.session.cart
          }
        })
        await guestOrder.update({
          userId: req.user.id
        })
        const orderItems = await OrderItem.findAll({
          where: {
            orderId: guestOrder.id
          },
          include: {
            model: Pickle
          }
        })
        res.json(orderItems)
      } else {
        const guestOrder = await Order.findOne({
          where: {
            id: req.session.cart
          }
        })
        await guestOrder.update({
          userId: req.user.id
        })
        const userOrderItems = await OrderItem.findAll({
          where: {
            orderId: userOrder.id
          }
        })
        const guestOrderItems = await OrderItem.findAll({
          where: {
            orderId: guestOrder.id
          }
        })
        for (let i = 0; i < userOrderItems.length; i++) {
          for (let j = 0; j < guestOrderItems.length; j++) {
            if (userOrderItems[i].pickleId === guestOrderItems[j].pickleId) {
              // eslint-disable-next-line max-depth
              if (userOrderItems[i].quantity > guestOrderItems[j].quantity) {
                guestOrderItems[i].destroy()
              } else {
                userOrderItems[i].destroy()
              }
            }
          }
        }
        await OrderItem.bulkUpdate(
          {orderId: guestOrder.id},
          {
            where: {
              orderId: userOrder.id
            }
          }
        )
        const orderItems = await OrderItem.findAll({
          where: {
            orderId: guestOrder.id
          },
          include: {
            model: Pickle
          }
        })
        res.json(orderItems)
      }
    } else if (!req.user && req.session.cart) {
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
      const order = await Order.findOne({
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
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        }
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
