var pythonShell = require('python-shell');
var getFlights = require('./sample');
var cities = ['seattle', 'los angeles', 'portland'];
var newcities = ['york', 'orleans'];
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

module.exports = {
    getKeyWords: function(searchText, res) {
        var pyshell = new pythonShell('RAKE-tutorial/getkeywords.py', {
            args: [searchText]
        });

        pyshell.on('message', function(keywords) {
            var searchCriteria = {};
            keywords = keywords.replace('[', '');
            keywords = keywords.replace(']', '');
            keywords = keywords.replace(/(\r\n|\n|\r)/gm, '');
            keywords = keywords.toLowerCase();
            keywords = keywords.split(',');

            for (var i = 0; i < keywords.length; i++) {
                var currKeyword = keywords[i].trim();
                currKeyword = currKeyword.replace("'", "");
                currKeyword = currKeyword.replace("'", "");
                console.log(currKeyword);

                if (cities.indexOf(currKeyword) > -1) {
                    searchCriteria.destination = currKeyword;
                    continue;
                }

                if (getMonthFromString(currKeyword) > -1) {
                    searchCriteria.travelDate = getMonthFromString(currKeyword);
                    continue;
                }

                if (currKeyword.indexOf('days') > -1) {
                    var numbers = currKeyword.match(/\d+/);
                    if (numbers) {
                        searchCriteria.duration = numbers[0];
                    } else {
                        searchCriteria.duration = text2num(currKeyword.replace('days', '').replace(' ', ''));
                    }
                }
            }

            if (!searchCriteria.destination) {
                for (var i = 0; i < keywords.length; i++) {
                    for (var j = 0; j < cities.length; j++) {
                        if(keywords[i].indexOf(cities[j]) > -1 ){
                            searchCriteria.destination = cities[j];
                        }
                    }
                }
            }

            if (!searchCriteria.destination) {
                for (var i = 0; i < keywords.length; i++) {
                    for (var j = 0; j < newcities.length; j++) {
                        if(keywords[i].indexOf(newcities[j]) > -1 ){
                            searchCriteria.destination = 'new ' + newcities[j];
                        }
                    }
                }
            }

            if (!searchCriteria.travelDate) {
                for (var i = 0; i < keywords.length; i++) {
                    for (var j = 0; j < months.length; j++) {
                        if(keywords[i].indexOf(months[j]) > -1 ){
                            searchCriteria.travelDate = getMonthFromString(months[j]);
                        }
                    }
                }
            }
            //console.log(searchCriteria);
            getFlights.run(searchCriteria, res);
        });
    }
};

function getMonthFromString(mon) {

    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
    return -1;
}

var Small = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

var Magnitude = {
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000,
    'quintillion': 1000000000000000000,
    'sextillion': 1000000000000000000000,
    'septillion': 1000000000000000000000000,
    'octillion': 1000000000000000000000000000,
    'nonillion': 1000000000000000000000000000000,
    'decillion': 1000000000000000000000000000000000,
};

var a, n, g;

function text2num(s) {
    a = s.toString().split(/[\s-]+/);
    n = 0;
    g = 0;
    a.forEach(feach);
    return n + g;
}

function feach(w) {
    var x = Small[w];
    if (x != null) {
        g = g + x;
    } else if (w == "hundred") {
        g = g * 100;
    } else {
        x = Magnitude[w];
        if (x != null) {
            n = n + g * x
            g = 0;
        } else {
            //alert("Unknown number: " + w);
        }
    }
}
