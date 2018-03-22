// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userModel = require('./User');

router.use(bodyParser.urlencoded({ extended: true }));

// CREATES A NEW USER
router.post('/register', function (req, res) {
    if (req.body.email &&
        req.body.username &&
        req.body.password) {
        var userData = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        };
userModel.create(userData, function (err, user) {
                            if (err) {
                                return next(err);
                            } else {
                                return res.status(200).send(user);
                            }
                            });
        // userModel.findOne({username: userData.username},function(err,userModel){
        //         if(userModel==null) {
        //             console.log("Username not found in database"+userModel.email);
        //             //use schema.create to insert data into the db
                    
        //         }
        //         else res.status(500).send("userModel Already Existed");
        // });

        
      }else{
          var response = {
                status : false,
                message : "Provide all information"
          };
        return res.status(500).send(response);
      }

});


// Login service. 
router.post('/login', function (req, res) {
    if (req.body.username &&
        req.body.password ) {
        var loginData = {
          username: req.body.username,
          password: req.body.password
        };

        userModel.findOne(loginData,function(err,userModel){
            if(err) res.status(500).send("No user existed , Please Register first");
            else {
                if(userModel){
                    var data = {
                        status : true,
                        user : userModel
                    };
                    res.status(200).send(data);
                }else{
                    var json = {
                        status : false,
                        user : "Wrong Credentials"
                    };
                    res.status(500).send(json);
                }
            }
        });

    }
});


// RETURNS ALL THE USERS IN THE DATABASE
router.get('/all', function (req, res) {
    userModel.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
    userModel.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("userModel "+ user.name +" was deleted.");
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/getById/:id', function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/updateById/:id', function (req, res) {
    userModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;