const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/chat.controller");

router.get("/", controller.index);
router.get("/video", controller.video);
router.get("/call", controller.call);


module.exports = router;