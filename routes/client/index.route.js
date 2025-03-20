const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");

const homeRoute = require("./home.route");

module.exports.index = (app) => {

  app.use("/", homeRoute);

  app.use("/user", userRoute);


}

