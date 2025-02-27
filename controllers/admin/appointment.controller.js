const Appointment = require("../../models/appointment.model");

// [GET] /admin/profile
module.exports.index = async (req, res) => {
  try {
    // const appointments = await Appointment.find({ deleted: false })
    //   .populate("patientId", "fullName")
    //   .populate("doctorId", "fullName")
    //   .populate("department", "title");

    // console.log("Appointments:", JSON.stringify(appointments, null, 2));
    const appointments = await Appointment.find({ deleted: false })
  .populate("patientId", "fullName")
  .populate("doctorId", "fullName")
  .populate("department", "title")
  .lean(); // Chuyển sang object JS thuần

// Đảm bảo `department` là object hợp lệ
appointments.forEach(app => {
  if (typeof app.department === "string") {
    try {
      // Loại bỏ các ký tự không hợp lệ trong JSON
      app.department = app.department.replace(/_id: new ObjectId\('.*?'\),?\s*/g, "").trim();
      app.department = JSON.parse(app.department);
    } catch (e) {
      console.error("Lỗi khi parse department:", e);
      app.department = { title: "Không xác định" };
    }
  }
});

    res.render("admin/pages/appointment/index", {
      pageTitle: "Thông tin cuộc hẹn",
      appointments: appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};
