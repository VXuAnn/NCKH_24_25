const express = require("express");
const router = express.Router();
const controller = require("../../controllers/doctor/login.controller");

router.get("/login", controller.index);
router.post("/loginPost", controller.loginPost);

module.exports = router;
