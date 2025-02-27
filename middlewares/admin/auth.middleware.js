
const Account = require("../../models/account.model");
const Patient = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.tokenUser;
  
  if (!token) {
    res.locals.user = null; // Không có user đăng nhập
    return next();
  }

  // Tìm người dùng theo token
  let user = await Patient.findOne({ token }) ||
             await Doctor.findOne({ token }) ||
             await Account.findOne({ token });

  if (!user) {
    res.locals.user = null;
    return next();
  }

  // Lưu thông tin người dùng vào `res.locals`
  res.locals.user = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role_id: user.role_id,
    avatar: user.avatar
  };

  next();
};
