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
    defaultValue:
      'https://www.clipartkey.com/mpngs/m/28-281598_pickle-clipart-full-jar-rick-and-morty-pickle.png'
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
