angular.module('makemetravel').controller('VoiceController', VoiceController);

VoiceController.$inject = ['$window', '$http', '$scope', '$routeParams', 'CommonData', 'VoiceSearch', '$rootScope'];

function VoiceController($window, $http, $scope, $routeParams, CommonData, VoiceSearch, $rootScope) {
  var _this = this;
  _this.helloworld = 'Hello World';
  _this.flightDisplay = true;
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
    if(query.indexOf('flight') > -1){
      console.log('flight!')
      VoiceSearch.getFlightsFromVoice(query).success(function(data) {
        _this.flights = data;
      })
    } else {
      console.log('package! woot!')
      VoiceSearch.getPackageFromVoice(query).success(function(data) {
        _this.flightDisplay = false;
        _this.package = data;
        console.log(_this.package);
      })
    }
  }
}
