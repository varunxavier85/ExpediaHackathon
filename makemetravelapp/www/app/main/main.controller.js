angular.module('makemetravel').controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$location'];

function MainController($rootScope, $location) {
    var _this = this;
    _this.getVoiceText = function() {
        var maxMatches = 5;
        var promptString = "Speak now"; // optional
        var language = "en-US"; // optional
        window.plugins.speechrecognizer.startRecognize(function(result) {
            $rootScope.searchText = result[0];
            $location.path('/voice');
            $rootScope.$apply();
        }, function(errorMessage) {
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);

    }
}
