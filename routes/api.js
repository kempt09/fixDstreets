// Required dependencies for routes go here
var express = require('express');
var Ticket = require('./../modules/db');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    'use strict';
    res.sendfile('./public/index.html');
});

// forward to next route
router.use(function (req, res, next) {
    'use strict';
    next();
});

// Create Endpoints for internal API

router.route('/ticket').post(function (req, res) {
    'use strict';
    var issue = new Ticket();
    issue.lat = req.body.lat;
    issue.long = req.body.long;
    issue.date = Date.now();
    issue.description = req.body.description;
    issue.image = req.body.image;
    //save issue
    issue.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Ticket Created'});
    });
});
router.route('/tickets').get(function (res, req) {
    'use strict';
    Ticket.find(function (err, response) {
        if (err) {
            res.send(err);
        }
        req.json(response);
    });
});

module.exports = router;