
const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(

  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    date: {
      type: Date,
      required: true
    },
    isconfirmed: {
      type: Boolean,
      default:false

    }
  
  },

  { timestamps: true }

);

module.exports = mongoose.model("Appointment", AppointmentSchema);
