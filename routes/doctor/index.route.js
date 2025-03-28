const patientRoute = require("./patient.route");
const appointmentRoute = require("./appointment.route");
const chatRoute = require("./chat.route");
const maladieRoute = require("./maladie.route")
const loginRoute = require("./login.route");

module.exports.index = (app) => {
  app.use("/doctor/chat", chatRoute);

  app.use(
      "/doctor/appointment", 
      appointmentRoute
    );
  app.use("/doctor/patient", patientRoute);
  app.use("/doctor/maladie", maladieRoute);
  app.use("/doctor/login", loginRoute);
}