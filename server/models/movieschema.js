var mongoose = require('mongoose');

//creates schema to add in fav list
var Schema = mongoose.Schema({
   Title: String,
    Poster: String,
    Release_Date: String,
    Overview : String,
    Popularity : String,
    Username:String
});

//creates model
var addtofav = mongoose.model('Addition', Schema);

module.exports = addtofav;
