var request = require('request');

var EXP_API_KEY = 'ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
var GOOG_API_KEY = 'AIzaSyCHJKhe_B331eVlKsTLl4-FHrmvTd9lFSY';

var destinations = {
  destination1: 'Rome',
  destination2: 'Venice',
  destination3: 'Milan'
}

var destinationAirportCodes = []
function getAirportCodes(destinations, callback) {
  var destNum = 0;
  for (dest in destinations) {
    var airportUrl = 'http://terminal2.expedia.com/x/suggestions/regions?query='+destinations[dest]+'&apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
    request(airportUrl, function(error, response, body) {
      var city = JSON.parse(body);
      destinationAirportCodes.push(city.sr[0].a);
      destNum++;
      if(destNum === Object.keys(destinations).length) {
        callback(destinationAirportCodes);
      }
    });
  };
}
