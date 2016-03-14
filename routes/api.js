// Required dependencies for routes go here
var express = require('express');
var router = express.Router();
var Profile = require('./../modules/db');

/* GET home page. */
router.get('/', function (req, res) {
    'use strict';
    res.sendfile('../public/index.html');
});

// forward to next route
//router.use(function (req, res, next) {
//    'use strict';
//    next();
//});

// Create Endpoints for internal API

module.exports = router;