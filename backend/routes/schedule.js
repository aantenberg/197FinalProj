const express = require('express')

const User = require('../models/User')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/getClasses', async (req, res, next) => {
  try {
    const { query } = req
    const { username } = query
    const user = await User.findOne({ username })
    const { schedule } = user
    res.json(schedule)
  } catch (e) {
    next(e)
  }
})

router.get('/isPublic', async (req, res, next) => {
  try {
    const { query } = req
    const { username } = query
    const user = await User.findOne({ username })
    const { publicSchedule } = user
    res.json({ publicSchedule })
  } catch (e) {
    next(e)
  }
})

router.post('/setIsPublic', isAuthenticated, async (req, res, next) => {
  try {
    const { body } = req
    const { newBool } = body
    await User.updateOne({ username: req.session.username }, { publicSchedule: newBool })
    res.send('schedule updated')
    next()
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
