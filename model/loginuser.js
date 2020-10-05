/** @format */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  email: {
    type: String,
  },

  password: {
    type: String,
    default: null,
  },
  confirmpassword: {
    type: String,
    default: null,
  },
  IsActive: {
    type: Boolean,
    default: true,
  },
});

const loginuser = mongoose.model("Users", schema, "Users");
module.exports = {
  Model: loginuser,
};
