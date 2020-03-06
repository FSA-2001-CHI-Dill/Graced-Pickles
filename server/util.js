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
//     req.getOrder = async () =>
//       await Order.findOrCreate({where: {
//         userId: req.user.id,
//         status: 'created'
//     }})
//     next()
//   } else {
//     req.getOrder = async () =>
//       await Order.findOrCreate({where: {sessionId: req.session.id}})
//     next()
//   }
// }

module.exports = {requireLogin, requireAdmin}
