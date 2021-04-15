video = ""
status = false;
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != false) {
        object_detecter.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("no_of_object").innerHTML = "Number of objects detected: " + objects.length;
            fill("#ff4500");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    object_detecter = ml5.objectDetecter('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        objects = results;
    }
}