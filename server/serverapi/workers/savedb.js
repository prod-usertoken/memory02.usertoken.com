"use strict";

var Gun = require("gun");
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

// module.exports.generateKeys = (options = {bits: 2048, workers: 2, keyindex: 1}) => {
//   // console.log('1.generateKeys : ', options);
//   const data = options;
//   makeKey(data);
//   return
// }
module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    db: gun.get("ut"),
    dbpath: "unassigned-key",
    value: "empty-value"
  };
  var cb = arguments[1];

  // console.log('1.generateKeys : ', options);
  var data = options;
  saveValue(data, cb);
  return;
};
///////////////
// const makeKey = (data) => {
//   const options = { bits: data.bits, workers: data.workers };
//   // console.log('1.encryptions makeKey : ', data);
//   rsa.generateKeyPair(options, (err, keypair) => {
//     // keypair.privateKey, keypair.publicKey
//     // const signature = md5(keypair);
//     // (err)? console.log('1.encryptions makeKey error : ', err)
//     // :console.log('1.generateKeys keypairs : ', keypair);
//
//     const key = serialize(keypair);
//     const signature = md5(key);
//     // md.update(key);
//     // const signature = md.digest().toHex();
//     // console.log(`2.encryptions generateKeys signature : ${signature}`);
//
//     const serverkeys = gun.get('ut');
//     const datapath = data.datapath;
//     const keyindex = data.keyindex;
//     serverkeys.get(`${datapath}/serverkeys/${keyindex}`).put({keypair: key, signature: signature});
//     serverkeys.get(`${datapath}/serverkeys/${keyindex}`).get('keypair').val( key => {
//       // md.update(key);
//       // const signature = md.digest().toHex();
//       let savedSignature;
//       // (key === '5e543256c480ac577d30f76f9120eb74')?
//       (!key)? savedSignature = 'undefined' : savedSignature = md5(key);
//       // const savedKeypair = deserialize(key);
//
//       // verify savedSignature same as signature
//       // console.log('3.encryptions verify makeKey : ', savedSignature === signature);
//     });
//   });
//   return
// }
////// END makeKey ///////
var saveValue = function saveValue(data, cb) {
  var options = data;
  var db = options.db,
      dbpath = options.dbpath,
      value = options.value;

  db.path("" + dbpath).put(value);
  db.path("" + dbpath).val(function (savedValue) {
    // verify saveValue === inputValue
    var verify = value === savedValue;
    cb(verify);
    // console.log('1.saveValue verify : ', verify)
  });
  return;
};