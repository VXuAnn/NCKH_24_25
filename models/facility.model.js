const { status } = require("express/lib/response");
const mongoose =require("mongoose");

const facilitySchema =new mongoose.Schema({
 name: String,
 address: String,
 hotline: String,
  deleted:{
    type: Boolean,
    default: false
  }, 
}, {
  timestamps: true
});

const Facility = mongoose.model("Facility", facilitySchema, "facilities");

module.exports = Facility;