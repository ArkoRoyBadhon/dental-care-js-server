const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema(
    {
      phone: {
        type: String,
        required: true,
      },
      startDay: {
        type: String,
        required: true,
      },
      endDay: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
    },
    {
      timestamps: true
    },
  )

  module.exports = mongoose.model('PhoneTime', scheduleSchema)