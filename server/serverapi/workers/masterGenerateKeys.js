"use strict";

var workerFarm = require("worker-farm");

/////////
var keyWorker = workerFarm(require.resolve("./workerGenerateKeys"));

var loopCount = 0;
var countMax = 20;
var startRun = new Date();

var _loop = function _loop() {
  var workerNumber = counter;
  var generateKeysOptions = {
    bits: 2048,
    workers: 2,
    keyindex: workerNumber,
    datapath: "ut/keys"
  };
  /// generate keys
  keyWorker(generateKeysOptions, function (err, result) {
    var runTime = new Date() - startRun;
    if (err) {}
    // console.log('2.masterGenerateKeys keyWorker error : ', workerNumber, err);

    // console.log(`4.masterGenerateKeys - ${workerNumber} : runTime : ${runTime} : ${result}`);
    if (workerNumber === countMax + 1) workerFarm.end(keyWorker);
  });
};

for (var counter = 1; counter < countMax + 1; counter++) {
  _loop();
}
/////////