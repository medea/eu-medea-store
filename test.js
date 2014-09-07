var http = require('http');
var Eu = require('eu');
var medea = require('medea');
var MedeaStore = require('./medea_store');

var db = medea();

var store = new MedeaStore(db);
var cache = new Eu.Cache(store, 'test');

var eu = new Eu(cache);
var server = http.createServer(function(req, res) {
  var date = new Date();

  res.writeHead(200,
    { 'Date': date.toUTCString(), 'Cache-Control': 'max-age=5' });

  console.log("Server hit!");

  res.end('Hello ' + date);
});

db.open('./.data', function() {
  server.listen(3000, function(err) {
    setInterval(function() {
      eu.get('http://localhost:3000', function(err, res, body) {
        console.log("Client: " + body);
      });
    }, 1000);
  });
});

['SIGINT', 'SIGTERM'].forEach(function(signal) {
  process.on(signal, function() {
    db.close(process.exit);
  });
});

