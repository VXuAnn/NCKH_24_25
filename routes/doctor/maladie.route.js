const express = require("express");
const router = express.Router();
const controller = require("../../controllers/doctor/maladie.controller");

router.get("/", controller.index);
router.get("/search-patient", controller.searchPatient);
router.get("/search-medicine", controller.searchMedicine);

module.exports = router;
