const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/blog.controller");

router.get("/", controller.index);

router.get("/add", controller.add);

router.get("/edit", controller.edit);

router.get("/edit/:id",controller.edit);
router.patch(
  "/edit/:id",
  controller.editPatch
);

module.exports = router;