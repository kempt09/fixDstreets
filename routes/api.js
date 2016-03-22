// Required dependencies for routes go here
var express = require('express');
var Ticket = require('./../modules/db');
var router = express.Router();
var fs = require('fs');
var S3FS = require('s3fs');
var multiparty = require('connect-multiparty');
var multipartyMiddware = multiparty();


// Initialize S3 bucket for files
s3fsUploads.create();

// Initialize middleware to parse request
router.use(multipartyMiddware);

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
        lat: req.body.lat,
        long: req.body.long,
        date: Date.now(),
        description: req.body.description,
        image: req.body.image,
        address: req.body.address
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
router.route('/api/find').get(function (req, res) {
    'use strict';
    Ticket.find(function (err, response) {
        if (err) {
            res.send(err);
        }
        res.json(response);
    });
});

// AWS Cloud Service

router.route('/api/upload').post(function(req, res){
    'use strict';
    var file = req.files.file;
    console.log(file);
    var stream = fs.createReadStream(file.path);
    s3fsUploads.writeFile(file.name, stream).then(function () {
        fs.unlink(file.path, function (err) {
            if (err) {
                console.error(err);
            }
        });
        res.status(200).end();
    });
});

module.exports = router;


