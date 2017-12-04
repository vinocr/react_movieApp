var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
//requires controller files
var usercontroller = require('../controller/usercontroller.js');
var moviecontroller = require('../controller/moviecontroller.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

//callbacks the signup function in controller
router.post('/signup', usercontroller.adduser);

//callbacks the login function in controller
router.post('/login',passport.authenticate('local', {
       failureFlash: 'Invalid Username and Password',
       successFlash: "Welcome to Movie App"
    }),usercontroller.login);

//callbacks the add function in controller
router.post('/movie/add', moviecontroller.add);

//callbacks the view function in controller
router.get('/movie/view', moviecontroller.view);

//callbacks the delete function in controller
router.get('/movie/delete', moviecontroller.delete);

//callbacks the logout function in controller
router.get('/logout', usercontroller.logout);

module.exports=router;
