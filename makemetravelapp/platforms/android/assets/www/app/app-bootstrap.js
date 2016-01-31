function bootstrapAngular() {
    var domElement = document.querySelector('html');
    angular.bootstrap(domElement, ['makemetravel']);
}

if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
    document.addEventListener("deviceready", bootstrapAngular, false);
} else {
    bootstrapAngular();
}