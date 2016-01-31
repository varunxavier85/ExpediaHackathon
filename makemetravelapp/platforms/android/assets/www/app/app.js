angular.module('makemetravel', ['ngRoute']);

angular.module('makemetravel').
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/voice', {
            templateUrl: 'app/voice/voice.html',
            controller: 'VoiceController',
            controllerAs: 'v'
        })
        .when('/flights', {
            templateUrl: 'app/flights/flights.html',
            controller: 'FlightsController',
            controllerAs: 'fc'
        })
}]);
