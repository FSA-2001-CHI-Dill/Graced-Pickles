const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss')
    }
  }
})

module.exports = Review
