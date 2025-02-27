const express = require("express");
const router = express.Router();

const userMiddleware = require("../../middlewares/client/user.middleware");

const controller = require("../../controllers/client/user.controller");

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/password/forgot", controller.forgotPassword);

module.exports = router;