// [GET] /admin/profile
module.exports.index = (req, res) => {
    res.render("admin/pages/disease/index", {
      pageTitle: "Danh sách bệnh"
    });
  }

