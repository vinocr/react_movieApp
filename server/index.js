let express = require('express'),
path = require('path');
const app = express();
logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
const passport = require('../auth/passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var routes = require('./routes/index.js');

mongoose.connect("mongodb://localhost:27017/moviedb",{useMongoClient:true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static('views'));
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'../','dist/')));
app.use(bodyParser.json());
// Configuring Passport
app.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
