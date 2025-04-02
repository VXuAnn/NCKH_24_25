const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "Patient",
      required: true,
    },
    doctor_id: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    facility_id: {
      type: String,
      ref: "Facility",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    patientInfo: {
      fullName: String,
      dateOfBirth: String,
      gender: String,
      phone: String,
      email: String
    }
  },
  { timestamps: true } 
);

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;
