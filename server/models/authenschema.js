var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//creates schema for new account
var Schema = mongoose.Schema({
   username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

//creates model
var User = mongoose.model('user', Schema);

module.exports = User;
