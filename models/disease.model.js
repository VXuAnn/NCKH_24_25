const mongoose = require("mongoose");
const diseaseSchema = new mongoose.Schema({
  name: String,
  label: String,
  desc: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});
const Disease = mongoose.model("Disease", diseaseSchema, "diseases");
module.exports = Disease;