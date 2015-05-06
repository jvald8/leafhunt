'use strict';

var fs = require('fs');

var http = require('http');
var url  = require('url');

function onRequest(request, response) {
  console.log('calling the onRequest function');

  var pathname = url.parse(request.url).pathname;

  var pathnameLength = pathname.length;
  console.log(pathname);
  if (pathname === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var content = fs.readFileSync('../html/index.html');
    response.write(content);
  } else if (pathname === '/time') {
    // Should always write the head of a response body first
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // Creating a new date object and passing it to the
    var currentTime = new Date();
    response.write(currentTime.toDateString());
  } else if (pathname.substring(0, 7) === '/greet/') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var greetLength = ('/greet/').length;
    var greetThisName = pathname.substring(greetLength, pathnameLength);
    response.write('Hello ' + greetThisName);
  } else if (pathname.substring(0, 8) === '/signup') {
    var content = fs.readFileSync('../html/signup.html');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(content);
  } else if (pathname.substring(0, 7) === '/login') {
    var content = fs.readFileSync('../html/login.html');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(content);
  } else if (pathname) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 error: File not found.');
  }
  response.end();
}

http.createServer(onRequest).listen(8000);

console.log('Server has started');
