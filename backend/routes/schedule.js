const express = require('express')

const User = require('../models/User')
const Class = require('../models/Class')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/add', isAuthenticated, async (req, res, next) => {
  const {
    body: {
      className, dayOfWeek, startTime, endTime,
    },
  } = req
  const { session: { username: user } } = req
  try {
    await Class.create({
      user, className, dayOfWeek, startTime, endTime,
    })
    res.send(`class "${className}" posted!`)
    next()
  } catch (e) {
    next(e)
  }
})

router.get('/isloggedin', async (req, res) => {
  if (req.session.username !== undefined) {
    res.json({ loggedIn: true })
  } else {
    res.json({ loggedIn: false })
  }
})

module.exports = router
