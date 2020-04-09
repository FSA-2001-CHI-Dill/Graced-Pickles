const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = OrderItem
