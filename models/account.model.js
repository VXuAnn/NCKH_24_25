const mongoose =require("mongoose");

const accountSchema =new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  token: String,
  avatar: String,
  status: String,
  deleted:{
    type: Boolean,
    default: false
  }, 
}, {
  timestamps: true
});

const Account =mongoose.model("Account", accountSchema, "accounts");

module.exports =Account;