const Patient = require("../../models/patient.model");

module.exports.infoUser = async (req, res, next) => {
  if(req.cookies.tokenUser) {
    const user = await Patient.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    });

    if(user) {
      res.locals.user = user;
    }
  }
  
  next();
}

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.tokenUser) {
    res.redirect("/user/login");
    return;
  }

  const user = await Patient.findOne({
    tokenUser: req.cookies.tokenUser,
    deleted: false
  });

  if(!user) {
    res.redirect("/user/login");
    return;
  }
  
  next();
}