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

module.exports = {requireLogin, requireAdmin}
