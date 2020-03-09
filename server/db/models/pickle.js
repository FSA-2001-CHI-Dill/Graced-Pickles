const Sequelize = require('sequelize')
const db = require('../db')

const Pickle = db.define('pickle', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validation: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://i.ya-webdesign.com/images/pickle-rick-dab-png-2.png'
  },
  spiceLevel: {
    type: Sequelize.ENUM('mild', 'medium', 'spicy'),
    allowNull: false
  },
  vegetarian: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Pickle
