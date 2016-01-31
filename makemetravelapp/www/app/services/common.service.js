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
        $window.sessionStorage.baseurl = 'http://ec2-52-32-60-241.us-west-2.compute.amazonaws.com';
        console.log($window.sessionStorage.baseurl);
      }
    }
  }]);
