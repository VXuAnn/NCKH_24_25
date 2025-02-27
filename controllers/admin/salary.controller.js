// [GET] /admin/profile
module.exports.index = (req, res) => {
    res.render("admin/pages/salary/index", {
      pageTitle: "Salary"
    });
  }

// [GET] /admin/profile
module.exports.paySlip = (req, res) => {
    res.render("admin/pages/salary/paySlip", {
      pageTitle: "Salary PaySLip"
    });
  }