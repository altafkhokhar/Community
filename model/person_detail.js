/** @format */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },

  registerNo: {
    type: String,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  qualification: {
    type: String,
  },

  birthDate: {
    type: Date,
  },

  gender: {
    type: String,
  },

  email: {
    type: String,
  },

  phoneNumber: {
    type: Number,
  },

  address: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  pictureName: {
    type: String,
  },
});

const person_detail = mongoose.model("persons", schema, "persons");
module.exports = {
  Model: person_detail,
};
