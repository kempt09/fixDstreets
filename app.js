// Required dependencies for app go here
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/api');
var mongoose = require('mongoose');
var config = require('./modules/config');

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up MongoDB
mongoose.connect(config.mongoDB);

// Routes to use
app.use('/', routes);
app.use('/api', routes);

//Export
module.exports = app;

