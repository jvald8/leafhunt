'use strict';

var mongoose = require('mongoose');

var MongooseDb = function(host, port, databaseName, theCollectionName) {
  var url = "mongodb://" + host + ':' + port + '/' + databaseName;

  var db = mongoose.createConnection(url);

  var counterSchema = new mongoose.Schema({
    forCollection : String,
    latestId : Number
  });

  var launchSchema = new mongoose.Schema({
    id : {type : Number, unique:true, required:true},
    launchText : String
  },
  { collection : theCollectionName});

  var CounterModel;
  if(db.models.Counter !== undefined) {
    CounterModel = db.model('Counter');
  } else {
    CounterModel = db.model('Counter', counterSchema);
    CounterModel.findOne({forCollection:theCollectionName}, function(err, item) {
      if(item === null) {
        var initialCounter = new CounterModel({forCollection:theCollectionName, latestId : 1});
        initialCounter.save();
      }
    });
  }

  var LaunchModel;
  if(db.models.Launch !== undefined) {
    LaunchModel = db.model('Launch');
  } else {
    LaunchModel = db.model('Launch', launchSchema);
  }

  this.createObject = function(newObject, callback) {
    CounterModel.findOne({forCollection:theCollectionName}, function(err, counter) {
      if(err !== null) {
        callback(err, null);
      }

      if(counter === null) {
        console.log('Counter not found');
      }

      var newId = counter.latestId + 1;
      newObject['id'] = newId;

      var newLaunch = LaunchModel(newObject);
      newLaunch.save(function(err, addedObject) {
        if(err !== null) {
          callback(err, null);
        }

        CounterModel.findOneAndUpdate({forCollection:theCollectionName}, {latestId:newId}, function(err, updateCounter) {
          if(err !== null) {
            callback(err, null)
          }
          callback(null, newId);
        });
      });
    });
  };

  this.readObject = function(id, callback) {
    LaunchModel.findOne({id:id}, function(err, launch) {
      if(err !== null) {
        callback(err, null)
      }
      callback(null, launch);
    });
  }

  this.updateObject = function(updatedObject, id, callback) {
    LaunchModel.findOneAndUpdate({id:id}, {$set: {launchText: updatedObject.launchText}},
      function(err, result) {
        if(err !== null) {
          callback(err, null);
        }
        callback(null, result);
      });
  };

  this.deleteObject = function(id, callback) {
    LaunchModel.remove({id:id}, function(err) {
      if(err !== null) {
        callback(err, null);
      }
      callback(null, true);
    });
  };
};

module.exports = MongooseDb;
