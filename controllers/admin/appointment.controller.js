const Appointment = require("../../models/appointment.model");
const User = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
const Facility = require("../../models/facility.model");

// [GET] /admin/appointment
module.exports.index = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("user_id", "fullName dateOfBirth") 
      .populate("doctor_id", "fullName") 
      .populate("facility_id", "name")
      .lean(); 

    // Tính tuổi bệnh nhân
    appointments.forEach((appointment) => {
      if (appointment.user_id && appointment.user_id.dateOfBirth) {
        const birthDate = new Date(appointment.user_id.dateOfBirth);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        appointment.age = age;
      } else {
        appointment.age = "N/A"; // Nếu không có ngày sinh, hiển thị N/A
      }
    });

    // // Log danh sách cuộc hẹn để kiểm tra dữ liệu
    // console.log("Danh sách cuộc hẹn:", JSON.stringify(appointments, null, 2));

    res.render("admin/pages/appointment/index", {
      pageTitle: "Thông tin cuộc hẹn",
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};
