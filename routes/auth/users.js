const express = require("express");
const bcrypt = require ("bcryptjs") ;
// const bcrypt = require ("bcrypt") ;
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require ('passport');

const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Load user model
const User = require("../../models/Users");
// Load user model
const GetUserByID = require("../../_helpers/get-users-by-params");

const validateRegisterInput = require ('../../validation/register');
const validateLoginInput = require ('../../validation/login');

// @router POST request to auth/users/register
// @discription  Registers a user
// @access to this route is Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(req.body);
    

    // Check Validation
    if (!isValid){
        console.log('Not valid: ', errors);
        
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email}).then(user => {
            if (user) {
                errors.email = 'Email already exists';

                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: req.body.password,
                    permissionLevel: 1

                });
                // bcrypt to encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    // next line gets the password text from the newUser above and encrypts  it
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // the hash will be stored in the  database
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then((user) => {
                          // User Matched
                          const payload = { id: user.id, name: user.fullName , email: user.email }; // create jwt payload

                          //Sign Token
                          jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600 }, (err, token) => {
                              res.status(201).json({
                                  success: true,
                                  token: 'Bearer '+ token
                              });
                          });
                          // res.status(201).json(user);
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
    });
});


// @router POST request to api/users/login
// @discription  Login user / Returning JWT Token
// @access to this route is Public
router.post('/login',(req, res) => {
  console.log(req.body);
  
    

    const {errors, isValid} = validateLoginInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;    
    

    // Find user by email
    User.findOne({email}).then(user => {
        // Check for user
        if(!user){
            errors.email = "User not found";
            
            return res.status(400).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                // User Matched
                const payload = { id: user.id, name: user.fullName , avatar: user.avatar }; // create jwt payload

                //Sign Token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer '+ token
                    });
                });
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

// @router GET request to api/users/current
// @discription  Return current user
// @access to this route is PRIVATE
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('anyone home?');
    
    res.json({
        id:req.user.id,
        name: req.user.fullName,
        email: req.user.email,
        badges: req.user.badges,
        courses: req.user.courses,
        experiencePoints: req.user.experiencePoints,
        avatar: req.user.avatar
    });
});


// @router GET request to api/users/get-started
// @discription  Saves a new learners records and Returns his user object
// @access to this route is PRIVATE
router.post('/get-started/', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id).then((user) => {

      user.experiencePoints = req.body.XP;
      user.courses.addToSet(req.body.course);
      
      user.save(function (err, person) {
        if (err) {
          res.status(300).send(err);
        }
      });
  });
  GetUserByID(req.user.id, res);

});

// @router GET request to api/users/getById
// @discription  Return a user with the given Id
// @access to this route is PUBLIC
router.get('/getById/:userId', (req, res) => {
   GetUserByID(req.params.userId, res);
  
});

// @router GET request to api/users/forgot
// @discription  Return current user
// @access to this route is Public
router.get('/forgot', function(req, res) {
    res.render('forgot', {
      user: req.user
    });
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            return res.status(400).json('No account with that email address exists.');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: 'dejeffo',
            pass: '2Jk@pE5Znwb6'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@knowing-demo.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/auth/users/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        smtpTransport.sendMail(mailOptions).then(info => {
            // done(err, 'done');
            return res.status(200).json( `An e-mail has been sent to  ${user.email} with further instructions.`);

        });
      }
    ], function(err) {
      if (err) return next(err);
      // res.redirect('/forgot');
      return res.status(200).json('Called back something');
    });
});

// @router GET request to api/users/reset
// @discription  Resets current user's password
// @access to this route is Public
router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

        if (!user) {
            return res.redirect('/home');
            // return res.json('Password Reset halted! token is invalid or has expired.');
            // res.redirect('/forgot');
        }
        
        res.redirect('/auth/reset-password/'+ user.resetPasswordToken);
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            // req.flash('error', 'Password reset token is invalid or has expired.');
            console.log('No token ', req.params.token);
            
            return res.status(400).json('Password reset token is invalid or has expired.'); // res.redirect('back');
          }
  
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: 'dejeffo',
            pass: '2Jk@pE5Znwb6'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'knowing@demo.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
});

// route for facebook authentication and login
// different scopes while logging in
router.get('/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
 
// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/home',
    failureRedirect : '/'
  }), (req, res) => {
      res.send("Working");
  }
);
module.exports = router;