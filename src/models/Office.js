const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema(
    {
      url: {
        type: String,
        required: true,
      },
      uploadedBy: {
        type: String,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    },
  )

  module.exports = mongoose.model('Office', officeSchema)