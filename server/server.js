var express = require('express');
var app = express();
var pFreeText = require('./parsefreetext');

app.get('/', function(req, res) {
  pFreeText.getKeyWords('trip to los angeles in march 2017, book hotel sheraton, two month for 1000 dollars', res);
})

pFreeText.getKeyWords('need a fly to portland in november for twelve days', 'res');

port = process.env.PORT || 3000;
//app.listen(port);
console.log('Magic happens on port:' + port);
