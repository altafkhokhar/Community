/** @format */

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/logout", function (req, res, next) {
  req.logout();
  //res.render('logout', { title: 'Express' });
  res.redirect("/login");
});
module.exports = router;
