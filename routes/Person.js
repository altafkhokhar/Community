/** @format */
var express = require("express");
var router = express.Router();
var person_detail = require("../model/person_detail");
var mongoose = require("mongoose");
var fs = require("fs");
var multer = require("multer");
const {Server} = require("http");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({storage: storage});

/* GET home page. */

// create Dashboard.......

router.get("/Dashboard", function (req, res, next) {
  res.render("Dashboard");
});

//Insert Person List........

router.get("/Addlist", function (req, res, next) {
  res.render("Add_Person");
});

router.post("/Submit_Data", upload.single("image"), async function (
  req,
  res,
  next
) {
  if (req.body.register) {
    var checkRegisterd = await person_detail.Model.findOne({
      registerNo: req.body.register,
    });
  }
  if (checkRegisterd) {
    req.flash("info", "Register No. Already Exists!!!");

    res.redirect("/Addlist");
  } else {
    try {
      {
        await person_detail.Model.create({
          registerNo: req.body.register,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          fatherName: req.body.father_name,
          birthDate: req.body.birthday,
          qualification: req.body.qualification,
          gender: req.body.gender,
          email: req.body.email,
          phoneNumber: req.body.phone,
          address: req.body.address,

          img: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/jpeg",
          },
        });
      }
      console.log("alredy exist");
      res.render("Add_Person");
    } catch (err) {
      res.redirect("error");
      console.log(err);
    }
  }
});

// Display Person Details......

router.get("/displaylist", async function (req, res, next) {
  try {
    var all_person = {};

    person_detail.Model.find({}, function (err, persons) {
      // console.log("hiii" + persons);
      persons.forEach(function (oneperson) {
        // console.log("hello" + oneperson);
        all_person[oneperson._id] = oneperson;
        // console.log("id==" + all_person._id);
      });
    });
    // console.log(all_person);
    res.render("Display_Person", {displayperson: all_person});
  } catch (err) {
    console.log(err);
  }
});

// Update Person...............
router.get("/updateperson/:id", async function (req, res, next) {
  try {
    var updateperson = await person_detail.Model.findById({
      _id: req.params.id,
    });

    // var imagsrc = "data:image/jpeg;base  64," + buf.toString("base64");
    res.render("Edit_Person", {
      updateperson: updateperson,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateperson/:id", async function (req, res, next) {
  await person_detail.Model.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        registerNo: req.body.register_No,
        firstName: req.body.first_Name,
        lastName: req.body.last_Name,
        fatherName: req.body.father_Name,
        qualification: req.body.qualification,
        phoneNumber: req.body.phone_Number,
        email: req.body.email,
      },
    }
  );
  res.redirect("/displaylist");
});

// Delete Person......
router.get("/deleteperson/:id", async function (req, res, next) {
  console.log("indelete");

  try {
    await person_detail.Model.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    res.redirect("/displaylist");
  } catch (err) {
    console.log(err);
  }
});

router.get("/images/:id", async function (req, res, next) {
  try {
    var updateperson = await person_detail.Model.findOne(
      {
        _id: req.params.id,
      },
      function (err, result) {
        // console.log(result);
        res.set("Content-Type", result.contentType);

        res.send(result.img.data);
      }
    );

    // var imagsrc = "data:image/jpeg;base  64," + buf.toString("base64");
  } catch (err) {
    console.log(err);
  }
});
router.post("/updateimage/:id", upload.single("updateimage"), async function (
  req,
  res,
  next
) {
  console.log("hiiiiiiiiiiiiiiiii" + person_detail);
  console.log(("fillllleeeeeee"+req.file));
  await person_detail.Model.updateOne(
    {
      _id: req.params.id,
    },

    {
      $set: {
        img: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/jpeg",
        },
      },
    }
  );
  
  res.redirect("/displaylist");
});
module.exports = router;
