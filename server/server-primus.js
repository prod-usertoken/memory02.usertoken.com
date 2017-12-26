"use strict";

var PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
//
// Require all dependencies.
//
var bodyParser = require("body-parser"),
    express = require("express"),
    http = require("http"),
    Gun = require("gun"),
    levelup = require("levelup"),
    leveldown = require("leveldown"),
    Primus = require("primus");

require("./vendors/gun-level");

var levelDB = levelup("./data/keys-data/", {
  db: leveldown
});
var gun = new Gun({
  level: levelDB,
  file: false
});

var gunPeers = []; // used as a list of connected clients.

Gun.on("out", function (msg) {
  this.to.next(msg);
  msg = JSON.stringify(msg);
  console.log("1.Gun out : ", msg);
  gunPeers.forEach(function (peer) {
    peer.send(msg);
  });
});

var authorize = require("./authorize");
// const { useGun } = require('./useGun');
// const { openGun } = require('./openGun');
//
// Create an Express and Primus server.
//
var app = express();
var server = http.createServer(app),
    primus = new Primus(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
// useGun(primus);

// save current in memory primus.js for frontend access
primus.save(__dirname + "/primus.js");
//
// Add the authorization hook.
//
primus.authorize(authorize);

//
// `connection` is only triggered if the authorization succeeded.
//
primus.on("connection", function connection(spark) {
  gunPeers.push(spark);
  console.log("1.connection : SUCCESS : ", spark.id);
  var SUCCESS = { type: "authenticated", payload: "success" };
  spark.write(SUCCESS);

  spark.on("data", function (msg) {
    console.log("1.spark on data : ", msg);
    gunPeers.forEach(function (peer) {
      console.log("1.spark on gunPeers : ", msg);
      peer.send(msg);
    });
    msg = JSON.parse(msg);
    console.log("2.spark data : ", msg);
    if ("forEach" in msg) msg.forEach(function (m) {
      console.log("3.spark data : ", m);
      gun.on("in", JSON.parse(m));
    });else {
      gun.on("in", msg);
    }
  });

  spark.on("message", function (msg) {
    console.log("1.spark on gunPeers message : ", msg);
    gunPeers.forEach(function (peer) {
      peer.send(msg);
    });
    msg = JSON.parse(msg);
    console.log("4.spark message : ", msg);
    if ("forEach" in msg) msg.forEach(function (m) {
      console.log("5.spark message : ", m);
      gun.on("in", JSON.parse(m));
    });else {
      gun.on("in", msg);
    }
  });

  spark.on("close", function (reason, desc) {
    // gunpeers gone.
    console.log("1.spark on close : ", reason, desc);
    var i = gunPeers.findIndex(function (p) {
      return p === connection;
    });
    if (i >= 0) gunPeers.splice(i, 1);
  });

  spark.on("error", function (error) {
    console.log("WebSocket Error:", error);
  });

  return;
});

//
// Begin accepting connections.
//
server.listen(PORT, function listening() {
  console.log("Open http://localhost:" + PORT + " in your browser");
});