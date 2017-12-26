"use strict";

var _exports = module.exports = {};

///// Main API ////
_exports.api = function (req, res) {
  // get the path of URL request
  var path = req.originalUrl;
  // console.log('1.api path : ', path);
  switch (path) {
    case "/login":
      apiLogin(req, res);
      break;
    default:
      apiErrorPage(req, res);
      break;
  }
  return;
};
//////////// API helpers ////////
var apiLogin = function apiLogin(req, res) {
  res.status(200).send("LOGIN");
  return;
};

var apiErrorPage = function apiErrorPage(req, res) {
  res.status(404).send("page not found");
  return;
};