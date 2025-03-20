const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/disease.controller");

router.get("/",controller.index);

router.get("/add", controller.add);

router.post(
  "/add",
  controller.addPost);

router.get("/delete/:id", controller.delete);

router.get("/edit/:id", controller.edit);
router.post("/edit/:id", controller.editPatch);

module.exports = router;