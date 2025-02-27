const express = require("express");
const router = express.Router();
const multer = require('multer');

const controller = require("../../controllers/admin/doctor.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

router.get("/", controller.index);

router.get("/profile/:id",controller.profile)

router.get("/add", controller.add);

router.post(
  "/add",
  upload.single('thumbnail'),
  controller.addPost);

router.get("/schedule", controller.schedule);

router.delete("/delete/:id",controller.deleteDoctor);

router.get("/edit/:id",controller.edit);
router.patch(
  "/edit/:id",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.editPatch
);

module.exports = router;