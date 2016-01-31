var express = require('express');
var app = express();
var pFreeText = require('./parsefreetext');

app.get('/', function(req, res) {
  console.log('HelloWorld!');
  pFreeText.getKeyWords('trip to los angeles in march 2017, book hotel sheraton, two month for 1000 dollars', res);
})

pFreeText.getKeyWords('trip to los angeles in march 2017, book hotel sheraton, 2 days for 1000 dollars', 'res');

port = process.env.PORT || 3000;
//app.listen(port);
console.log('Magic happens on port:' + port);
