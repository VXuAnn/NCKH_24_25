const md5 = require("md5");
// const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập"
      
    });
  }
// [POST] /admin/auth/logi