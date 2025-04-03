const express = require("express");
const router = express.Router();

const controller = require("../../controllers/doctor/appointment.controller");

router.get("/", controller.index);
router.post("/update-status/:id", controller.updateStatus);
module.exports = router;