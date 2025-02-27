const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, // Tên thuốc
  type: { 
    type: String, 
    required: true 
  }, // Loại thuốc (viên uống, kem bôi, dung dịch, v.v.)
  price: { 
    type: Number, 
    required: true 
  }, // Giá thuốc
  stock: { 
    type: Number, 
    required: true 
  }, // Số lượng tồn kho
  deleted: {
    type: Boolean,
    default: false // Thuốc có bị xóa không (xóa mềm - soft delete)
  },
  status: String,
}, {
  timestamps: true // Tự động thêm `createdAt` và `updatedAt`
});

// Tạo model Medicine
const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

module.exports = Medicine;
