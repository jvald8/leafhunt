var mongo = require('mongodb');

var Server = mongo.Server;

var Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});

var db = new Db('launchesdb', server);



db.open(function(err, db) {
  if(!err) {
    console.log('connection to the database is a go');
    db.collection('launches', {strict:true}, function(err, collection) {
      if(err) {
        console.log('couldnt find databse, ill populate it with data');
        populateDb();
      }
    });
  }
});

exports.findById = function(request, response) {
  var id = request.params.id;
  console.log(id);
  console.log('Getting launch code: ' + id);

  db.collection('launches', function(err, collection) {
    collection.findOne({'id':parseInt(id)}, function(err, item) {
      console.log(JSON.stringify(item));
      response.send(item);
    });
  });
};

exports.findAll = function(request, response) {
  db.collection('launches', function(err, collection) {
    collection.find().toArray(function(err, items) {
      response.send(items);
    });
  });
};

exports.addLaunch = function(request, response) {
  var launch = request.body;
  console.log('Adding launch: ' + JSON.stringify(launch));

  db.collection('launches', function(err, collection) {
    collection.insert(launch, {safe: true}, function(err, result) {
      if(err) {
        response.send({'error': 'theres an error'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        response.send(result[0]);
      }
    });
  });
}


exports.updateLaunch = function(request, response) {
  var id = request.params.id;
  var launch = request.body;
  console.log('updating Launch #: ' + id);
  console.log(JSON.stringify(launch));
  db.collection('launches', function(err, collection) {
    collection.update({'id':parseInt(id)}, launch, {safe: true}, function(err, result) {
      if(err) {
        console.log('theres been an error');
        response.body({'error': 'theres been an error'});
      } else {
        console.log('' + result + 'documents updated');
        response.send(launch);
      }
    });
  });
}

exports.deleteLaunch = function(request, response) {
  var id = request.params.id;
  console.log('deleting launch sequence: ' + id);
  db.collection('launches', function(err, collection) {
    collection.remove({'id':parseInt(id)}, {safe:true}, function(err, result) {
      if(err) {
        response.send({'error':'theres been an error - : ' + err});
      } else {
        console.log('successfully deleted launch: ' + id);
        response.send(request.body);
      }
    });
  });
}

var populateDb = function() {
  var launches = [
    {
      'id': 1,
      'name': 'firstLaunch'
    },
    {
      'id': 2,
      'name': 'secondLaunch'
    }];

    db.collection('launches', function(err, collection) {
      collection.insert(launches, {safe:true}, function(err, result) {});
    });
}
