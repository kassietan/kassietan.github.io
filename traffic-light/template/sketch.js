// Traffic Light (Class Demo)
// Kassie Tan
// Sept 23, 2020

let colorToDisplay = "red";

let lastChangedStateTime = 0;

let greenLightDuration = 4000;
let yellowLightDuration = 1000;
let redLightDuration = 4000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  drawOutlineOfLights();

  fillLightColor();

  changeStateOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill("#000000");
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill("white");
  
  circle(width/2, height/2 + 200/3, 50); //bottom
  circle(width/2, height/2 - 200/3, 50); //top
  circle(width/2, height/2, 50); //middle
}

function fillLightColor(){
  if (colorToDisplay === "green") {
    fill("green");
    circle(width/2, height/2 + 200/3, 50); //bottom
  }

  else if (colorToDisplay === "yellow") {
    fill("yellow");
    circle(width/2, height/2, 50); //middle
  }

  else { // (colorToDisplay === "red")
    fill("red");
    circle(width/2, height/2 - 200/3, 50); //top
  }
}

function changeStateOfLights() {
  if (colorToDisplay === "green" && 
      millis() >= lastChangedStateTime + greenLightDuration) {
    colorToDisplay = "yellow";
    lastChangedStateTime = millis();
  }
  
  if (colorToDisplay === "yellow" && 
      millis() >= lastChangedStateTime + yellowLightDuration) {
    colorToDisplay = "red";
    lastChangedStateTime = millis();
  }
  
  if (colorToDisplay === "red" && 
      millis() >= lastChangedStateTime + redLightDuration) {
    colorToDisplay = "green";
    lastChangedStateTime = millis();
  }
}


