var express = require('express');
var router = express.Router();
var person_detail= require("../model/person_detail");
var mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('info', 'Flash is back!')
  res.render('Dashboard');
});

router.get('/Addlist', function(req, res, next) {
  req.flash('info', 'Flash is back!')
  res.render('index');
});



router.post('/Submit_Data', async function (req, res, next) {
  console.log(req.body);

  try {

      await person_detail.Model.create({


          registerNo:req.body.register,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          fatherName:req.body.father_name,
          birthDate:req.body.birthday,
          qualification:req.body.qualification,
          gender:req.body.gender,
          email: req.body.email,
          phoneNumber:req.body.phone,
          address:req.body.address,
          pictureName:req.body.pic_Name,


      });

      res.render('index');

  } catch (err) {
      res.redirect('error');
      console.log(err)
  }
});

router.get('/displaylist',async function(req, res, next) {
  try {

    var all_person={};

  person_detail.Model.find({}, function (err, persons) {
    
    
     persons.forEach(function (oneperson) {
       all_person[oneperson._id] = oneperson;
     });
 })
 console.log(all_person);
  res.render('displaylist',{displayperson:all_person})
  }

catch (err) {
    console.log(err)
}
  
});


router.get('/updateperson/:id', async function (req, res, next) {
  

  try {
      var updateperson= await person_detail.Model.find({
          "_id": req.params.id
      });
      res.render('Edit_Person',{updateperson: updateperson })
  }
  catch (err) {
      console.log(err)
  }
});


router.post('/updateperson/:id', async function (req, res, next) {
  await person_detail.Model.updateOne({
      _id: req.params.id
  }, {
      $set: {
          registerNo:req.body.register_No,
          firstName: req.body.first_Name,
          lastName: req.body.last_Name,
          fatherName: req.body.father_Name,
          qualification:req.body.qualification,
          phoneNumber:req.body.phone_Number,
          email:req.body.email,
      }
  });
  res.redirect('/displaylist');
});


router.get('/deleteperson/:idd', async function (req, res, next) {
  console.log("indelete");

  try {
      await person_detail.Model.deleteOne({
          "_id": mongoose.Types.ObjectId(req.params.idd)
      });
      res.redirect('/displaylist')
  }
  catch (err) {
      console.log(err)
  }
});
module.exports = router;
