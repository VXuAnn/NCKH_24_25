const Appointment = require("../../models/appointment.model");

// [GET] /admin/profile
module.exports.index = async (req, res) => {
  try {
    const appointments = await Appointment.find({ deleted: false })
      .populate("patientId", "fullName")
      .populate("doctorId", "fullName")
      .populate("department"); // Nếu department là ObjectId, cần model riêng để populate

    res.render("doctor/pages/appointment/index", {
      pageTitle: "Thông tin cuộc hẹn",
      appointments: appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};