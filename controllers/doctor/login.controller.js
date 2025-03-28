const Doctor = require("../../models/doctor.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

// [GET] /admin/profile
module.exports.index = async (req, res) => {
  res.render("doctor/pages/login/login", {
    pageTitle: "Login"
  });
}

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const doctor = await Doctor.findOne({
    email: email
  });

  if (!doctor) {
    req.flash("error", "Email không tồn tại trong hệ thống!");
    res.redirect("back");
    return;
  }

  if (md5(password) != doctor.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if (doctor.status != "active") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  // res.cookie("token", account.token);
  res.redirect();
}