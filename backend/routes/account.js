const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    await User.create({
      username, password, publicSchedule: false, schedule: [],
    })
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

// router.post('/addClass', isAuthenticated, async (req, res, next) => {
//   const { body } = req
//   const { classToAdd } = body
//   try {
//     await User.updateOne({ username: req.session.username }, { $push: { schedule: classToAdd } })
//     res.send(`class ${classToAdd.className} added to ${req.session.username}'s schedule!`)
//   } catch (e) {
//     next(e)
//   }
// })

// router.get('/getClasses', isAuthenticated, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.session.username })
//     const { schedule } = user
//     res.json(schedule)
//   } catch (e) {
//     next(e)
//   }
// })

// router.post('/clearClasses', isAuthenticated, async (req, res, next) => {
//   try {
//     await User.updateOne({ username: req.session.username }, { schedule: [] })
//     res.send('classes cleared')
//   } catch (e) {
//     next(e)
//   }
// })

router.get('/isloggedin', async (req, res) => {
  if (req.session.username !== undefined) {
    res.json({ loggedIn: true })
  } else {
    res.json({ loggedIn: false })
  }
})

module.exports = router
