const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient",
    required: true
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", 
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled"
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;
