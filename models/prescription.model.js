const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  // Thông tin bệnh nhân
  patientName: { type: String, required: true }, // Tên bệnh nhân
  patientPhone: { type: String, required: true }, // Số điện thoại
  patientEmail: { type: String }, // Email (không bắt buộc)
  patientAge: { type: Number, required: true }, // Tuổi bệnh nhân
  patientGender: { type: String, enum: ["Male", "Female", "Other"], required: true }, // Giới tính
  
  // Thông tin bác sĩ
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true }, // ID bác sĩ
  doctorName: { type: String, required: true }, // Tên bác sĩ
  
  // Thông tin thuốc
  medicines: [
  {
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true }, // Liên kết với bảng thuốc
    dosage: { type: String, required: true }, // Liều lượng
    duration: { type: String, required: true }, // Thời gian sử dụng
    notes: { type: String } // Ghi chú thêm
  }
],

  // Thông tin chung
  diagnosis: { type: String, required: true }, // Chẩn đoán bệnh
  prescriptionDate: { type: Date, default: Date.now }, // Ngày kê đơn
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" }, // Trạng thái đơn thuốc
  deleted: {
    type: Boolean,
    default: false // Đơn thuốc bị xóa hay chưa
  },
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model Prescription
const Prescription = mongoose.model("Prescription", prescriptionSchema, "prescriptions");

module.exports = Prescription;
