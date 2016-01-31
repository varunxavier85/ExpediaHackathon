angular.module('makemetravel').controller('VoiceController', VoiceController);

VoiceController.$inject = ['$window', '$http', '$scope', '$routeParams', 'CommonData', 'VoiceSearch', '$rootScope'];

function VoiceController($window, $http, $scope, $routeParams, CommonData, VoiceSearch, $rootScope) {
  var _this = this;
  _this.helloworld = 'Hello World';
  _this.setUrl = function() {
    CommonData.setUrl();
    if($rootScope.searchText) {
      _this.searchquery = $rootScope.searchText;
      _this.search(_this.searchquery);
    } else {
      _this.searchquery = 'trip to los angeles in march for 5 days';
    }
  }

  _this.search = function(query) {
    console.log('here');
    VoiceSearch.getFlightsFromVoice(query).success(function(data) {
      _this.flights = data;
    })
  }
}
