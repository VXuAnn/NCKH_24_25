const Appointment = require("../../models/appointment.model");
const User = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
const Facility = require("../../models/facility.model");

// [GET] /admin/appointment
module.exports.index = async (req, res) => {
  try {
    // const appointments = await Appointment.find({})
    //   .populate("doctor_id", "fullName")
    //   .populate({
    //     path: "doctor_id",
    //     select: "fullName",
    //     populate: {
    //       path: "facility_id",
    //       select: "name"
    //     }
    //   })
    //   .lean(); 
    const appointments = await Appointment.find({})
      .populate("doctor_id", "fullName")
      .populate("facility_id", "name")
      .lean();
    // Tính tuổi bệnh nhân
    appointments.forEach((appointment) => {
      if (appointment.patientInfo && appointment.patientInfo.dateOfBirth) {
        // Parse định dạng ngày Việt Nam "dd/mm/yyyy"
        const [day, month, year] = appointment.patientInfo.dateOfBirth.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);

        // Tính tuổi
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Điều chỉnh tuổi nếu chưa qua sinh nhật trong năm nay
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        appointment.age = age;
      } else {
        appointment.age = "N/A";
      }
      if (appointment.startTime && appointment.endTime) {
        appointment.appointmentTime = `${appointment.startTime} - ${appointment.endTime}`;
      } else {
        appointment.appointmentTime = "N/A";
      }
      if (appointment.date) {
        appointment.formattedDate = new Date(appointment.date).toLocaleDateString("vi-VN");
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
