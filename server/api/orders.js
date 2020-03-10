const router = require('express').Router()
const {Pickle, Review, Order, OrderItem} = require('../db/models')
const {requireAdmin} = require('../util')
module.exports = router

//fetching all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [OrderItem]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
