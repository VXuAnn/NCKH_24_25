const md5 = require("md5");
const jwt = require("jsonwebtoken");
const Patient = require("../../models/patient.model");
const Account =require("../../models/account.model");
const Doctor = require("../../models/doctor.model");

const generateHelper = require("../../helpers/generate.helper");

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  let user = await Patient.findOne({ email, deleted: false }) ||
             await Doctor.findOne({ email, deleted: false }) ||
             await Account.findOne({ email, deleted: false });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    return res.redirect("back");
  }
  // Ghi log tài khoản đăng nhập
  console.log("Tài khoản đăng nhập:", user);

  // Kiểm tra mật khẩu
  if (md5(password) !== user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect(req.get("Referrer") || "/");
  }

  // Kiểm tra trạng thái tài khoản
  if (user.status !== "active") {
    req.flash("error", "Tài khoản đang bị khóa!");
    return res.redirect("back");
  }
    // Tạo JWT token
  const token = jwt.sign({ id: user._id, role: user.role_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // Lưu token vào cookie (httpOnly để tránh bị tấn công XSS)
  res.cookie("tokenUser", token, { httpOnly: true, secure: false });
  // // Lưu token vào cookie
  // res.cookie("tokenUser", user.tokenUser || user.token);

  // Cập nhật trạng thái online
  await user.updateOne({ statusOnline: "online" });

  // Điều hướng theo `role_id`
  if (user.role_id == "67be7c9139a8acc166079989") {
    req.flash("success", "Đăng nhập thành công!");
    return res.redirect("/user/profile");
  } else if (user.role_id == "67b683335162f6814aedbce6") {
    req.flash("success", "Đăng nhập thành công!");
    return res.redirect("/doctor/patient");
  } else if (user.role_id == "67b683335162f6814aedbce5") {
    req.flash("success", "Đăng nhập thành công!");
    return res.redirect("/admin/dashboard");
  } else {
    req.flash("error", "Vai trò không hợp lệ!");
    return res.redirect("back");
  }
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  try {
    await Patient.updateOne({
      _id: res.locals.user.id
    }, {
      statusOnline: "offline"
    });
  } catch(e) {
    console.log(e);
  }
  res.clearCookie("tokenUser");
  res.redirect("/user/login");
};


// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await Patient.findOne({
    email: req.body.email,
    deleted: false
  });

  if(existUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  const userData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: md5(req.body.password), 
    tokenUser: generateHelper.generateRandomString(30),
    avatar: "",
    address: req.body.address,
    dob: req.body.dob, 
    gender: req.body.gender, 
  };

  const user = new Patient(userData);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  req.flash("success", "Đăng ký tài khoản thành công!");
  res.redirect("/user/login");
};


// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
};

