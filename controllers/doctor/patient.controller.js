// [GET] /admin/profile
module.exports.index = (req, res) => {
    res.render("doctor/pages/patient/index", {
      pageTitle: "Danh sách bệnh nhân"
    });
  }