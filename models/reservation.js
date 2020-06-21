var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservation = new Schema({
    name: String,
    email: String,
    phone: String,
    brand: String,
    model: String,
    releaseDate: String,
    engineType: String,
    enginePower: String,
    desiredDate: String,
    comments: String
});

module.exports = mongoose.model('Reservation', reservation);
