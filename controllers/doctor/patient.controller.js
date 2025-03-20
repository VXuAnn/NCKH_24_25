const Patient = require("../../models/patient.model");

// [GET] /admin/profile
module.exports.index = async(req, res) => {
  const patients = await Patient.find({ deleted: false })
    .select("fullName email phone address dob gender");

    res.render("doctor/pages/patient/index", {
      pageTitle: "Danh sách bệnh nhân",
      patients: patients
    });
  }