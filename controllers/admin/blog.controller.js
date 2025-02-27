// [GET] /admin/profile
module.exports.index = (req, res) => {
    res.render("admin/pages/blog/index", {
      pageTitle: "Thông tin cá nhân"
    });
  }


module.exports.add = (req, res) => {
    res.render("admin/pages/blog/add", {
      pageTitle: "Thông tin cá nhân"
    });
  }


module.exports.edit = (req, res) => {
    res.render("admin/pages/blog/edit", {
      pageTitle: "Thông tin cá nhân"
    });
  }
