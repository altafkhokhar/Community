/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var mongoose = require("mongoose");
var indexRouter = require("./routes/Person");
var usersRouter = require("./routes/users");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var app = express();
var path = require("path");
require("dotenv/config");

mongoose.connect(
  "mongodb://localhost:27017/Community", //connect-mongoose
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
  })
);
app.use(flash());

app.use("*", function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  console.log(req.flash("success_msg"));
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.message = req.flash("info");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
