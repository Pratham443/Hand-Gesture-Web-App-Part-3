prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/X0zVxhjYJ/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "      and the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(results);
        document.getElementById("prediction_1").innerHTML = results[0].label;
        document.getElementById("prediction_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(prediction_1 == "Thumbs up") {
            document.getElementById("emoji_1").innerHTML = "&#128077;";
        }

        if(prediction_1 == "Thumbs down") {
            document.getElementById("emoji_1").innerHTML = "&#128078;";
        }

        if(prediction_1 == "Good Luck") {
            document.getElementById("emoji_1").innerHTML = "&#129310;";
        }

        if(prediction_1 == "Peace") {
            document.getElementById("emoji_1").innerHTML = "&#9996;";
        }

        if(prediction_1 == "Rock") {
            document.getElementById("emoji_1").innerHTML = "&#129304;";
        }

        if(prediction_2 == "Thumbs up") {
            document.getElementById("emoji_2").innerHTML = "&#128077;";
        }

        if(prediction_2 == "Thumbs down") {
            document.getElementById("emoji_2").innerHTML = "&#128078;";
        }

        if(prediction_2 == "Good Luck") {
            document.getElementById("emoji_2").innerHTML = "&#129310;";
        }

        if(prediction_2 == "Peace") {
            document.getElementById("emoji_2").innerHTML = "&#9996;";
        }

        if(prediction_2 == "Rock") {
            document.getElementById("emoji_2").innerHTML = "&#129304;";
        }
    }
}