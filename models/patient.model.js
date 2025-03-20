const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  tokenUser: String,
  avatar: String,
  address: String,
  dateOfBirth: {
    type: Date, // Ngày sinh
    required: true
  },
  gender: {
    type: String, // Giới tính
    enum: ["male", "female"],
    required: true
  },
  status: {
    type: String,
    default: "active"
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment" // Liên kết với lịch hẹn của bệnh nhân
  }],
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema, "users");

module.exports = Patient;
