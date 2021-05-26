"use strict";

var hooks = require("hooks");
var mongo = require('../../orchestrator/node_modules/mongodb');
var config = require('../../orchestrator/config');

hooks.beforeEach(function (transaction, done) {
  hooks.log("before");
  mongo.MongoClient.connect(config.mongodb.url, function(err, db) {
    if (err) {throw err;}
    hooks.log("Entering Database!");
    var dbo = db.db("flowbroker_admin");
    var myobj = {
      "heads": [],
      "devices": [],
      "templates": [],
      "red": [],
      "enabled": true,
      "label": "firstflow",
      "id": "123456",
      "created": new Date('2014-01-22T14:56:59.301Z'),
      "updated": new Date('2014-01-22T14:56:59.301Z')
    };
    dbo.collection("flows").insertOne(myobj, function(err) {
      if (err) {throw err;}
      hooks.log("1 flow inserted");
      db.close();
    });
    done();
  });
});
