const mongoose = require('mongoose')

const { Schema, model } = mongoose

const classSchema = new Schema({
  user: String,
  className: String,
  dayOfWeek: String,
  startTime: String,
  endTime: String,
})

const Class = model('Class', classSchema)

module.exports = Class
