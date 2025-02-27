const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require('md5');
const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");
const moment = require("moment");

//[GET]/admin/accounts
module.exports.index= (req,res) =>{
  res.render("admin/pages/accounts/index",{
    pageTitle:" Admin Profile"
  });
}

// [Get]//admin/account/add
module.exports.add = async(req, res) => {
  const roles =await Role.find({
    deleted:false
  }).select("title");
  res.render("admin/pages/accounts/add", {
    pageTitle:" Tạo tài khoản",
    roles: roles,
  })
}
module.exports.addPost = async (req, res) => {
  try {
    
    const { fullName, email, ps, comfirm, birthday, role, gender, status, address, phone} = req.body;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !email || !ps || !comfirm || !birthday || !role || !gender  || !phone ) {
      return res.status(400).send("Vui lòng điền đầy đủ thông tin.");
    }

    // Kiểm tra mật khẩu xác nhận
    if (ps !== comfirm) {
      return res.status(400).send("Mật khẩu xác nhận không khớp.");
    }

    // Kiểm tra email đã tồn tại chưa
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).send("Email đã tồn tại.");
    }

    // Mã hóa mật khẩu MD5
    const hashedPassword = md5(ps);

    // Chuyển đổi giá trị `gender` từ radio button
    const genderBoolean = gender === "male" ? true : false;

    // Chuyển đổi giá trị `status`
    const statusValue = status === "option1" ? "active" : "inactive";
    const parsedBirthday = moment(birthday, ["YYYY-MM-DD", "DD/MM/YYYY"], true).toDate();
    if (isNaN(parsedBirthday)) {
      return res.status(400).send("Ngày sinh không hợp lệ.");
    }

    console.log(req.body);
    // Tạo đối tượng bác sĩ mới
    const account = new Account({
      fullName,
      email,
      password: hashedPassword,
      birthday: moment(birthday, "YYYY-MM-DD").toDate(),
      role_id: role,
      gender: genderBoolean,
      status: statusValue,
      address,
      phone,
    });

    // Lưu vào database
    await account.save();

    res.redirect(`/admin/accounts`);
  } catch (error) {
    console.error("Lỗi khi thêm account:", error);
    res.status(500).send("Có lỗi xảy ra, vui lòng thử lại.");
  }
};


module.exports.payment= (req,res) =>{
  res.render("admin/pages/accounts/payment",{
    pageTitle:" Admin Profile"
  });
}


// [GET] /admin/logout
module.exports.logout = async (req, res) => {
  try {
    // Kiểm tra nếu người dùng đang đăng nhập và có trong `res.locals.user`
    if (res.locals.user && res.locals.user.id) {
      await Account.updateOne(
        { _id: res.locals.user.id },
        { status: "offline" }
      );
    }
  } catch (e) {
    console.error("Lỗi khi đăng xuất:", e);
  }
  
  // Xóa cookie token và chuyển hướng về trang đăng nhập admin
  res.clearCookie("tokenUser");
  res.redirect("/user/login");
};
