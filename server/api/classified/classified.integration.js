'use strict';

var app = require('../..');
import request from 'supertest';

var newClassified;

describe('Classified API:', function() {

  describe('GET /api/classifieds', function() {
    var classifieds;

    beforeEach(function(done) {
      request(app)
        .get('/api/classifieds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          classifieds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      classifieds.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/classifieds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/classifieds')
        .send({
          name: 'New Classified',
          info: 'This is the brand new classified!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newClassified = res.body;
          done();
        });
    });

    it('should respond with the newly created classified', function() {
      newClassified.name.should.equal('New Classified');
      newClassified.info.should.equal('This is the brand new classified!!!');
    });

  });

  describe('GET /api/classifieds/:id', function() {
    var classified;

    beforeEach(function(done) {
      request(app)
        .get('/api/classifieds/' + newClassified._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          classified = res.body;
          done();
        });
    });

    afterEach(function() {
      classified = {};
    });

    it('should respond with the requested classified', function() {
      classified.name.should.equal('New Classified');
      classified.info.should.equal('This is the brand new classified!!!');
    });

  });

  describe('PUT /api/classifieds/:id', function() {
    var updatedClassified;

    beforeEach(function(done) {
      request(app)
        .put('/api/classifieds/' + newClassified._id)
        .send({
          name: 'Updated Classified',
          info: 'This is the updated classified!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClassified = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClassified = {};
    });

    it('should respond with the updated classified', function() {
      updatedClassified.name.should.equal('Updated Classified');
      updatedClassified.info.should.equal('This is the updated classified!!!');
    });

  });

  describe('DELETE /api/classifieds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/classifieds/' + newClassified._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when classified does not exist', function(done) {
      request(app)
        .delete('/api/classifieds/' + newClassified._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
