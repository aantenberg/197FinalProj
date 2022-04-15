const express = require('express')

const User = require('../models/User')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/getClasses', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const { schedule } = user
    res.json(schedule)
  } catch (e) {
    next(e)
  }
})

router.post('/clearClasses', isAuthenticated, async (req, res, next) => {
  try {
    await User.updateOne({ username: req.session.username }, { schedule: [] })
    res.send('classes cleared')
  } catch (e) {
    next(e)
  }
})

router.post('/addClass', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { classToAdd } = body
  try {
    await User.updateOne({ username: req.session.username }, { $push: { schedule: classToAdd } })
    res.send(`class ${classToAdd.className} added to ${req.session.username}'s schedule!`)
  } catch (e) {
    next(e)
  }
})

module.exports = router
