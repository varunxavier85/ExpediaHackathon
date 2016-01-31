var express = require('express');
var app = express();
var pFreeText = require('./parsefreetext');

app.get('/', function(req, res) {
  pFreeText.getKeyWords('trip to los angeles in march for 5 days', res);
});

//pFreeText.getKeyWords('trip to los angeles in march, book hotel sheraton, 2 days for 1000 dollars', 'res');

port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens on port:' + port);
