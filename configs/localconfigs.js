"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/////
var HOSTNAME = exports.HOSTNAME = "memory02.pointlook.com";
var DATA_FILE = exports.DATA_FILE = "data/data-" + HOSTNAME;
var DEVICE_ID = exports.DEVICE_ID = false;
/////
var GRAPHQL = exports.GRAPHQL = "https://" + HOSTNAME + "/api/graphql";
var DBFILE = exports.DBFILE = DATA_FILE;
var DEBUG = exports.DEBUG = false;
var DEBUG_LOG_URL = exports.DEBUG_LOG_URL = "https://logentries.com/app/a092e388";
/////
//export const MY_MEMORY =
//  !window ||
//  !window.location ||
//  !window.location.protocol ||
//  !window.location.host
//    ? "https://m2-alex2006hw-gmail.7e14.starter-us-west-2.openshiftapps.com/gun"
//    : window.location.protocol + "//" + window.location.host + "/gun";
//
//export const CLOUD_MEMORIES = MY_MEMORY;
//export const DEV_CLOUD_MEMORIES = [
//  "https://dev-ut-redhat.193b.starter-ca-central-1.openshiftapps.com/gun",
//  "https://dev-ut-memtwo.193b.starter-ca-central-1.openshiftapps.com/gun"
//];
//export const ROOT_MEMORIES = [
//  "https://tropospheric.mybluemix.net/gun",
//  "https://tropospheric-tropospheric.193b.starter-ca-central-1.openshiftapps.com/gun"
//];
//export const MY_MEMORY = "https://memory02.alex2006hw.com/gun";
//export const ROOT_MEMORIES = [
//  "https://memory02.alex2006hw.com/gun",
//  "https://memory02.pointlook.com/gun",
//  "https://memory02.usertoken.com/gun"
//];
//export const PEER_MEMORIES = [
//  "https://tropospheric.mybluemix.net/gun",
//  "https://tropospheric-tropospheric.193b.starter-ca-central-1.openshiftapps.com/gun",
//  "https://memory02-memory02-pl.193b.starter-ca-central-1.openshiftapps.com/gun",
//  "https://m2-admin-ut-m2-admin-ut.193b.starter-ca-central-1.openshiftapps.com/gun",
//  "https://m2-alex2006hw.193b.starter-ca-central-1.openshiftapps.com/gun",
//  "https://m2-memtwo.193b.starter-ca-central-1.openshiftapps.com/gun"
//];