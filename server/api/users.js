const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
const {requireLogin, requireAdmin} = require('../util')
module.exports = router

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'nickname', 'isAdmin'],
      order: [['id', 'ASC']]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    await User.update(
      {isAdmin: true},
      {
        where: {
          id: req.params.id
        }
      }
    )
    const data = await User.findAll({order: [['id', 'ASC']]})
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    const data = await User.findAll({order: [['id', 'ASC']]})
    res.json(data)
  } catch (err) {
    next(err)
  }
})
