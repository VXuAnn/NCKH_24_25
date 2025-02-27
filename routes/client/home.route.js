const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/home.controller");

router.get("/", controller.index);

router.get("/getDoctorsByDepartment",controller.getDoctorsByDepartment);

router.post("/addAppointment", controller.addAppointmentPost);

module.exports = router;