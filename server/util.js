const {Pickle, User, Order, OrderItem} = require('./db/models')

function requireLogin(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Please authenticate')
  }
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(404).send('Not found')
  }
}

// function orderMiddleware(req, res, next) {
//   if (req.user) {
//     req.getOrder = async () => {
//       const [order] = await Order.findOrCreate({
//         where: {
//           status: 'created',
//           userId: req.user.id
//         }
//       })
//       next()
//     }
//   } else {
//     req.session.cart ?
//     if not, create an order, userId = null;
//     add that orderId to req.session.cart
//     add order items with that orderId

//     if it exists,
//     grab orderId (through req.session.cart), go to order items, find order by orderId and add items
//   }
// }

module.exports = {requireLogin, requireAdmin}
