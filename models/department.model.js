const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});
const Department = mongoose.model("Department", departmentSchema, "departments");
module.exports = Department;