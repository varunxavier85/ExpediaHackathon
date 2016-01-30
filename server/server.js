var express = require('express');
var app = express();

app.get('/', function() {
  console.log('HelloWorld!');
})

port = process.env.PORT || 3000;
app.listen(port)
console.log('Magic happens on port:' + port);
