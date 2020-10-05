/** @format */

var express = require("express");
var router = express.Router();
var loginuser = require("../model/loginuser");
var md5 = require("md5");

/* GET home page. */
router.get("/create", function (req, res, next) {
  res.render("createuser");
});

router.post("/create", async function (req, res, next) {
  console.log(req.body);

  try {
    console.log("hiii");
    await loginuser.Model.create({
      email: req.body.email,
      password: md5(req.body.password),
      confirmpassword: req.body.confirmpassword,
    });
    res.redirect("/");
  } catch (err) {
    res.redirect("error");
    console.log(err);
  }
});
module.exports = router;
