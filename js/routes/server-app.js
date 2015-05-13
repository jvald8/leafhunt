var express = require('express');
var bodyParser = require('body-parser');
var appController = require('./app-controller.js');
var serverApp = express();

exports.appInstance = serverApp;

var jsonParser = bodyParser.json();


serverApp.use(jsonParser);


serverApp.get('launches/:id', function(request, response) {
  var id = parseInt(request.params.id);
  appController.getLaunch(id, function(err, launch) {
    if(err !== null) {
      response.status(500).send('unexpected server error: ' +  err);
    } else if (launch === null) {
      response.status(404).send('launch with code: ' +  id + ' not found');
    } else {
      response.json(launch);
    }
  });
});

serverApp.post('/launches', function(request, response) {
  var newLaunch = request.body;
  if(newLaunch === undefined || newLaunch.launchText === undefined) {
    response.status(400).send('missing or invalid json object posted');
    return;
  }

  appController.createLaunch(newLaunch, function(err, newLaunchId) {
    if(err !== null) {
      response.status(500).send('unexpected server error');
    } else {
      response.set('Location', '/launches/' + newLaunchId);
      response.status(201).send({id: newLaunchId});
    }
  });
});

var putOrPatch = function(request, response) {
  var updatedLaunch = request.body;
  var id = parseInt(request.params.id);
  if(updatedLaunch === undefined || updatedLaunch.launchText === undefined) {
    response.status(400).send('missing or invalid json was putted');
    return;
  }

  updatedNote.id = id;

  appController.updateLaunch(updatedLaunch, id, function(err, updatedLaunch) {
    if(err !== null) {
      response.status(500).send('unexpected error on server side');
    } else {
      if(!updatedLaunch) {
        response.status(404).send('couldnt find launch with code: ' + id);
      } else {
        response.status(200).send('update dawg');
      }
    }
  });
};

serverApp.put('/launches/:id', putOrPatch);
serverApp.patch('/launches/:id', putOrPatch);

serverApp.delete('/launches/:id', function(request, response) {
  var id = parseInt(request.params.id);

  var deletedLaunch = appController.deleteLaunch(id, function(err, deletedLaunch) {
    if(err !== null) {
      response.status(500).send('server side error, sorry man');
    } else {
      if(!deletedLaunch) {
        response.status(404).send('launch with code: ' + id + ' not found');
      } else {
        response.status(200).send();
      }
    }
  })
})
