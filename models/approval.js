var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var approval = new Schema({
    name: String,
    email: String,
    phone: String,
    brand: String,
    model: String,
    releaseDate: String,
    engineType: String,
    enginePower: String,
    date: String,
    comments: String
});

module.exports = mongoose.model('Approval', approval);
