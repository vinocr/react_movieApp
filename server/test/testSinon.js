var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('../index');
var moviecontrol = require('../controller/moviecontroller'); 
var authencontrol = require('../controller/usercontroller');
var movie = require('../models/movieschema');
var authen = require('../models/authenschema');
var url = request("http://localhost:3001");

var moviestub = sinon.stub(movie,'find');
var authenstub = sinon.stub(authen,'find');

//test case to find the user in database
describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        authenstub.withArgs({username:'vino'}).returns({"password":"vino"});
    });
       it('Matches the User',function(done){
           url       
           .post('/signup')  
           .expect(200)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(authenstub({username:'vino'}).password).to.be.equal("vino"); 
               done();
    });
  }); 
});

//test case to find the movie in favourite list related to user
describe('Finds the Title related to user in Database ',function(err){
       beforeEach(function(){
        authenstub.withArgs({Username:'vinocr'}).returns({"Title":"Ko"});
    });
       it('Matches the Title by user',function(done){
           url       
           .post('/movie/add')  
           .expect(200)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(authenstub({Username:'vinocr'}).Title).to.be.equal("Ko"); 
               done();
    });
  }); 
});