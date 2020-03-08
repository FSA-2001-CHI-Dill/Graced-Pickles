/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
const router = require('express').Router()
const {Pickle, User, Order, OrderItem} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
      //it seems that we have to run the req.login (line 17) first, in order to get req.user.id for guestToUser function
      guestToUser(req, res, next)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
    guestToUser(req, res, next)
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

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

//helper function that merges items in guest cart to user's cart once guest logs in
async function guestToUser(req, res, next) {
  if (req.session.cart) {
    const userOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'created'
      }
    })
    const guestOrderItems = await OrderItem.findAll({
      where: {
        orderId: req.session.cart
      }
    })
    if (userOrder) {
      //if user cart also has items..
      const userOrderItems = await OrderItem.findAll({
        where: {
          orderId: userOrder.id
        }
      })
      let userOrderItemsbyIdx = {}
      userOrderItems.map(item => {
        userOrderItemsbyIdx[item.pickleId] = item
      })
      //finding duplicate items in user cart & guest cart
      for (let i = 0; i < guestOrderItems.length; i++) {
        let item = guestOrderItems[i]
        let duplicate = userOrderItemsbyIdx[item.pickleId]
        if (duplicate) {
          await duplicate.update({
            qty: Math.max(duplicate.qty, item.qty)
          })
          await item.destroy()
        } else {
          await item.update({
            orderId: userOrder.id
          })
        }
      }
    } else {
      //if user cart doesn't have items (i.e., userOrder = null)
      await Order.update({userId: req.user.id}, {where: {id: req.session.cart}})
    }
  }
}
