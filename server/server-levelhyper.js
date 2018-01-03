"use strict";

require("dotenv").config();
Object.assign = require("object-assign");

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
// var Gun = require("gun");
var app = express();
var levelup = require("levelup");
var leveldown = require("leveldown");
var levelHyper = require("level-hyper");
var Primus = require("primus");
var Gun = require("gun");
// const { Gun, gun } = require("./api/gundb");
var gunlevel = require("./vendors/gun-level");

var _require = require("../configs/serverMemories"),
    ROOT_MEMORIES = _require.ROOT_MEMORIES;

var _require2 = require("../configs/localconfigs"),
    DATA_FILE = _require2.DATA_FILE;

var authorize = require("./authorize");

var _require3 = require("./serverapi/index"),
    api = _require3.api;

var levelDB = levelHyper(DATA_FILE + "-level");
gunlevel();

// levelDB.on('ready', function () {
//   var name = String(Date.now())
//   levelDB.db.liveBackup(name, function (err) {
//     if (!err) console.log('backup to %s was successful', name)
//   })
// });

// var levelDB = levelup("data/www-db-data", {
//   db: leveldown
// });
// console.log('process.env : ', process.env);

var s3options = process.env.s3options ? JSON.parse(JSON.stringify(process.env.s3options)) : {};

app.use(Gun.serve);
app.use(express.static(__dirname + "/../public"));
app.use(favicon(path.join(__dirname, "/../public/images", "favicon.ico")));

app.use("*", function (req, res) {
  return api(req, res);
});

var VERSION = "0.0.4";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

var server = app.listen(port);

// console.log(
//   "[" + VERSION + "]",
//   "Server started on port " + port + " with memory"
// );
var gunOptions = {
  level: levelDB,
  s3: s3options,
  file: false,
  web: server,
  peer: ROOT_MEMORIES
};

// console.log("1.server-levelhyper options : ", gunOptions);

var gun = Gun(gunOptions);

var gunClients = []; // used as a list of connected clients.
gun.on("out", { get: { "#": { "*": "" } } });
// gun.on("out", function(msg) {
//   jsonmsg = JSON.stringify(msg);
//   console.log("1.Gun out : ", jsonmsg);
//   gunClients.forEach(function(client) {
//     client.send(jsonmsg);
//   });
//   this.to.next(msg);
// });

// var primusOptions = { iknowclusterwillbreakconnections: true };
// var primus = new Primus(server, primusOptions);
var primus = new Primus(server);
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
module.exports = server;