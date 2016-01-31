angular.module('makemetravel').factory('VoiceSearch', function($http, $window){
  return {
    getFlightsFromVoice: function(query) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.post(baseUrl + '/api/flightsFromVoice', {'searchText': query});
    },
    getPackageFromVoice: function(query) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.post(baseUrl + '/api/packagesFromVoice', {'searchText': query});
    }
  }
})
