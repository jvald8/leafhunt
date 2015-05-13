var MongooseDb = require('./mongoose-db.js');
var db = new MongooseDb('localhost', 27017, 'leafhunt', 'launches');


exports.createLaunch = function(newLaunch, callback) {
  db.createObject(newLaunch, callback);
}

exports.getLaunch = function(id, callback) {
  db.readObject(id, callback);
}

exports.updateLaunch = function(id, callback) {
  return db.updateObject(id, newLaunch, callback);
}

exports.deleteLaunch = function(id, callback) {
  return db.deleteObject(id, callback);
}
