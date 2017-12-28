"use strict";

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
// const Gun = require("gun");
var app = express();
var Primus = require("primus");
require("dotenv").config();

var _require = require("./api/gundb"),
    Gun = _require.Gun,
    gun = _require.gun;

var authorize = require("./authorize");

var _require2 = require("./serverapi/index"),
    api = _require2.api;

var _require3 = require("../configs/memories"),
    ROOT_MEMORIES = _require3.ROOT_MEMORIES,
    DATA_FILE = _require3.DATA_FILE;

// const s3options = JSON.parse(JSON.stringify(process.env.s3options));


app.use(Gun.serve);
app.use(express.static(__dirname + "/../public"));
app.use(favicon(path.join(__dirname, "/../public/images", "favicon.ico")));

app.use("*", function (req, res) {
  return api(req, res);
});
var server = app.listen(port);

// console.log("Server started on port " + port + " peers : ", peerMemories);
// const gun = Gun({
//   s3: s3options,
//   file: DATA_FILE,
//   web: server,
//   peers: ROOT_MEMORIES
// });
// const gunOptions = {
//   s3: s3options,
//   file: DATA_FILE + "-file",
//   web: server,
//   peers: ROOT_MEMORIES
// };

console.log("1.server options : ", gunOptions);

// const gun = Gun(gunOptions);

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

var primusOptions = { iknowclusterwillbreakconnections: true };
var primus = new Primus(server, primusOptions);
// const primus = new Primus(server);
// save current in memory primus.js for frontend access
primus.save(__dirname + "/primus.js");
//
// Add the authorization hook.
//
primus.authorize(authorize);

//
// `connection` is only triggered if the authorization succeeded.
//
// const Main = () =>
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