const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    availableSeat: {
      type: Number,
      // required: true
      default: 10,
    },
    service: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
