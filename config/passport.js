const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const FBUser = require("../models/FBUser");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
    })
    );

    passport.use(new FacebookStrategy(keys.fb, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
     
            // find the user in the database based on their facebook id
            FBUser.findOne({ 'email' : profile.email }, (err, user) => {
       
              // if there is an error, stop everything and return that
              if (err)
                return done(err);
       
                // if the user is found, then log them in
                if (user) {
                  return done(null, user); // user found, return that user
                } else {
                  // if there is no user found with that facebook id, create them
                  var newUser = new FBUser({
                    // set all of the facebook information in our user model
                    id : profile.id,          
                    // access_token : access-token,      
                    firstName  : profile.name.givenName,
                    lastName : profile.name.familyName, 
                    // email : profile.emails[0].value 
        
                  });
       
                  // save our user to the database
                  newUser.save((err) => {
                    if (err)
                      throw err;
       
                    // if successful, return the new user
                    return done(null, newUser);
                  });
               } 
            });
          });
    }))
};
