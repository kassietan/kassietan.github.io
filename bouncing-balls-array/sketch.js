// Bouncing Circles/Balls with Arrays Demo
// Tuesday, September 29th, 2020

let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // ball is an object (things are called by saying ball.x or ball.radius)
  
  noStroke();
}

function draw() {
  background(220);
  moveBall();
  displayBalls();
  clearArray();
}

function mousePressed() {
  spawnBall();
}

function moveBall() {
  for (let i = 0; i<theCircles.length; i++) {
    theCircles[i].x += theCircles[i].dx;
    theCircles[i].y += theCircles[i].dy;

    if (theCircles[i].x + theCircles[i].radius >= width || theCircles[i].x - theCircles[i].radius <= 0) {
      theCircles[i].dx *= -1;
      theCircles[i].bounceCounter += 1;
    }

    if (theCircles[i].y + theCircles[i].radius >= height || theCircles[i].y - theCircles[i].radius <= 0) {
      theCircles[i].dy *= -1;
      theCircles[i].bounceCounter += 1;
    }
  }
}

function displayBalls() {
  for (let ball of theCircles) {
    fill(ball.theColor);
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function spawnBall() {
  //ball is a local variable now
  let ball = {
    x: mouseX,
    y: mouseY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(30, 75),
    theColor: color(10, random(210), random(210), random(50, 200)),
    bounceCounter: 0,
  };
  theCircles.push(ball);
}

function clearArray() {
  //need the index value to splice, so we have to use the "classic" for loop
  for (let i = theCircles.length-1 ; i>0; i--) {
    if (theCircles[i].bounceCounter >= 8) {
      theCircles.splice(i, 1);
    }
  }
}