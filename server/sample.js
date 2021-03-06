 var request = require('request');
 var parser = require('json-parser');
 var departureAirport = 'SEA';
 var arrivalAirport = 'DFW';

 var travelMonth;
 var travelYear = 2016;
 var durationOfStay;
 var departureDateArray =[];
 var returnDateArray=[];
 var offersArray=[];
 var minPriceForEachDay = [];
 var optimumLegs =[];
 var mapObj = {};
 var destinationAirportCodes =[];
 var destinationLatLang = [];
 //var HashMap = require('hashmap');
//var map = new HashMap();



// returns the number of days in a month and year
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}


 // Creates all the arrival-departure date combinations for the requested month and year
function createDateRange() {
	var day1 = 1;
	var numberOfDaysInThisMonth = daysInMonth(travelYear, travelMonth);

 	for(var i=0;i<numberOfDaysInThisMonth-Number(durationOfStay);i++) {
 		var startDay = i+1;
 		var endDay = startDay + Number(durationOfStay);

 		var tempStartDate = travelYear + '-' + travelMonth + '-' + startDay;
 		var tempEndDate = travelYear + '-' + travelMonth + '-' + endDay;
 		departureDateArray.push(tempStartDate);
 		returnDateArray.push(tempEndDate);

    }

	//console.log(numberOfDaysInThisMonth)

}


function makeRequest(callback) {
var numberOfDaysInThisMonth = daysInMonth(travelYear, travelMonth);

var arrlength = 0;
for(var j=0;j<numberOfDaysInThisMonth-durationOfStay;j++) {


    //console.log(departureAirport);
    //console.log(arrivalAirport);

	var flightSearchUrl = 'http://terminal2.expedia.com/x/mflights/search?'+
                       'departureAirport=' + departureAirport + '&' +
                       'arrivalAirport=' +arrivalAirport + '&' +
                       'departureDate='+departureDateArray[j]+'&'+
                       'returnDate='+returnDateArray[j]+ '&'+
                       'apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
   // console.log(flightSearchUrl);

	 request(flightSearchUrl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
        var tempOffers = parser.parse(body).offers;
        //console.log(tempOffers);
        var legs = parser.parse(body).legs;

         for(var n=0;n<legs.length;n++) {
             mapObj[legs[n].legId] = legs[n].segments;
         }


        //console.log(tempOffers.length);
	  	offersArray.push(tempOffers);
        //console.log(offersArray.length);
	    arrlength++;

	    if(arrlength === numberOfDaysInThisMonth-durationOfStay) {
	    	//console.log(parser.parse(offersArray[0]);
	    	//console.log('here offers array' + offersArray.length);
	    	callback(offersArray);
	    }
       }
	})
}

}

function getAirportCodes(destinations, callback) {
 //var destNum = 0;
 //for (dest in destinations) {
   var airportUrl = 'http://terminal2.expedia.com/x/suggestions/regions?query='+destinations+'&apikey=ZGFHz2FBGb4Sbd7f8zJGYDy1HYRFnMGS';
   request(airportUrl, function(error, response, body) {
     var city = JSON.parse(body);
     destinationAirportCodes = city.sr[0].a;
     destinationLatLang = city.sr[0].ll.lat + ',' + city.sr[0].ll.lng;
     //destNum++;
     //if(destNum === Object.keys(destinations).length) {
       callback(destinationAirportCodes, destinationLatLang);
     //}
   });
 //};
}
function getBestFlightOfferForPerDayDup(arr1) {

    for(var k=0;k<arr1.length;k++) {
      var minPrice = 999999.0;
      //var legIDs = [];
      var minValueIndex=0;
      //for(var m=0;m<arr1[k].length;m++){
        var price = arr1[k][0].totalFarePrice.amount;


        //console.log(legIDs);
        //if(parseFloat(price)<minPrice) {
         // minPrice = parseFloat(price);
          //minValueIndex = m;
          //legIDs.push(arr1[k][m].legIds);

          //}
      //}

      minPriceForEachDay[k] = price;
      optimumLegs[k] = arr1[k][0].legIds;
      console.log(arr1[k][minValueIndex].legIds);

    }


}

function getBestFlightOfferForPerDay(arr1) {

    for(var k=0;k<arr1.length;k++) {
    	var minPrice = 999999.0;
    	//var legIDs = [];
    	var minValueIndex=0;
    	for(var m=0;m<arr1[k].length;m++){
    		var price = arr1[k][m].totalFarePrice.amount;


    		//console.log(legIDs);
    		if(parseFloat(price)<minPrice) {
    			minPrice = parseFloat(price);
    			minValueIndex = m;
    			//legIDs.push(arr1[k][m].legIds);

    	    }
    	}

    	minPriceForEachDay[k] = minPrice;
    	optimumLegs[k] = arr1[k][minValueIndex].legIds;
      //console.log(arr1[k][minValueIndex].legIds);

    }


}



function init(destinationAirport, inputDuration, inputMonth, callback) {
	console.log('Inside INit');
	durationOfStay = inputDuration;
	console.log(durationOfStay);
  travelMonth = inputMonth;
createDateRange();
getAirportCodes(destinationAirport, function(destinationAirportCodes, destinationLatLang) {
//console.log(destinationAirportCodes);
  arrivalAirport = destinationAirportCodes;


makeRequest(function(arr1) {

  var responseJsonArray = [];
	getBestFlightOfferForPerDayDup(arr1);
  //console.log(mapObj);
  var responseJson = { };
  var segments = [];
	for(var t=0;t<arr1.length;t++)  {
		//console.log(minPriceForEachDay[k]+"---"+ departureDateArray[k] +"-----"+returnDateArray[k]);
		//console.log(optimumLegs[k]);
    //console.log(mapObj);
    responseJson.price = minPriceForEachDay[t];
    responseJson.departuredate = departureDateArray[t];
    responseJson.returnDate = returnDateArray[t];
    responseJson.legid = optimumLegs[t];

    for(var x=0;x<optimumLegs[t].length;x++) {
      //console.log(optimumLegs[t][x]+'-------'+mapObj[optimumLegs[t][x]]);
      segments.push(mapObj[optimumLegs[t][x]]);
    }
    responseJson.segments = segments;
    //console.log(mapObj[optimumLegs[0]]);

    //console.log(mapObj[optimumLegs[t][0]]);


    responseJsonArray.push(responseJson);
    responseJson = {};
    segments = [];
	}
	//console.log(responseJsonArray);
  for(var y=0;y<arr1.length;y++) {
//console.log(responseJsonArray[y]. price +'--'+responseJsonArray[0].departuredate);
//console.log(responseJsonArray[y].segments);

  }
	callback(responseJsonArray);
});

});

}





module.exports = {
 run: function (inputJson, res) {

  console.log(inputJson.duration);
  console.log(inputJson.destination);
  console.log(inputJson.travelDate);

    var inputDest = inputJson.destination;
  var inputDuration = inputJson.duration;
  var inputMonth = inputJson.travelDate;
console.log(Number(inputDuration));
  console.log(inputDest + Number(inputDuration) + inputMonth);
  init(inputDest, inputDuration, inputMonth, function(responseJsonArray) {
  	console.log(responseJsonArray);
  	//res.send(responseJsonArray);
  })
}

}
