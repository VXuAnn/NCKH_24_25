const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  tokenUser: String,
  avatar: String,
  address: String,
  role_id: {
  type: mongoose.Schema.Types.ObjectId,
  default: new mongoose.Types.ObjectId("67be7c9139a8acc166079989") // Gán mặc định role_id là Patient
  },
  dob: {
    type: Date, // Ngày sinh
    required: true
  },
  gender: {
    type: String, // Giới tính
    enum: ["male", "female"],
    required: true
  },
  statusOnline: {
    type: String,
    default: "online"
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

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;
