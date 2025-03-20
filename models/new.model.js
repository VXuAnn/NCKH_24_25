const { status } = require("express/lib/response");
const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  title: String,
  desc: String,
  imageUrl: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const New = mongoose.model("New", newSchema, "news");

module.exports = New;