angular.module('makemetravel').controller('VoiceController', VoiceController);

VoiceController.$inject = ['$window', '$http', '$scope', '$routeParams', 'CommonData', 'VoiceSearch'];

function VoiceController($window, $http, $scope, $routeParams, CommonData, VoiceSearch) {
  var _this = this;
  _this.helloworld = 'Hello World';
  _this.flightDisplay = true;
  _this.setUrl = function() {
    CommonData.setUrl();
    console.log('log');
  }

  _this.searchquery = 'trip to los angeles in march for 5 days';

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
