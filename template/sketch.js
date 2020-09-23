// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shouldIShowTheEllipse = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
let something = true;

  if (shouldIShowTheEllipse) {
    fill("green");
    ellipse(mouseX, mouseY, 200);
  }
}

function mousePressed() {
  shouldIShowTheEllipse = true;
}
