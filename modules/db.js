// This file will contain our Schema for MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TicketsSchema = new Schema({
    lat: Number,
    long: Number,
    date: Date,
    description: String,
    image: Buffer
});

module.exports = mongoose.model('Tickets', TicketsSchema);