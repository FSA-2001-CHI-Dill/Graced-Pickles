const router = require('express').Router()
const {Pickle, Review} = require('../db/models')
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
