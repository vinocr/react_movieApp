const User = require('../models/authenschema');
 
    //passes to signup and login routes in the router folder
    var userController = {
        //adds the user
        adduser: function(req, res) {
            var newUser = new User({username: req.body.username, password: req.body.password});
            //adds the data in database
            newUser.save().then((doc) => {
                res.send(doc);
            }, (err) => {
                res.send(err);
            });
        },
        
        //login if authenticated
        login: function(req, res) {
           res.json({responseText:'authenticated'});
        },
        
        //logout if session detroys
        logout: function(req, res) {
            req.session.destroy(function(err) {
              if (err) {
                console.log("Error");
              } else {
                res.send("success");
              }
            });
        }
};
module.exports =  userController;



