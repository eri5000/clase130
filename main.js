song="";
leftWristX = 0;
leftWristY = 0;
rigthWristX = 0;
rigthWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas(500,340);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet está inicializado');
}

function preload(){
    song= loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);
        
    }
}
function draw(){
    image(video,0,0,500,340);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist >0.2){
    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWristY <=68){
        document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >68 && rightWristY <=136){
        document.getElementById("speed").innerHTML  = "Velocidad = 1x";
        song.rate(1);
    }
    else if(rightWristY >136 && rightWristY <=204){
        document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >204 && rightWristY <=272){
        document.getElementById("speed").innerHTML = "Velocidad = 2";
        song.rate(2);
    }
    else if(rightWritsY >272 && rightWrist <=340){
        document.getElementById("speed").innerHTML = "Velocidad = 2.5";
        song.rate(2.5);
    }
    }
    if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    inNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberleftWristY);
    volume = remove_decimals/340;
    document.getElementById("volume").innerHTML =  "Volumen = " + volume;
    song.setVolume(volume);}
}