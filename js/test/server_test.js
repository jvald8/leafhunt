var server = require('../server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('server', function() {
  it('should return OK status on localhost homepage', function(done) {
    chai.request('http://localhost:8000').get('/time').end(
      function(err, response) {
      expect(response).to.have.status(200);
      done();
    });
  });
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
  it('if i put in a signup page, there will be a 200 code', function(done) {
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
  });
  it('if i put in a POST request, it will write out a Post request to homepage', function(done) {
    chai.request('http://localhost:8000').post('/user/jon').field('_method', 'post').send({password: '123', confirmPassword: '123'}).end(
      function(err, response) {
      expect(response.text).to.eql('POST request to homepage');
      done();
    });
  });
});
