const mongoose = require("mongoose");
const degreeSchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});
const Degree = mongoose.model("Degree", degreeSchema, "degrees");
module.exports = Degree;