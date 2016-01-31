var pythonShell = require('python-shell');

var flights = ['delta', 'alaska'];
var cities = ['seattle', 'los angeles'];
var travelDate = ['weekend', 'month', 'january', 'feb', 'march 2017'];
var days = ['1 day', '2 days', '3 days'];

module.exports = {
    getKeyWords: function(searchText, res) {
        var pyshell = new pythonShell('RAKE-tutorial/getkeywords.py', {
            args: [searchText]
        });

        pyshell.on('message', function(keywords) {
            var searchCriteria = {};
            keywords = keywords.replace('[', '');
            keywords = keywords.replace(']', '');
            keywords = keywords.replace(/(\r\n|\n|\r)/gm,'');
            keywords = keywords.toLowerCase();
            keywords = keywords.split(',');

            for (var i = 0; i < keywords.length; i++) {
                var currKeyword = keywords[i].replace(' ', '');
                currKeyword = currKeyword.replace("'", "");
                currKeyword = currKeyword.replace("'", "");
                
                console.log(currKeyword);
                if (cities.indexOf(currKeyword) > -1) {
                    searchCriteria.destination = currKeyword;
                } else {
                    //Not in the array
                }

                if (travelDate.indexOf(currKeyword) > -1) {
                    searchCriteria.travelDate = currKeyword;
                } else {
                    //Not in the array
                }

                if (days.indexOf(currKeyword) > -1) {
                    searchCriteria.duration = currKeyword;
                } else {
                    //Not in the array
                }
            }

            console.log(searchCriteria);
        });
    }
};
