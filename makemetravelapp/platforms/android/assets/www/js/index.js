document.addEventListener('deviceready', function() {
    // basic usage
    TTS
        .speak('hello, world!', function() {
            alert('success');
        }, function(reason) {
            alert(reason);
        });

    // or with more options
    TTS
        .speak({
            text: 'hello, world!',
            locale: 'en-US',
            rate: 0.75
        }, function() {
            alert('success');
        }, function(reason) {
            alert(reason);
        });
}, false);

function recognizeSpeech() {
    var maxMatches = 5;
    var promptString = "Speak now"; // optional
    var language = "en-US"; // optional
    window.plugins.speechrecognizer.startRecognize(function(result) {
        alert(result);
    }, function(errorMessage) {
        console.log("Error message: " + errorMessage);
    }, maxMatches, promptString, language);
}

document.getElementById("btnrecognizeSpeech").addEventListener("click", recognizeSpeech);
