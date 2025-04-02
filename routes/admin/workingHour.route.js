const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/workingHour.controller");

router.get("/", controller.index);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);

module.exports = router;