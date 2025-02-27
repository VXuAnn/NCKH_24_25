const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/salary.controller");

router.get("/", controller.index);

router.get("/paySlip",controller.paySlip);


module.exports = router;