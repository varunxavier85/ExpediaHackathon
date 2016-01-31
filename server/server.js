var express = require('express');
var app = express();
var cors = require('cors');
var pFreeText = require('./parsefreetext');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());

app.options('*', cors());

app.post('/api/flightsFromVoice', function(req, res) {
  pFreeText.getKeyWords(req.body['searchText'], res);
});

app.get('/api/packages', function(req, res) {

})

pFreeText.getKeyWords('new york book hotel sheraton, 2 days for 1000 dollars March', 'res');

port = process.env.PORT || 3000;
//app.listen(port);
console.log('Magic happens on port:' + port);
