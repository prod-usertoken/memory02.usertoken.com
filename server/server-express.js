"use strict";

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var Gun = require("gun");
require("./vendors/gun-level");

var app = express();
// const levelup = require("levelup");
// const leveldown = require("leveldown");

// const levelDB = levelup("data/keys-data", {
//   db: leveldown
// });

var API = require("./serverapi/index");
var api = API.api;
// const s3Options = require("./configs/s3");
var gunPeers = [];
//const gunPeers = ['https://ut.usertoken.com/gun'];
app.use(Gun.serve);
app.use(express.static(__dirname + "../public"));
app.use(favicon(path.join(__dirname, "../public/images", "favicon.ico")));

app.use("*", function (req, res) {
  return api(req, res);
});
var server = app.listen(port);
var CLOUD_MEMORIES = "https://tropospheric.mybluemix.net/gun";
Gun({
  web: server,
  peers: CLOUD_MEMORIES
});

console.log("Server started on port " + port + " with /gun");