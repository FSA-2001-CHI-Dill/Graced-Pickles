const router = require('express').Router()
const {Pickle, Review, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
const {stripeKey} = require('../../secrets')
const stripe = require('stripe')(stripeKey)
const uuid = require('uuid/v4')

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
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: OrderItem,
          include: [Pickle]
        }
      ]
    })
    console.log(order)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
    console.log(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/success', requireLogin, async (req, res, next) => {
  try {
    const [, updatedOrder] = await Order.update(
      {
        status: 'completed',
        orderDate: Date.now()
      },
      {
        where: {
          userId: req.user.id,
          id: req.params.orderId
        },
        returning: true,
        plain: true
      }
    )

    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/fail', requireLogin, async (req, res, next) => {
  try {
    const [, updatedOrder] = await Order.update(
      {
        status: 'cancelled',
        orderDate: Date.now()
      },
      {
        where: {
          userId: req.user.id,
          id: req.params.orderId
        },
        returning: true,
        plain: true
      }
    )

    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/checkout', requireLogin, async (req, res, next) => {
  try {
    const {total, token} = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotencyKey = uuid()

    const result = await stripe.charges.create(
      {
        amount: total * 100,
        currency: 'usd',
        customer: customer.id,
        description: 'Purchased graced pickles',
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        },
        receipt_email: token.email
      },
      {idempotencyKey}
    )
    if (result) res.status(200).json(result)
    else res.sendStatus(400)
  } catch (err) {
    next(err)
  }
})
