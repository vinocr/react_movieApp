var mongoose = require("mongoose");
var Addition = require('../models/movieschema.js');
var request = require('request');

     //passes to search routes in the router folder
    var movielist = {
      //passes to add routes in the router folder
      add: function(req, res) {
        //adds the data in database   
        var add1 = {
          Title: req.body.title,
          Poster: req.body.poster,
          Release_Date: req.body.release_date,
          Popularity:req.body.popularity,
          Overview:req.body.overview,
          Username:req.body.username
        }
        Addition.findOne({Title:add1.Title,Username:add1.Username},function(err,data){
            if(data==null)
            {
                var db1 = new Addition(add1);
                    //saves only the new data in database
                    db1.save().then((doc) => {
                        res.send("success");
                    }, (err) => {
                        res.send(err);
                    });
            }
            
            else{
                res.send("already added");
            }
        });
      },
    
      //calls view routes in the router folder
      view: function(req, res) {
        //query used to find all the data in database
        Addition.find({Username:req.query.username},function(err, data) {
          if (err)
            throw err;
          else {
            res.send(data);
          }
        });
      },
    
      //calls delete routes in the router folder
      delete: function(req, res) {
        var tit = req.query.title;
        var name = req.query.username
        //query to delete the data based on title
        Addition.remove({
          Title: tit,Username:name
        }, function(err, data) {
          if (err)
            throw err;
          else {
            res.send("success");
          }
    
        });
      }
};

module.exports =  movielist;



