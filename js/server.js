'use strict';

var fs = require('fs');
var http = require('http');
var url  = require('url');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var madeMiddleware = function(request, response, next) {
  console.log("From madeMiddleware:" + request.url);
  next();
}

var anotherMiddleware = function(request, response, next) {
  console.log("From anotherMiddleware:" + request.url);
  next();
}

app.use(anotherMiddleware);

app.use(madeMiddleware);

app.get('/', function(request, response) {
  var content = fs.readFileSync('../html/index.html');
  response.set('Content-Type', 'text/html');
  response.send(content);
});

app.get('/time', function(request, response) {
  var currentTime = new Date();
  response.set('Content-Type', 'text/plain');
  response.send(currentTime.toDateString());
});

app.get('/login', function(request, response) {
  var content = fs.readFileSync('../html/login.html');
  response.set('Content-Type', 'text/html');
  response.send(content);
});

app.get('/signup', function(request, response) {
  var content = fs.readFileSync('../html/signup.html');
  response.set('Content-Type', 'text/html');
  response.send(content);
});

app.get('/css/homepage.css', function(request, response) {
  var content = fs.readFileSync('../css/homepage.css');
  response.set('Content-Type', 'text/css');
  response.send(content);
});

app.get('/greet/:name/:title', function(request, response) {
  console.log("greet pathname!")
  response.set('Content-Type', 'text/plain');
  response.send("Hey there " + request.params.title + ". " + request.params.name);
});

app.get('/*', function(request, response) {
  response.status(404).send("File not found");
});

app.post('/user', bodyParser.json(), function(request, response) {
  console.log(request.body);
});

app.post('/user/jon', function(request, response) {
  console.log("Post request has been triggered");
  response.set('Content-Type', 'text/plain');
  response.send('POST request to homepage');
});

app.listen(process.env.PORT || 8000, function() {
  console.log('server started');
});
