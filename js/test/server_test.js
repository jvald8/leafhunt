var server = require('../server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('server', function() {
  it('check to see if unexpected pathname gets 404 status', function(done) {
    chai.request('http://localhost:8000').get('/greett/jon').end(
      function(err, response) {
      expect(response).to.have.status(404);
      done();
    });
  });
  it('check to see if greet/name returns a string', function(done) {
    chai.request('http://localhost:8000').get('/greet/jon').end(
      function(err, response) {
      expect(response.text).to.be.a('string');
      done();
    });
  });
  it('check to see if greet/[name] returns Hello [name]', function(done) {
    chai.request('http://localhost:8000').get('/greet/jon/mr').end(
      function(err, response) {
      expect(response.text).to.eql('Hey there mr. jon');
      done();
    });
  });
  /*it('if i put in a signup page, there will be a 200 code', function(done) {
    chai.request('http://localhost:8000').get('/signup').end(
      function(err, response) {
      expect(response).to.have.status(200);
      done();
    });
  });
  it('if i put in a login page, there will be a 200 code', function(done) {
    chai.request('http://localhost:8000').get('/login').end(
      function(err, response) {
      expect(response).to.have.status(200);
      done();
    });
  });*/
  it('should return an ok code echoed back from homepage', function(done) {
    chai
    .request('http://localhost:8000')
    .get('/')
    .end(
      function(err, response) {
      expect(response).to.have.status(200);
      done();
    });
  });
  /*it('should return an ok code from launches/1 page', function(done) {
    chai
    .request('http://localhost:8000')
    .get('/launches/1')
    .end(
      function(err, response) {
      expect(response).to.have.status(200);
      done();
    });
  });*/
  it('should write a post to the launches page', function(done) {
    chai
    .request('http://localhost:8000')
    .post('/launches')
    .send({'id': 1, 'name': 'firstLaunch'})
    .end(
      function(err, response) {
        expect(response).to.have.status(200);
        done();
    });
  });
  it('should expect object at launches/1 to be names firstLaunch', function(done) {
    chai
    .request('http://localhost:8000')
    .get('/launches/1')
    .end(
      function(err, response) {
        expect(response.body.name).to.be.eql('firstLaunch');
        done();
    });
  });
  it('should write a post request to the launches page', function(done) {
    chai
    .request('http://localhost:8000')
    .post('/launches')
    .send({'id': 2, 'name': 'secondLaunch'})
    .end(
      function(err, response) {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should expect object at launches/2 to be named secondLaunch', function(done) {
    chai
    .request('http://localhost:8000')
    .get('/launches/2')
    .end(
      function(err, response) {
        expect(response.body.name).to.be.eql('secondLaunch');
        done();
      });
  });
  it('should update secondLaunch name to modifiedLaunch', function(done) {
    chai
    .request('http://localhost:8000')
    .put('/launches/2')
    .send({'id': 2, 'name': 'modifiedLaunch'})
    .end(
      function(err, response) {
        expect(response.body.name).to.be.eql('modifiedLaunch');
        done();
      });
  });
  it('should expect object at launches/2 to be deleted', function(done) {
    chai
    .request('http://localhost:8000')
    .delete('/launches/2')
    .end(
      function(err, response) {
        expect(response.body).to.be.eql({});
        done();
      });
  });
});
