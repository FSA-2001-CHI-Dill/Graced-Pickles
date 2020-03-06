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
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const user = await req.requestedUser.reload({
//       include: {
//         model: Order
//       }
//     })
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:userId', async (req, res, next) => {
//   try {
//     const user = await req.requestedUser.update(req.body)
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/:userId', async (req, res, next) => {
//   try {
//     await req.requestedUser.destroy()
//     res.status(204).end()
//   } catch (err) {
//     next(err)
//   }
// })
