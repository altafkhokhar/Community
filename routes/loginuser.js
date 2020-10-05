/** @format */

var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      var e = info.message;
      req.flash("info", e);
      console.log(e);
      return res.redirect("/");
    } else {
      req.logIn(user, async function (err) {
        // Invalid password
        if (err) {
          var e = info.message;
          req.flash("info", e);
          return res.redirect("/create");
        } else {
          // console.log(req.query.u)
          if (req.query.u) {
            return res.redirect(req.query.u);
          }
          res.redirect("/dashboard");
        }
      });
    }
  })(req, res, next);
});

module.exports = router;
