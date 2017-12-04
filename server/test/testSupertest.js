var should = require("chai").should(),
expect = require("chai").expect,
supertest = require("supertest"), 
app = require("../index"); 
var url = supertest("http://localhost:3000");

//test case for routes
describe("Testing the route", function(err) {
    
    //test case for checking that movie is adding to fav
    it("checking status code for adding the favourites", function(done) 
    {
        url      
        .get("/movie/add")    
        .expect(200)      
        .end(function(err,res)   
        {
            done(); 
            });    
    }); 
    
     //test case for fav can view or not
     it("checking status code for viewing the favourites", function(done) 
    {
        url      
        .get("/movie/view")    
        .expect(200)      
        .end(function(err,res)   
        {
            done(); 
            });    
    });
        
    //test case for deletion of fav is done or not
    it("checking status code for deleting the favourites", function(done) 
    {
        url      
        .get("/movie/delete")    
        .expect(200)      
        .end(function(err,res)   
        {
            done(); 
            });    
    }); 
    
    //test case for adding hte new user
    it("checking status code for adding the new user", function(done) 
    {
        url      
        .get("/signup")    
        .expect(200)      
        .end(function(err,res)   
        {
            done(); 
            });    
    }); 
    
    //test case for login is done
    it("checking status code for login", function(done) 
    {
        url      
        .get("/login")    
        .expect(200)      
        .end(function(err,res)   
        {
            done(); 
            });    
    }); 
});