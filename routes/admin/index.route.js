const dashboardRoute = require("./dashboard.route");
const systemConfig = require("../../config/system");
const doctorRoute = require("./doctor.route");
const patientRoute = require("./patient.route");
const appointmentRoute = require("./appointment.route");
const authRoute =require("./auth.route");
const chatRoute = require("./chat.route");
const blogRoute = require("./blog.route");
const settingRoute = require("./setting.route");
const medicineRoute = require("./medicine.route");
const accountRoute =require("./account.route");
const roleRoute =require("./role.route")
const diseaseRoute =require("./disease.route")
const loginRoute = require("./auth.route")
const workingHourRoute = require("./workingHour.route")

module.exports.index = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(
    `${path}/dashboard`,
     dashboardRoute
    );

  app.use(
      `${path}/doctor`, 
      doctorRoute
    );
  app.use(
      `${path}/patient`, 
      patientRoute
    );
  app.use(
      `${path}/appointment`, 
      appointmentRoute
    );
  app.use(
      `${path}/chat`, 
      chatRoute
    );
  app.use(
        `${path}/blog`, 
        blogRoute
      );
  app.use(
        `${path}/setting`, 
        settingRoute
      );
  app.use(
        `${path}/medicine`, 
        medicineRoute
      );
  app.use(`${path}/auth`, authRoute);
  app.use(`${path}/accounts`,accountRoute);
  app.use(`${path}/roles`,roleRoute);
  app.use(`${path}/disease`,diseaseRoute);
  app.use(`${path}/auth`, authRoute);
  app.use(`${path}/workingHour`, workingHourRoute);
}