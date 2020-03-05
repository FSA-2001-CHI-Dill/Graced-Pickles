const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    // REVIEW: discuss INTEGER type
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = OrderItem
