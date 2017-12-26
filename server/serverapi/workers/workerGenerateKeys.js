"use strict";

var Gun = require("gun/gun");
require("gun/lib/path.js");
var forge = require("node-forge");
var serialize = require("serialize-javascript");
var deserialize = function deserialize(serializedJavascript) {
  return eval("(" + serializedJavascript + ")");
};
var md5 = require("blueimp-md5");
// const md = forge.md.md5.create();

var gun = Gun(["//gun"]);
var rsa = forge.pki.rsa;
// var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
module.exports = function (options, cb) {
  var data = options;
  makeKey(data, function (err, result) {
    var oldData = data;
    var callback = cb;
    // regenerate key on error
    if (err) makeKey(oldData, callback);
  });
  return;
};

// module.exports = (options = {bits: 2048, workers: 2, keyindex: 1}, cb) => {
//   // console.log('1.generateKeys : ', options);
//   const data = options;
//   makeKey(data);
//   return
// }
// module.exports.savedb = (options = {db: gun.get('ut'), dbpath: 'unassigned-key', value: 'empty-value'}) => {
//   // console.log('1.generateKeys : ', options);
//   const data = options;
//   saveValue(data);
//   return
// }
///////////////
var makeKey = function makeKey(data, callback) {
  var options = { bits: data.bits, workers: data.workers };
  var cb = callback;
  // console.log('1.workerGenerateKeys makeKey : ', data);
  rsa.generateKeyPair(options, function (err, keypair) {
    // keypair.privateKey, keypair.publicKey
    // const signature = md5(keypair);
    // (err)? console.log('1.workerGenerateKeys makeKey error : ', err)
    // :console.log('1.generateKeys keypairs : ', keypair);

    var key = serialize(keypair);
    var signature = md5(key);
    // md.update(key);
    // const signature = md.digest().toHex();
    // console.log(`2.workerGenerateKeys generateKeys signature : ${signature}`);

    var serverkeys = gun.get("ut");
    var datapath = data.datapath;
    var keyindex = data.keyindex;
    serverkeys.get(datapath + "/serverkeys/" + keyindex).put({ keypair: key, signature: signature });
    serverkeys.get(datapath + "/serverkeys/" + keyindex).get("keypair").val(function (key) {
      // md.update(key);
      // const signature = md.digest().toHex();
      var savedSignature = void 0;
      // (key === '5e543256c480ac577d30f76f9120eb74')?
      !key ? savedSignature = "undefined" : savedSignature = md5(key);
      // const savedKeypair = deserialize(key);

      // verify savedSignature same as signature
      var verify = savedSignature === signature;
      // console.log(`3.workerGenerateKeys ${keyindex} : ${signature} : ${savedSignature} ${verify}`);
      var err = verify ? null : "signature error";
      cb(err, verify);
    });
  });
  return;
};
////// END makeKey ///////
// const saveValue = (data) => {
//   const options = data;
//   const { db, dbpath, value } = options;
//   db.path(`${dbpath}`).put(value);
//   db.path(`${dbpath}`).val(savedValue => {
//     // verify saveValue === inputValue
//     const verify = value === savedValue;
//     // console.log('1.saveValue verify : ', verify)
//   });
//   return
// }