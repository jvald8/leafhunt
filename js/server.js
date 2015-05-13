var serverApp = require('./routes/server-app.js')

serverApp.appInstance.listen(8000);
/*var express = require('express');
var app = express();
var launches = require('./routes/launches.js');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());

app.get('/', function(request, response) {
  var content = fs.readFileSync('../html/index.html');
  response.set('Content-Type', 'text/html');
  response.send(content);
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

app.get('/assets/leafr_logo.png', function(request, response) {
  var content = fs.readFileSync('../assets/leafr_logo.png');
  response.set('Content-Type', 'image/png');
  response.send(content);
});

app.get('/greet/:name/:title', function(request, response) {
  console.log("greet pathname!")
  response.set('Content-Type', 'text/plain');
  response.send("Hey there " + request.params.title + ". " + request.params.name);
});


app.get('/launches', launches.findAll);
app.get('/launches/:id', launches.findById);
app.post('/launches', launches.addLaunch);
app.put('/launches/:id', launches.updateLaunch);
app.delete('/launches/:id', launches.deleteLaunch);

app.get('/*', function(request, response) {
  response.status(404).send("File not found");
});


app.listen(process.env.PORT || 8000, function() {
  console.log('server started on port 8000');
});*/
