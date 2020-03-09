const router = require('express').Router()
const {Pickle, Review} = require('../db/models')
const {requireAdmin} = require('../util')
module.exports = router

//fetching all pickles
router.get('/', async (req, res, next) => {
  try {
    const pickles = await Pickle.findAll()
    res.json(pickles)
  } catch (err) {
    next(err)
  }
})

//fetching single pickle
router.get('/:pickleId', async (req, res, next) => {
  try {
    const pickle = await Pickle.findByPk(req.params.pickleId, {
      include: [Review]
    })
    res.json(pickle)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const pickle = await Pickle.create(req.body)
    res.json(pickle)
  } catch (err) {
    next(err)
  }
})

router.put('/:pickleId', requireAdmin, async (req, res, next) => {
  try {
    const [, updaptedPickle] = await Pickle.update(req.body, {
      where: {
        id: req.params.pickleId
      },
      returning: true,
      plain: true
    })
    if (updaptedPickle) {
      const pickle = await Pickle.findByPk(req.params.pickleId, {
        include: [{model: Review}]
      })
      res.json(pickle)
    } else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:pickleId', async (req, res, next) => {
  try {
    await Pickle.destroy({
      where: {
        id: req.params.pickleId
      }
    })
    const pickles = await Pickle.findAll()
    res.json(pickles)
  } catch (err) {
    next(err)
  }
})
