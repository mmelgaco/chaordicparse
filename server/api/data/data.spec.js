'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/data', function() {

  it('should respond with empty JSON', function(done) {
    request(app)
      .post('/api/data')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});