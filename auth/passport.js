const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../server/models/authenschema');
const connectFlash = require('connect-flash');


//local strategy of passport
passport.use(new LocalStrategy(function(username, password, cb) {
   users.findOne({"username": username}, function(err, user)
   {
     if (err) { return cb(err); }
     if (!user) {return cb(null, false); }
     if (user.password != password) {return cb(null, false); }
     return cb(null, user);
   });
 }));

//serialized user
passport.serializeUser(function(user, done) {
   done(null, user.id);
});

//deserialized user
passport.deserializeUser(function(id, done) {
 users.findById(id, function(err, user) {
   done(err, user);
 });
});

module.exports = passport;
