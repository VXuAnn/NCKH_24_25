const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/blog.controller");

router.get("/", controller.index);

router.get("/add", controller.add);

router.get("/edit", controller.edit);

module.exports = router;