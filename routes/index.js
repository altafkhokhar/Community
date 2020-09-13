var express = require('express');
var router = express.Router();
// var person_service = require("../service/person_service");
var person_detail= require("../model/person_detail");

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('info', 'Flash is back!')
  res.render('index', { title: 'Express' });
});


router.post('/submit_data', async function (req, res, next) {
  console.log(req.body);

  try {

      await person_detail.Model.create({


        ragisterNo:req.body.Ragister_No,
        qualification:req.body.Qualification,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          birthDate:req.body.birthday,
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


  


  // var Person={

  //   first_name:req.body.first_name,
  //   last_name:req.body.last_name,
  //   birthday:req.body.birthday,
  //   gender:req.body.gender,
  //   email:req.body.email,
  //   phone:req.body.phone,
  //   address:req.body.address,
  //   image:req.body.image,

    

  // }
  // person_service.create_person(Person);
  
  

 
module.exports = router;
