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
});

const loginuser = mongoose.model("Createuser", schema, "Createuser");
module.exports = {
  Model: loginuser,
};
