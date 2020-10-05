// Objects Intro
// Monday, October 5th, 2020

let richard;
let april;
let victor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  richard = new Walker(width/2, height/2, "#84AF72"); //in the class Walker, richard becomes 'this' in the constructor
  april = new Walker(width/3, height/3, "#72A1B0");
  victor = new Walker(width/3*2, height/3*2, "#B07283");

  noStroke();
  background("#242232");

}

function draw() {
  richard.display();
  richard.move();

  april.display();
  april.move();

  victor.display();
  victor.move();
}

//imagine that classes are like cookie cutters
class Walker { //the one and ONLY time that you will capitalize the first letter of the variable name
  constructor(x, y, theColor) { 
    this.x = x; //this means for whatever version of Walker that you've just made, this attribute is given
    this.y = y;
    this.color = theColor;
  }

  move() { //JS knows that these are all functions because it is inside a class
    let choice = random(100);
    if (choice < 25) {
      //left
      this.x -= 3;
    }
    else if (choice < 50) {
      //right
      this.x += 3;
    }
    else if (choice < 75) {
      //up
      this.y -= 3;
    }
    else {
      //down
      this.y += 3;
    }
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, 15);
  }
}


