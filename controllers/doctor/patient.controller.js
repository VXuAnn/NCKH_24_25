const Patient = require("../../models/patient.model");
// [GET] /admin/patient
module.exports.index = async (req, res) => {
  const patients = await Patient.find({
    // deleted: false
  })
  res.render("doctor/pages/patient/index", {
    pageTitle: "Danh sách bệnh nhân",
    patients: patients
  });
}