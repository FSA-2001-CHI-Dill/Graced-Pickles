const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', (req, res, next) => {
  res.send(req.user)
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    const sessionOrder = await Order.findOne({ /* by session id */ })
    const userOrder = user./* get current cart */
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

//util.js
function requireLogin (req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.status(401).send("Please authenticate")
  }
}

function requireAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  }
  else {
    res.status(404).send("Not found")
  }
}

router.get('/my-orders', requireLogin, async (req, res) => {
    res.json(await req.user.getOrders())
})

router.use('/google', require('./google'))
