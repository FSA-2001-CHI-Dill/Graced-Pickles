const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

//TODO ADD requireAdmin BACK INTO ROUTEß
router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'nickname', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', requireAdmin, async (req, res, next) => {
  try {
    await User.update(
      {isAdmin: true},
      {
        where: {
          id: req.body.id
        }
      }
    )
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/', requireAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.body.id
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
