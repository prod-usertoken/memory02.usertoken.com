"use strict";

var cluster = require("cluster"),
    os = require("os");

var cpus = os.cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker) {
    console.warn("worker " + worker.process.pid + " died");
  });
} else {
  require("./server");
}