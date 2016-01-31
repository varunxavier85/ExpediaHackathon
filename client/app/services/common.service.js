angular.module('makemetravel')
  .factory('CommonData',['$window', function($window) {
    var data = "";

    return {
      getData: function() {
        return data;
      },
      setData: function(newData) {
        data = newData;
      },
      setUrl: function() {
        $window.sessionStorage.baseurl = 'http://localhost:3000';
        console.log($window.sessionStorage.baseurl);
      }
    }
  }]);
