/** @format */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var indexRouter = require("./routes/Person");
var loginuser = require("./routes/loginuser");
var createuser = require("./routes/signupuser");
var logoutuser = require("./routes/logoutuser");

var app = express();

const auth = require("./helpers/auth");

mongoose.connect(
  "mongodb://localhost:27017/Community", //connect-mongoose
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
auth.login(app);
app.use("*", function (req, res, next) {
  console.log("session" + req.user);

  res.locals.session = req.user;
  // console.log(session);

  res.locals.message = req.flash("info");
  next();
});

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", createuser);
app.use("/", loginuser);
app.use(auth.checkAuth);
app.use("/", indexRouter);
app.use("/", logoutuser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
