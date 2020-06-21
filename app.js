var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
app.use(express.static('public'));
var handlebars = require('express-handlebars');
var helpers = require('./lib/helpers.js');

// ==============================================================================

app.set('port', (process.env.PORT || 8080)); // Set the port

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('combined'));

var hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: helpers
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// MongdoDB and Mongoose
var mongoose = require('mongoose');
// We pick the default Promise implementation
mongoose.Promise = global.Promise;
/*mongoose.connect('mongodb://root:admin@ds155097.mlab.com:55097/dummy');*/
mongoose.connect('mongodb://admin:gaz321LAND123@ds051943.mlab.com:51943/gazland');

//mongoose.connect('mongodb://localhost');
// Model
var Reservation = require('./models/reservation');
var Approval = require('./models/approval');

// Extensions
// =============================================================================
app.get('/', function(req, res) {
    res.render('form', {
        title: 'Reservation',
        isForm: true
    });
});

app.get('/requests', function(req, res) {
    Reservation.find({}, function(err, reservations) {
        if (err) throw err;
        res.render('requests', {
            title: 'Reservation requests',
            reservations: reservations,
            isForm: false
        });
    });
});

app.post('/requests', function(req, res) {
    var body = req.body;
    if (body.function) {
        if (body.id && body.id.length > 0) {
            Reservation.findById(body.id, function(err, doc) {
                if (err) throw err;
                if (body.function === 'delete' || body.function === 'approve') {
                    doc.remove(function(err) {
                        if (err) throw err;
                    });

                    if (body.function === 'approve') {
                        doc = JSON.parse(JSON.stringify(doc));
                        delete doc._id;
                        delete doc.__v;
                        delete doc.desiredDate;
                        if(body.date && body.date > 0){
                          doc.date = body.date;
                          Approval.create(doc, function(err) {
                            if (err) throw err;
                          });
                        }
                    }
                    // doesn't work wanted a refresh of the page
                    res.redirect('/requests');
                }
            });
        }
    }
});

app.post('/reservation', function(req, res) {
    var body = req.body;
    var listToCheck = [body.fname, body.lname, body.email, body.phone, body.brand, body.model,
      body.releaseDate, body.engineType, body.enginePower, body.desiredDate, body.comments];
      if(checkAll(listToCheck)){
        (new Reservation({
            name: req.body.fname + ' ' + req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            brand: req.body.brand,
            model: req.body.model,
            releaseDate: req.body.releaseDate,
            engineType: req.body.engineType,
            enginePower: req.body.enginePower,
            desiredDate: req.body.desiredDate,
            comments: req.body.comments
        })).save('/', function(err) {
            var alertMessage;
            if (err) {
                alertMessage = 'failed';
            } else {
                alertMessage = 'success';
            }
            res.redirect('/');
        });
      }
});

app.get('/approvals', function(req, res) {
    Approval.find({}, function(err, _approvals) {
        if (err) throw err;
        res.render('approvals', {
            title: 'Approvals',
            approvals: _approvals,
            isForm: false
        });
    });
});

app.post('/approvals', function(req, res) {
    var body = req.body;
    if (body.function) {
        if (body.id && body.id.length > 0) {
            Approval.findById(body.id, function(err, doc) {
                if (err) throw err;
                if (body.function === 'delete') {
                    doc.remove(function(err) {
                        if (err) throw err;
                    });
                } else if (body.function === 'update') {
                    if (body.date && body.date > 0) {
                        doc.date = body.date;
                        doc.save(function(err) {
                            if (err) throw err;
                        });
                    }
                }
                res.redirect('/approvals');
            });
        }
    }
});

app.get('/approvalList', function(req, res) {
    Approval.find({}, function(err, approvals) {
        if (err) throw err;
        try {
            res.json(approvals);
        } catch (ex) {
            //... do nothing
        }
    })
});

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function() {
    console.log('I\'m listening on port', app.get('port'));
});

// FUNCTIONS
// =============================================================================
function checkAll(items) {
  for(var item in items){
    if(!item && item < 0){
      return false;
    }
  }
  return true;
}

module.exports = app;
