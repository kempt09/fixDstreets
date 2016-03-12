// Required dependencies for app go here
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/api');
var mongoose = require('mongoose');
var app = express();

// Set up view engine and initialize required modules
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes to use
app.use('/', routes);
app.use('/api', routes);

// Set up MongoDB
mongoose.connect('mongodb://<username>:<password>@<ds-number>.mlab.com:<path>');

// Export app to use in other modules
module.exports = app;

// Save these for later when sitting up browser Icon
//var favicon = require('serve-favicon');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));