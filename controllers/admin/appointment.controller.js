const Appointment = require("../../models/appointment.model");
const User = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
const Facility = require("../../models/facility.model");

// [GET] /admin/appointment
module.exports.index = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("user_id", "fullName dateOfBirth") 
      .populate({
        path: "doctor_id",
        select: "fullName",
        populate: {
          path: "facility_id",
          select: "name"
        }
      })
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
      if (appointment.startTime && appointment.endTime) {
        appointment.appointmentTime = `${appointment.startTime} - ${appointment.endTime}`;
      } else {
        appointment.appointmentTime = "N/A";
      }
    });


    res.render("admin/pages/appointment/index", {
      pageTitle: "Thông tin cuộc hẹn",
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};
