const Doctor = require("../../models/doctor.model");
const Department = require("../../models/department.model");
const Patient =require("../../models/patient.model");
const Appointment = require("../../models/appointment.model");
const moment = require("moment");

// [GET] /
module.exports.index = async (req, res) => {
  const doctors = await Doctor.find({
    deleted: false
  });
  const departments = await Department.find({
    deleted: false
  }) 
  res.render("client/pages/index", {
    pageTitle: "Trang chủ",
    doctors: doctors,
    departments: departments
  });
}

module.exports.getDoctorsByDepartment = async (req, res) => {
  const { departmentTitle } = req.query; // Đổi từ departmentId sang departmentTitle
  console.log(departmentTitle);
  if (!departmentTitle) {
    return res.json({ success: false, message: "Department title is required" });
  }

  try {
    const doctors = await Doctor.find({
      qualification: departmentTitle, // Tìm theo title của department
      deleted: false
    });

    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// [GET] /appointment/add
module.exports.addAppointment = async (req, res) => {
  try {
    const departments = await Department.find().select("title");
    const doctors = await Doctor.find({ status: "active" }).select("fullName");

    res.render("appointment/add", {
      pageTitle: "Đặt lịch hẹn",
      departments,
      doctors
    });
  } catch (error) {
    console.error("Lỗi khi tải trang đặt lịch:", error);
    res.status(500).send("Có lỗi xảy ra, vui lòng thử lại.");
  }
};
// [POST] /appointment/add
module.exports.addAppointmentPost = async (req, res) => {
  try {
    const { fullName, phone, department, doctor, age, appointmentDate, appointmentTime } = req.body;
    console.log(req.body);
    // Kiểm tra các trường bắt buộc
    if (!fullName || !phone || !department || !doctor || !age || !appointmentDate || !appointmentTime) {
      return res.status(400).send("Vui lòng điền đầy đủ thông tin.");
    }

    // Kiểm tra bác sĩ có tồn tại không
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(400).send("Bác sĩ không tồn tại.");
    }

    // Kiểm tra phòng ban có tồn tại không
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
      return res.status(400).send("Phòng ban không tồn tại.");
    }

    // Lưu tên phòng ban thay vì ID
    // const departmentName = departmentExists.title;

    // Kiểm tra tuổi hợp lệ
    if (isNaN(age) || age < 0 || age > 120) {
      return res.status(400).send("Tuổi không hợp lệ.");
    }

    // Kiểm tra định dạng ngày tháng
    const formattedDate = moment(appointmentDate, "YYYY-MM-DD", true).toDate();
    if (isNaN(formattedDate)) {
      return res.status(400).send("Ngày hẹn không hợp lệ.");
    }

    // Tạo bệnh nhân nếu chưa có
    let patient = await Patient.findOne({ phone });
    if (!patient) {
      patient = new Patient({ fullName: fullName, phone });
      await patient.save();
    }

    // Tạo đối tượng lịch hẹn mới
    const newAppointment = new Appointment({
      patientId: patient._id,
      doctorId: doctor,
      age,
      department: departmentExists ,
      appointmentDate: formattedDate,
      appointmentTime,
      status: "Scheduled"
    });

    await newAppointment.save();

    res.redirect(`/appointment`);
  } catch (error) {
    console.error("Lỗi khi đặt lịch hẹn:", error);
    res.status(500).send("Có lỗi xảy ra, vui lòng thử lại.");
  }
};
