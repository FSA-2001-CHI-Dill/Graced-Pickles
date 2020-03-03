const User = require('./user')
const Pickle = require('./pickle')
const Cart = require('./cart')
const Order = require('./order')
const Review = require('./review')

Cart.belongsTo(Pickle)
Pickle.hasMany(Cart)

Cart.belongsTo(User)
User.hasMany(Cart)

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Pickle)
Pickle.hasMany(Review)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Pickle,
  Cart,
  Order,
  Review
}
