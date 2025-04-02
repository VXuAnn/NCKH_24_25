const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 
  },
  duration: {
    type: Number,
    required: true,
    min: 1 
  }
});

const workingHourSchema = new mongoose.Schema({
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6  
  },
  slots: [slotSchema] 
}, {
  timestamps: true
});

const WorkingHour = mongoose.model("WorkingHour", workingHourSchema, "workinghours");
module.exports = WorkingHour;