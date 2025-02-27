const Doctor=require("../../models/doctor.model");
const systemConfig= require("../../config/system");
const Role = require("../../models/role.model");
const Degree = require("../../models/degree.model");
const Department = require("../../models/department.model");
const md5 = require('md5');
const moment = require('moment');
const generateHelper = require("../../helpers/generate.helper");
// [GET] /admin/profile
module.exports.index = async (req, res) => {
  const doctors =await Doctor.find({
    deleted:false
  })
    res.render("admin/pages/doctor/index", {
      pageTitle: "List doctor",
      doctors: doctors
    });
  }

//[GET]/admin/doctor/profile/:id
module.exports.profile = async (req,res) =>{
  try{
    const id = req.params.id;
    
    const doctor = await Doctor.findOne({
      _id:id,
      deleted:false
    });
    console.log(doctor)
    if(doctor) {
      res.render("admin/pages/doctor/profile",{
        pageTitle: "Doctor profile",
        doctor: doctor
      });
    }else {
      res.redirect(`${systemConfig.prefixAdmin}/admin/doctor`)
    }
  }catch (error){
      res.redirect(`${systemConfig.prefixAdmin}/admin/doctor`)
  }
}
  
module.exports.schedule = async (req, res) => {
    res.render("admin/pages/doctor/schedule", {
      pageTitle: "Thông tin cá nhân"
    });
  }


  // [DELETE]/admin/doctor/delete/:id
module.exports.deleteDoctor = async(req,res) =>{
  const id = req.params.id;
  await Doctor.deleteOne ({
    _id: id
  });
  res.json({
  code: 200
});
}

// [Get]//admin/doctor/add
module.exports.add = async(req, res) => {
  const roles =await Role.find({
    deleted:false
  }).select("title");
  const degrees = await Degree.find({
    deleted: false
  }).select("title");
  const departments = await Department.find({
    deleted: false
  }).select("title");
  res.render("admin/pages/doctor/add", {
    pageTitle:" Tạo tài khoản bác sĩ",
    roles: roles,
    departments: departments,
    degrees: degrees
  })
}
module.exports.addPost = async (req, res) => {
  try {
    
    const { fullName, us, email, ps, comfirm, birthday, role, gender, status, address, workPlace, qualification, spec, phone,degree } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !email || !ps || !comfirm || !birthday || !role || !gender || !spec || !qualification || !workPlace || !phone || !degree) {
      return res.status(400).send("Vui lòng điền đầy đủ thông tin.");
    }

    // Kiểm tra mật khẩu xác nhận
    if (ps !== comfirm) {
      return res.status(400).send("Mật khẩu xác nhận không khớp.");
    }

    // Kiểm tra email đã tồn tại chưa
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
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
    const licenseNumber = req.body.licenseNumber || `DOC-${Date.now()}`;

    console.log(req.body);
    // Tạo đối tượng bác sĩ mới
    const doctor = new Doctor({
      fullName,
      email,
      password: hashedPassword,
      birthday: moment(birthday, "YYYY-MM-DD").toDate(),
      role_id: role,
      gender: genderBoolean,
      status: statusValue,
      address,
      workPlace,
      qualification,
      specialization: spec,
      phone,
      degree,
      licenseNumber 
    });

    // Lưu vào database
    await doctor.save();

    res.redirect(`/admin/doctor`);
  } catch (error) {
    console.error("Lỗi khi thêm bác sĩ:", error);
    res.status(500).send("Có lỗi xảy ra, vui lòng thử lại.");
  }
};

//[GET]/admin/doctor/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Kiểm tra ID hợp lệ trước khi truy vấn
    if (!id) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }

    const doctor = await Doctor.findOne({ _id: id, deleted: false });

    if (!doctor) {
      return res.status(404).json({ error: "Không tìm thấy bác sĩ" });
    }

    const roles = await Role.find({ deleted: false }).select("title");
    const degrees = await Degree.find({ deleted: false }).select("title");
    const departments = await Department.find({ deleted: false }).select("title");

    return res.render("admin/pages/doctor/add", {
      pageTitle: "Tạo tài khoản bác sĩ",
      roles: roles,
      departments: departments,
      degrees: degrees,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa bác sĩ:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};


//[Patch]/admin/doctor/edot/:id
module.exports.editPatch = async(req, res) =>{
  const od =req.params.id;

  if(req.body.password == ""){
    delete req.body.password == "";
  }else {
    req.body.password = md5(req.password);
  }
  await Doctor.updateOne({
    _id:id,
    deleted: false
  },req.body);
  
  req.flash("success", "Cập nhật thành công");

  res.redirect("back");
}