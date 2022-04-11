const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const ScheduleRouter = require('./routes/schedule')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://aanten:XqZ5xAD57%40Zx3X8@cluster0.t4t2q.mongodb.net/197FinalProjDatabase?retryWrites=true&w=majority'
app.use(cookieSession({
  name: 'session',
  keys: ['username'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

app.use(express.json())

app.use(express.static('dist')) // set the static folder

app.use('/account', AccountRouter)
app.use('/schedule', ScheduleRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(3000, () => {

})
