// Fireworks Objects Demo
// Tuesday, October 6th, 2020

let theSparks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background("#121D26");

  for (let i=theSparks.length-1; i>=0; i--) { //count backwards because might be deleting some (and you don't want to "skip" over an "i" value)
    if (theSparks[i].isDead()) {
      theSparks.splice(i, 1);
    }
    else {
      theSparks[i].move();
      theSparks[i].display();
    }
  }
}

function mousePressed() {
  spawnSparks(100);
}

function spawnSparks(howManySparks) {
  
  //randomize colour
  let r = random(255);
  let g = random(255);
  let b = random(255);

  //"circular" motion
  let theta = 0; 
  let angleIncrease = 2 * PI / howManySparks; //note that PI is a constant preset by p5.js
  
  for (let i=0; i<howManySparks; i++) {
    let dx = cos(theta) + random(-0.5, 0.5);
    let dy = sin(theta) + random(-0.5, 0.5); 
    //dx and dy affect the direction of the sparks such that it moves around the unit circle

    let someSpark = new Spark(mouseX, mouseY, r, g, b, dx, dy);
    theSparks.push(someSpark);
    theta += angleIncrease;
  }
}

class Spark {
  constructor(x, y, r, g, b, dx, dy) { //constructor has to exist in a class
    this.x = x; //keep track of what you've instantiated (passing into the constructor)
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = 255;

    this.radius = random(10,18) / 4;

    this.gravity = 0.02;
  }

  display() {
    strokeWeight(0);
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius*2);

  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    
    //slowly fade
    this.alpha -= 2.55;

    //gravty
    this.dy += this.gravity;
  }

  isDead() {
    return this.alpha <= 0; 
  }
}