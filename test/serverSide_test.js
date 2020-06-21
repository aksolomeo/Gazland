var request = require('supertest');
var mongoose = require('mongoose');

describe('loading express', function() {
    var server;
    beforeEach(function() {
        server = require('../app').listen();
    });

    afterEach(function() {
        server.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds to /requests', function testRequests(done) {
        request(server)
            .get('/requests')
            .expect(200, done);
    });

    it('responds to /approvals', function testApprovals(done) {
        request(server)
            .get('/approvals')
            .expect(200, done);
    });

    it('responds to /approvalList', function testApprovalList(done) {
        request(server)
            .get('/approvalList')
            .expect(200, done);
    });

    it('responds to /approvalList', function testApprovalList(done) {
        request(server)
            .post('/approvalList')
            .expect(404, done);
    });

    it('responds to /reservation', function testReservation(done) {
        var data = {
            "fname": "Adam",
            "lname": "Smith",
            "email": "adam.smith@gmail.com",
            "phone": "11223344",
            "brand": "BMW",
            "model": "X6",
            "releaseDate": "2014",
            "engineType": "8",
            "enginePower": "500",
            "desiredDate": "12/27/2016",
            "comments": "*"
        }
        request(server)
            .post('/reservation')
            .send(data)
            .expect(302)
            .expect('Location', "/", done);
    });

    it('responds to /reservation', function testReservation(done) {
        request(server)
            .get('/reservation')
            .expect(404, done);
    });
});
