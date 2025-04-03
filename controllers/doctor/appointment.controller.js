// controllers/doctor/appointment.controller.js
const Appointment = require("../../models/appointment.model");

// [GET] /admin/appointment
module.exports.index = async (req, res) => {
  try {
    const doctorId = "67d82d17081ef00f6b96066b";
    const appointments = await Appointment.find({ doctor_id: doctorId })
      .populate("doctor_id", "fullName")
      .populate("facility_id", "name")
      .sort({ date: -1 })
      .lean();

    appointments.forEach((appointment) => {
      if (appointment.patientInfo && appointment.patientInfo.dateOfBirth) {
        const [day, month, year] = appointment.patientInfo.dateOfBirth.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

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

    res.render("doctor/pages/appointment/index", {
      pageTitle: "Thông tin cuộc hẹn",
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};

// [POST] /admin/appointment/update-status/:id
module.exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("Status:", req.body);
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await Appointment.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};