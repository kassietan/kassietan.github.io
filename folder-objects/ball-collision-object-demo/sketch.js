// Ball Object Demo - objects interacting (colliding)

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //spawn a bunch of balls into the array
  for (let i=0; i<25; i++) {
    ballArray.push(new Ball(random(50, width-50), random(50, height-50)));
  }
}

function draw() {
  background("#071F1C");

  for (let i=0; i<ballArray.length; i++) {
    ballArray[i].move();

    for (let j=0; j<ballArray.length; j++) {
      if (i !== j) { //don't check collision with self
        ballArray[i].collisionCheck(ballArray[j]);
      }
    }

    ballArray[i].display();

  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-3, 3);
    this.dy = random(-3, 3);

    this.radius = random(10, 20);
    this.fillColor = "#E7ABAB";
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //bounce on edge of screen
    if (this.x + this.dx + this.radius >= width || this.x + this.dx - this.radius <= 0) {
      this.dx = this.dx * -1;
    }

    if (this.y + this.dy + this.radius >= height || this.y + this.dy - this.radius <= 0) {
      this.dy = this.dy * -1;
    }
  }

  display() {
    fill(this.fillColor);
    strokeWeight(0);
    circle(this.x, this.y, this.radius*2);
  }

  collisionCheck(otherBall) { //can pass other objects into function to do some sort of comparison
    
    //distance between the centre points of two circles
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let sumOfRadii = this.radius + otherBall.radius;

    if (distanceApart <= sumOfRadii) {
      this.fillColor = "#E3FFED"; //fill in pink

      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
      
    }

  }
}