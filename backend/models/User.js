const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  publicSchedule: Boolean,
  schedule: [{
    user: String,
    className: String,
    dayOfWeek: Number,
    startHour: Number,
    startMinute: Number,
    endHour: Number,
    endMinute: Number,
  }],
})

const User = model('User', userSchema)

module.exports = User
