// Required dependencies for app go here
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/api');
var mongoose = require('mongoose');
var multer = require('multer');

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest: './uploads/'}).any());


// Set up MongoDB
mongoose.connect('mongodb://fixdstreets:GrandCircus2016@ds011429.mlab.com:11429/tickets');

// Routes to use
app.use('/', routes);
app.use('/api', routes);

//Export
module.exports = app;

