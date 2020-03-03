const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'created'
  },
  orderDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order

//if order.status === completed, create orderDate
