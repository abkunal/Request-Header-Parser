// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.use(function(req, res, next) {
  var json = {};
  var headers = req.headers;
  
  // extract ip adress
  var endComma = headers["x-forwarded-for"].indexOf(",");
  if (endComma == -1) {
    endComma = headers["x-forwarded-for"].length;
  }
  json.ipaddress = headers["x-forwarded-for"].substring(0, endComma);
  
  // extract language
  endComma = headers["accept-language"].indexOf(",");
  if (endComma == -1) {
    endComma = headers["accept-language"].length;
  }
  json.language = headers["accept-language"].substring(0, endComma);
  
  // extract system information
  var startParen = headers["user-agent"].indexOf("(") + 1;
  var endParen = headers["user-agent"].indexOf(")");
  json.software = headers["user-agent"].substring(startParen, endParen);
  res.end(JSON.stringify(json));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
