const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    await User.create({ username, password })
    req.session.username = username
    res.send('user creation was successful')
    next()
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    const user = await User.findOne({ username, password })
    if (user === null) {
      next(new Error('no user'))
    } else {
      const { username: newUsername } = user
      req.session.username = newUsername
      res.send(`logged in as ${req.session.username}`)
      next()
    }
  } catch (e) {
    next(e)
  }
})

router.post('/logout', isAuthenticated, async (req, res, next) => {
  try {
    req.session.username = undefined
    res.send('logged out')
    next()
  } catch (e) {
    next(e)
  }
})

router.get('/username', async (req, res) => {
  res.json({ name: req.session.username })
})

module.exports = router
