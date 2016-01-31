var request = require('request');
var async = require('async');
var EXP_API_KEY = 'ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
var GOOG_API_KEY = 'AIzaSyCHJKhe_B331eVlKsTLl4-FHrmvTd9lFSY';

//Figure out if flights are needed between multiple destinations?
var origin = 'Seattle';
var originAirport = 'SEA';
var numTravelers = '2';
var durationOfStay = 3;
var destinations = {
  destination1: 'Las Vegas'
  // destination2: 'Newark',
  // destination3: 'Philadelphia'
}
var monthOfTravel = 3;
var yearOfTravel = 2016;

var departureDateArray =[];
var returnDateArray=[];

function getTravelDateRange(month, callback) {

}

function createDateRange() {
  var day1 = 1;
  var numberOfDaysInThisMonth = daysInMonth(yearOfTravel, monthOfTravel);
  console.log(numberOfDaysInThisMonth);

  for(var i=0;i<numberOfDaysInThisMonth-Number(durationOfStay);i++) {
    var startDay = i+1;
    var endDay = startDay + Number(durationOfStay);
    var tempStartDate = yearOfTravel + '-' + appendZero(monthOfTravel) + '-' + appendZero(startDay);
    var tempEndDate = yearOfTravel + '-' + appendZero(monthOfTravel) + '-' + appendZero(endDay);
    departureDateArray.push(tempStartDate);
    returnDateArray.push(tempEndDate);
    console.log(departureDateArray[i] + '-----' + returnDateArray[i]);
 }
}

function appendZero(num) {
  if(num < 10){
    return '0'+String(num);
  }
  else{
    return num;
  }
}

function daysInMonth(month,year) {
   return new Date(year, month, 0).getDate();
}

// Step 1: Find airport codes:
var destinationAirportCodes = {}
var destinationLatLang = {}
function getAirportCodes(destinations, callback) {
  var destNum = 0;
  for (dest in destinations) {
    var airportUrl = 'http://terminal2.expedia.com/x/suggestions/regions?query='+destinations[dest]+'&apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
    request(airportUrl, function(error, response, body) {
      var city = JSON.parse(body);
      destinationAirportCodes[city.q] = city.sr[0].a;
      destinationLatLang[city.q] = city.sr[0].ll.lat + ',' + city.sr[0].ll.lng;
      destNum++;
      if(destNum === Object.keys(destinations).length) {
        callback(destinationAirportCodes, destinationLatLang);
      }
    });
  };
}

// Step 2: Find cheapest date to travel to each of the destinations
function getCheapestFlightToAllDestinations(destinationCode, callback) {
  console.log(destinationCode);
  var minPrice = 99999.9;
  var leg = null;
  var iter = 0;
  var depIndex = -1;
  var offerLegs = null;
  var legs = [];
  var bestData = null;
  for(var j=0;j<departureDateArray.length; j++) {
    var flightSearchUrl = 'http://terminal2.expedia.com/x/mflights/search?'+
                        'departureAirport=' + originAirport + '&' +
                        'arrivalAirport=' + destinationCode + '&' +
                        'departureDate='+departureDateArray[j]+'&'+
                        'returnDate='+returnDateArray[j]+ '&'+
                        'apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';

     request(flightSearchUrl, function (error, response, body) {
       var data = JSON.parse(body);
       if(typeof data !== 'undefined'){
         if(typeof data.offers !== 'undefined'){
           var currentPrice = parseFloat(data.offers[0].totalFare);
           if(currentPrice < minPrice) {
             minPrice = currentPrice;
             depIndex = iter;
             offerLegs = data.offers[0].legIds;
             bestData = data;
           }
         }
       }

       iter++;
       if(iter === departureDateArray.length) {
         for(var i=0; i<bestData.legs.length; i++) {
           if(bestData.legs[i].legId === offerLegs[0] || bestData.legs[i].legId === offerLegs[1]){
             legs.push(bestData.legs[i]);
           }
         }
         callback({'destination': destinationCode, 'minPrice': minPrice, 'depDate': departureDateArray[depIndex], 'arrDate': returnDateArray[depIndex], 'legs': legs});
       }
    })
  }
}

var dealsOriginTLA = 'PDX';
var dealsDestinationTLA = 'LAS';
var dealsStartDate = '2016-03-02';
var dealsEndDate = '2016-03-05';
var dealsLengthOfStay = '3';

var dealsUrl = 'http://terminal2.expedia.com/x/deals/packages?'
                +'originTLA='+dealsOriginTLA
                +'&destinationTLA='+dealsDestinationTLA
                +'&startDate='+dealsStartDate
                +'&endDate='+dealsEndDate
                +'&lengthOfStay='+ dealsLengthOfStay
                +'&apikey='+ EXP_API_KEY;

function getDeals() {
  request(dealsUrl, function (error, response, body) {
    var data = JSON.parse(body);
    var packages = data.deals.packages;
    for(var i=0; i<packages.length; i++) {
      console.log(packages[i]);
    }
  });
}

function getBestHotelInDateRange(latLang, minPriceFlightForMonth, callback) {
  console.log(latLang);
  console.log(minPriceFlightForMonth);
  var bestHotels = [];
  var hotelSearchUrl = 'http://terminal2.expedia.com/x/'+
                       'hotels?location='+latLang
                       +'&radius=5km'
                       +'&dates='+minPriceFlightForMonth.depDate+','+minPriceFlightForMonth.arrDate
                       +'&apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
  console.log(hotelSearchUrl);
  request(hotelSearchUrl, function(error, response, body) {
    var data = JSON.parse(body);

    if(typeof data.HotelInfoList !== 'undefined'){
      if(typeof data.HotelInfoList.HotelInfo !== 'undefined') {
        var hotelList = data.HotelInfoList.HotelInfo;
      }
      for(i=0; i<hotelList.length; i++) {
        if(typeof hotelList[i].Price !== 'undefined'){
          var pricePerNight = parseFloat(hotelList[i].Price.TotalRate.Value)/durationOfStay;
          var starRating = parseFloat(hotelList[i].StarRating);
          var guestRating = parseFloat(hotelList[i].GuestRating);

          if(starRating >=3.5 && guestRating > 4 && (pricePerNight)<= 200) {
            bestHotels.push(hotelList[i]);
          }
        }
      }
    }
    callback(bestHotels);
  });
}
function init(inputDest, inputDuration, inputMonth, callback) {
  destinations['destination1'] = inputDest;
  durationOfStay = inputDuration;
  monthOfTravel = inputMonth;

  console.log(destinations);
  console.log(durationOfStay);
  console.log(inputMonth);

  createDateRange();
  getAirportCodes(destinations, function(airportCodes, latLang) {
    for (code in airportCodes) {
      getCheapestFlightToAllDestinations(airportCodes[code], function(minPriceFlightForMonth) {
        console.log(minPriceFlightForMonth);
        getBestHotelInDateRange(latLang[code], minPriceFlightForMonth, function(bestHotels) {
          var response = {'flight':minPriceFlightForMonth, 'hotels': bestHotels};
          callback(response)
        })
      })
    }
  });
}

// init('Newark', 5, 3, function(response) {
//   console.log(response);
// })

module.exports = {
   findPackage: function (inputJson, res) {

    var inputDest = inputJson.destination;
    var inputDuration = inputJson.duration;
    var inputMonth = inputJson.travelDate;

    init(inputDest, inputDuration, inputMonth, function(response) {
    	console.log(response);
    	res.send(response);
    })
  }
}
