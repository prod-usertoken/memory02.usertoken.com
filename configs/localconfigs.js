"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/////
var HOSTNAME = exports.HOSTNAME = "memory02.usertoken.com";
var DATA_FILE = exports.DATA_FILE = "data/data-" + HOSTNAME + "-server";
var DEVICE_ID = exports.DEVICE_ID = false;
var CLOUD_MEMORIES = exports.CLOUD_MEMORIES = ["https://memory02-memory02-ut.193b.starter-ca-central-1.openshiftapps.com/gun", "https://memtwo-memory02.193b.starter-ca-central-1.openshiftapps.com/gun"];
var MY_MEMORY = exports.MY_MEMORY = "https://memory02.usertoken.com";
var PEER_MEMORIES = exports.PEER_MEMORIES = ["https://memory02.alex2006hw.com/gun", "https://memory02.pointlook.com/gun", "https://memory02.usertoken.com/gun"];
var CHILD_MEMORIES = exports.CHILD_MEMORIES = ["https://tropospheric.mybluemix.net/gun", "https://tropospheric-tropospheric.193b.starter-ca-central-1.openshiftapps.com/gun", "https://memory02-memory02-pl.193b.starter-ca-central-1.openshiftapps.com/gun", "https://memory02-memory02-ut.193b.starter-ca-central-1.openshiftapps.com/gun", "https://memory02-memory02-alex.193b.starter-ca-central-1.openshiftapps.com/gun", "https://memtwo-memory02.193b.starter-ca-central-1.openshiftapps.com/gun"];
/////
var GRAPHQL = exports.GRAPHQL = "https://" + HOSTNAME + "/api/graphql";
var DBFILE = exports.DBFILE = DATA_FILE;
var DEBUG = exports.DEBUG = false;
var DEBUG_LOG_URL = exports.DEBUG_LOG_URL = "https://logentries.com/app/a092e388";