const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor"
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Format: HH:mm
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
