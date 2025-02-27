const TypeMedicine =require("../../models/typeMedicine.model");
const Patient = require("../../models/patient.model");

// [GET] /admin/profile
module.exports.index = async(req, res) => {
  const typemedicines = await TypeMedicine.find({
    deleted: false
});
  res.render("doctor/pages/maladie/index", {
    pageTitle: "Thông tin cá nhân",
  typemedicines: typemedicines
  });
}

// [GET] /doctor/search-patient
module.exports.searchPatient = async (req, res) => {
  const keyword = req.query.keyword || "";
  if (!keyword.trim()) {
    return res.json([]);
  }
  console.log(keyword);
  try {
    const regex = new RegExp(keyword, "i");
    const patients = await Patient.find({ fullName: regex, deleted: false })
      .limit(10)
      .select("fullName");

    res.json(patients);
  } catch (error) {
    console.error("Lỗi tìm kiếm bệnh nhân:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};