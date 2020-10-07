// Timer Demo (with objects--a class)
// Wednesday, October 7th

let blinkTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blinkTime = new Timer(1000);
}

function draw() {
  if (blinkTime.isDone()) {
    background("#F7D0CC"); //background is pink for a brief "blink"
    blinkTime.setWaitTime(2000);
    blinkTime.reset();
  }
  else{
    background("#478799"); //background in turquoise
  }
  
  stroke("#45252A");

}

class Timer {
  constructor(howLongToWait) {
    this.howLongToWait = howLongToWait; //do this because we are using howLongToWait in the reset() function

    this.beginTime = millis();
    this.endTime = this.beginTime + this.howLongToWait;
  }

  isDone() {
    return millis() >= this.endTime;
  }

  reset() {
    this.beginTime = millis();
    this.endTime = this.beginTime + this.howLongToWait;
  }

  setWaitTime(newWaitTime) {
    this.howLongToWait = newWaitTime;
  }
}