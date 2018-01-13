'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putAppState = exports.getAppState = exports.putCloudState = exports.getCloudState = undefined;

var _localconfigs = require('../configs/localconfigs');

var _serverMemories = require('../configs/serverMemories');

console.log('0.jobworker commChannels : ', _localconfigs.DEVICE_ID, _serverMemories.ROOT_MEMORIES, _serverMemories.MY_MEMORY);

var Gun = require('gun');
require('gun/lib/not.js');
require('gun/lib/path.js');
require('gun-unset');

var gunOptions = {
  peer: _serverMemories.ROOT_MEMORIES
};
var gun = Gun(gunOptions);

gun.on('out', { get: { '#': { '*': '' } } });

var gunLocal = Gun(_serverMemories.MY_MEMORY);

// local channels
var appState = gunLocal.get(_localconfigs.DEVICE_ID + '/state');

// cloud channels
var cloudAlive = gun.get('alive');
var cloudState = gun.get(_localconfigs.DEVICE_ID + '/state');
var cloudPeers = gun.get(_localconfigs.DEVICE_ID + '/peers');

var getAppState = function getAppState(key) {
  //  console.log('1.jobworker commChannels getAppState ', key);
  appState.get(key).val(function (v) {
    console.log('1.jobworker commChannels getAppState ', key, v);
    return v;
  });
};
var getCloudState = function getCloudState(key) {
  //  console.log('1.jobworker commChannels getCloudState ', key);
  cloudState.get(key).val(function (v) {
    console.log('1.jobworker commChannels getCloudState ', key, v);
    return v;
  });
};
var putAppState = function putAppState(key, value) {
  console.log('1.jobworker commChannels putAppState ', key, value);
  appState.get(key).put(value);
};
var putCloudState = function putCloudState(key, value) {
  console.log('1.jobworker commChannels putCloudState ', key, value);
  cloudState.get(key).put(value);
};
var heartBeat = function heartBeat() {
  var beat = new Date().toISOString();
  //  console.log('1.jobworker commChannels heartBeat : ', beat);
  try {
    cloudAlive.path('HEART_BEAT').put({ id: _localconfigs.DEVICE_ID, date: beat });
  } catch (e) {}
};
var registerWorker = function registerWorker(id) {
  var currentDate = new Date().toISOString();
  console.log('1.jobworker commChannels registerWorker : ', id);
  try {
    var newPeer = gun.get(id);
    // first timer heard from this peer
    cloudPeers.get('peers-radius-1').set(newPeer).get('alive').not(function (key) {
      console.log('3.jobworker commChannels registerWorker NEW peer : ', key, id);
      // add this peer to peer-radius-1
      cloudPeers.get('peers-radius-1').set(newPeer).get('alive').put(currentDate);
    });
    // heard from this worker before
    cloudPeers.get('peers-radius-1').set(newPeer).get('alive').val(function (lastAlive) {
      console.log('4.jobworker commChannels registerWorker ', id, ' lastAlive ', lastAlive);
      cloudPeers.get('peers-radius-1').set(newPeer).get('lastAlive').put(lastAlive);
    });
    cloudPeers.get('peers-radius-1').set(newPeer).get('alive').put(currentDate);
    console.log('5.jobworker commChannels registerWorker ', id, ' now ', currentDate);
  } catch (e) {}
};

var timeout;

var heartbeat_stop = function heartbeat_stop() {
  clearInterval(timeout);
  console.log('1.jobworker commChannels The heartbeat has been stopped');
};

var heartbeat_start = function heartbeat_start() {
  var beat_interval = 3000; // 3 sec
  timeout = setInterval(heartBeat, beat_interval);
  //  console.log(
  //    '1.jobworker commChannels heartbeat_start at',
  //    beat_interval / 1000,
  //    'second intervals',
  //  );
};
//const HYPER_PORT = process.env.HYPER_PORT || 3030;
//const HYPER_HOST = process.env.HYPER_HOST || 'localhost';
//const HYPER_URL = `http://${HYPER_HOST}:${HYPER_PORT}/batch`;
//
//cloudState.get('HYPER_URL').put(HYPER_URL)

heartbeat_start();
cloudAlive.path('HEART_BEAT').get('id').on(function (id) {
  if (id !== _localconfigs.DEVICE_ID) registerWorker(id);
});

exports.getCloudState = getCloudState;
exports.putCloudState = putCloudState;
exports.getAppState = getAppState;
exports.putAppState = putAppState;