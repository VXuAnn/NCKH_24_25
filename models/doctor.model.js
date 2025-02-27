const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  tokenUser: String,
  avatar: String,
  gender: Boolean,
  address: String,
  degree: String,
  birthday: Date,
  qualification: String,
  role_id: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  specialization: {
    type: String,
    required: true
  },
  workPlace: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment" // Liên kết với lịch hẹn của bác sĩ
  }]
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");

module.exports = Doctor;
