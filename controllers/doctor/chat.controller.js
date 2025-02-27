// [GET] /admin/profile
module.exports.index = (req, res) => {
    res.render("doctor/pages/chat/index", {
      pageTitle: "Thông tin cá nhân"
    });
  }

  module.exports.video= (req, res) => {
    res.render("doctor/pages/chat/video", {
      pageTitle: "Thông tin cá nhân"
    });
  }
  module.exports.call= (req, res) => {
    res.render("doctor/pages/chat/call", {
      pageTitle: "Thông tin cá nhân"
    });
  }