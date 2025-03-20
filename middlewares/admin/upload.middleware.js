const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Cấu hình lưu file vào thư mục public/assets/img/doctor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/assets/img/doctor";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file tránh trùng lặp
  }
});

const upload = multer({ storage });

module.exports = upload;
