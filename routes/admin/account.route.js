const express =require("express");
const multer  = require('multer');
const router =express.Router();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

const controller = require("../../controllers/admin/account.controller");

router.get("/",controller.index);

router.get("/payment",controller.payment);

router.get("/add", controller.add);

router.get("/logout",controller.logout);

router.post(
  "/add",
  upload.single('thumbnail'),
  controller.addPost);

module.exports =router;