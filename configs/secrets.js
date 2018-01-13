'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prodConfig = exports.prodConfig = {
  apiKey: 'XXXXXXXX',
  authDomain: 'memory02.firebaseapp.com',
  databaseURL: 'https://memory02.firebaseio.com',
  projectId: 'memory02',
  storageBucket: 'memory02.appspot.com',
  messagingSenderId: 'YYYYYYYY'
};
var devConfig = exports.devConfig = prodConfig;
var DEBUG_KEY = exports.DEBUG_KEY = {
  signature: 'DEBUG_UserToken',
  public: 'DEBUG_UserToken-publickey-value',
  private: 'DEBUG_UserToken-privatekey-value'
};
var ENCRYPTION_KEY = exports.ENCRYPTION_KEY = 'ZZZZZZZZ';
var LE_TOKEN = exports.LE_TOKEN = 'LLLLLLLL';
var ERROR_KEY = exports.ERROR_KEY = {
  key: 'KKKKKKKK',
  projectId: 'memory02',
  service: 'memory02.usertoken.com',
  version: '1.0.0',
  reportUncaughtExceptions: true,
  disabled: false,
  context: { user: 'memory02-user' }
};