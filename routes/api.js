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

// Post User input to MongoDB
router.route('/api/submit').post(function (req, res) {
    'use strict';
    var issue = new Ticket({
        lat : req.body.lat,
        long : req.body.long,
        date : Date.now(),
        description : req.body.description,
        image : req.body.image
    });
    //save issue
    issue.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Ticket Created'});
    });
});

// Find tickets
router.route('/api/find').get(function (res, req) {
    'use strict';
    Ticket.find(function (err, response) {
        if (err) {
            res.send(err);
        }
        req.json(response);
    });
});

module.exports = router;


