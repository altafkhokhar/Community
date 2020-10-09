/** @format */

var loginuser = require("../model/loginuser");
var md5 = require("md5");
module.exports = {
  login: function (app) {
    const passport = require("passport");
    const LocalStrategy = require("passport-local").Strategy;
    app.use(passport.initialize());
    app.use(passport.session());
    //user login through passport js using mongo DB
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        /**function for login user
         * @param  {string} username
         * @param  {string} password
         * @param  {Function} done
         * @return {[type]}
         */
        async function (req, username, password, done) {
          // console.log('login')
          // console.log(username)
          // console.log(password)
          let data = await loginuser.Model.findOne({
            email: username,
            password: md5(password),
          });
          if (data) {
            return done(null, {
              // id: data._id,
              id: data._id,
            });
          } else {
            req.flash("info");
            return done(null, false, {
              message: "Invalid username or password",
            });
          }
        }
      )
    );

    passport.serializeUser(function (user, done) {
      // console.log("ss" + user);
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      // console.log("deserializeUser");
      loginuser.Model.findById(id, function (err, user) {
        // console.log(user);
        done(null, user);
      });
    });
  },

  checkAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next(); //return next
    }

    //redirect to requested page
    res.redirect("/?u=" + req.originalUrl);
  },
};
