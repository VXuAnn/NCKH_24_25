const Doctor=require("../../models/doctor.model");
const systemConfig= require("../../config/system");
const Facility = require("../../models/facility.model");
const Degree = require("../../models/degree.model");
const md5 = require('md5');
const moment = require('moment');
const generateHelper = require("../../helpers/generate.helper");
const upload = require("../../middlewares/admin/upload.middleware");
// [GET] /admin/profile
module.exports.index = async (req, res) => {
  const doctors =await Doctor.find({deleted:false})
    .populate("facility_id", "name") 
    .exec();
    res.render("admin/pages/doctor/index", {
      pageTitle: "List doctor",
      doctors: doctors,
    });
  }

//[GET]/admin/doctor/profile/:id
module.exports.profile = async (req,res) =>{
  try{
    const id = req.params.id;
    
    const doctor = await Doctor.findOne({_id:id, deleted:false})
      .populate("facility_id", "name")
      .exec();
    // console.log(doctor)
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
  const degrees = await Degree.find({
    deleted: false
  }).select("title");
  const facilities = await Facility.find({
    // deleted: false
  }).select("name");

  res.render("admin/pages/doctor/add", {
    pageTitle:" Tạo tài khoản bác sĩ",
    facilities: facilities,
    degrees: degrees
  })
}
module.exports.addPost = async (req, res) => {
  // upload.single("avatar")(req, res, async function (err) {
  //   if (err) {
  //     return res.status(500).send("Lỗi upload file.");
  //   }
  try {
    
    const { fullName, us, email, ps, comfirm, birthday, gender, status, address,  spec, phone,degree } = req.body;
    const facility_id = req.body.facility;
    // Kiểm tra các trường bắt buộc
    if (!fullName || !email || !ps || !comfirm || !birthday || !gender || !spec || !facility_id || !phone || !degree) {
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

    // console.log(req.body);
    // Tạo đối tượng bác sĩ mới
    const doctor = new Doctor({
      fullName,
      email,
      password: hashedPassword,
      birthday: moment(birthday, "YYYY-MM-DD").toDate(),
      gender: genderBoolean,
      status: statusValue,
      address,
      facility_id,
      specialization: spec,
      phone,
      degree,
      licenseNumber,
      // avatar: avatarPath
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
    const facilities = await Facility.find({  }).select("name");
    const degrees = await Degree.find({ deleted: false }).select("title");
    console.log(doctor);
    return res.render("admin/pages/doctor/edit", {
      pageTitle: "Tạo tài khoản bác sĩ",
      doctor: doctor, 
      facilities: facilities,
      degrees: degrees,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa bác sĩ:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.gender) {
      req.body.gender = req.body.gender === "male"; // true for "male", false for "female"
    }
    // Nếu password không được gửi lên, xóa nó khỏi req.body
    if (!req.body.password || req.body.password.trim() === "") {
      delete req.body.password;
    } else {
      req.body.password = md5(req.body.password); // Cần lấy đúng giá trị password từ req.body
    }

    await Doctor.updateOne(
      {
        _id: id,
        deleted: false,
      },
      req.body
    );

    req.flash("success", "Cập nhật thành công");
    res.redirect("back");
  } catch (error) {
    console.error("Lỗi khi cập nhật bác sĩ:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// //[Patch]/admin/doctor/edit/:id
// module.exports.editPatch = async(req, res) =>{
//   console.log("🔹 Dữ liệu nhận được:", req.body); 
//   const id =req.params.id;

//   if(req.body.password == ""){
//     delete req.body.password == "";
//   }else {
//     req.body.password = md5(req.password);
//   }
//   await Doctor.updateOne({
//     _id:id,
//     deleted: false
//   },req.body);
  
//   req.flash("success", "Cập nhật thành công");

//   res.redirect("back");
// }