"use strict";

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
var host = process.env.OPENSHIFT_NODEJS_HOST || process.env.VCAP_APP_HOST || process.env.HOST || "localhost";

require("dotenv").config();
var s3options = JSON.parse(JSON.stringify(process.env.s3options));
var Gun = require("gun");
var server = require("http").createServer(function (req, res) {
  if (Gun.serve(req, res)) {
    return;
  } // filters gun requests!
  require("fs").createReadStream(require("path").join(__dirname + "/../public/", req.url)).on("error", function () {
    // static files!
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(require("fs").readFileSync(require("path").join(__dirname + "/../public/", "index.html") // or default to index
    ));
  }).pipe(res); // stream
});

var gun = Gun({
  file: "data.json",
  web: server,
  s3: s3options
});
// Sync everything
gun.on("out", { get: { "#": { "*": "" } } });

server.listen(port);

console.log("Server started on port " + port + " with /gun");