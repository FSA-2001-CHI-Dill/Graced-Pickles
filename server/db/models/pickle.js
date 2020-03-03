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
    type: Sequelize.FLOAT,
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
  attributes: {
    type: Sequelize.JSON,
    allowNull: false
  }
  // spiceLevel: {
  //   type: Sequelize.ENUM('mild', 'medium', 'spicy'),
  //   allowNull: false
  // },
  // vegetarian: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: true
  // }
})

module.exports = Pickle
