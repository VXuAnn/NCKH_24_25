const TypeMedicine =require("../../models/typeMedicine.model");
const Medicine = require("../../models/medicine.model");
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
// [GET] /doctor/search-medicine
module.exports.searchMedicine = async (req, res) => {
  const keyword = req.query.keyword || "";
  console.log("🔍 Tìm kiếm thuốc với từ khóa:", keyword); 
  if (!keyword) {
    patientResults.innerHTML = "";
    return;
  }
  try {
    const regex = new RegExp(keyword, "i");
    const medicines = await Medicine.find({ name: regex, deleted: false })
      .limit(10)
      .select("name type _id") || [];
    console.log("📋 Kết quả tìm kiếm thuốc:", medicines);
    res.json(medicines);
  } catch (error) {
    console.error("Lỗi tìm kiếm thuốc:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// [GET] /doctor/search-patient
module.exports.searchPatient = async (req, res) => {
  const keyword = req.query.keyword || "";
  console.log("🔍 Tìm kiếm bệnh nhân với từ khóa:", keyword); // Log dữ liệu nhập vào
  if (!keyword) {
    patientResults.innerHTML = "";
    return;
  }

  console.log(keyword);
  try {
    const regex = new RegExp(keyword, "i");
    const patients = await Patient.find({ fullName: regex, deleted: false })
      .limit(10)
      .select("fullName");
    console.log("📋 Kết quả tìm kiếm bệnh nhân:", patients);
    res.json(patients);
  } catch (error) {
    console.error("Lỗi tìm kiếm bệnh nhân:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};