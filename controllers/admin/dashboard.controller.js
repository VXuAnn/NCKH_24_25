const Doctor = require("../../models/doctor.model");
const Patient = require("../../models/patient.model");
const Appointment = require("../../models/appointment.model");

// [GET] /admin/dashboard
module.exports.index = async(req, res) => {
  const doctors =await Doctor.find({
    deleted:false
  });
  const patients =await Patient.find({
    deleted:false
  })
  const appointments = await Appointment.find({})
  const doctorCount = await Doctor.countDocuments({ deleted: false });
  const patientCount = await Patient.countDocuments({ deleted: false });
  const appointmentCount = await Appointment.countDocuments({ deleted: false });
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    doctors: doctors,
    patients:patients,
    doctorCount,
    patientCount,
    appointmentCount,
    appointments: appointments
  });
}
