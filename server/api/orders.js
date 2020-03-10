const router = require('express').Router()
const {Pickle, Review, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
const {stripeKey} = require('../../secrets')
const stripe = require('stripe')(
  stripeKey || 'pk_test_ixYHMYf83vAdUAFX2jYPfg9u00Jk5sO3XV'
)

module.exports = router

//fetching all orders
router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [OrderItem]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//fetching all cancelled & completed orders associated with a given user
router.get('/me', requireLogin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        status: ['cancelled', 'completed']
      },
      include: [
        {
          model: OrderItem,
          include: [Pickle]
        }
      ],
      order: [['orderDate', 'DESC']]
    })
    if (orders) {
      res.json(orders)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//fetching single order
router.get('/:orderId', requireLogin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [OrderItem]
    })
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/confirm', requireLogin, async (req, res, next) => {
  try {
    const [, updatedOrder] = await Order.update(
      {
        status: 'completed',
        orderDate: Date.now()
      },
      {
        where: {
          userId: req.user.id
        },
        returning: true,
        plain: true
      }
    )
    if (updatedOrder) {
      res.json(updatedOrder)
    } else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    ;(async () => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'jenny.rosen@example.com'
      })
      res.json(paymentIntent)
    })()
  } catch (err) {
    next(err)
  }
})
