const mongoose = require("mongoose");
const typeMedicineSchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});
const TypeMedicine = mongoose.model("TypeMedicine", typeMedicineSchema, "typemedicines");
module.exports = TypeMedicine;