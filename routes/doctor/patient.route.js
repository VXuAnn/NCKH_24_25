const express = require("express");
const router = express.Router();

const controller = require("../../controllers/doctor/patient.controller");

router.get("/", controller.index);

module.exports = router;