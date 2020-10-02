// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



/**
 * better user interface = GUI instructions?
 */



let gridSolution = [[1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                    [13,14,15,0]];

let grid;
let someIndex;

let sideLength;
let widthOffset, heightOffset;

const GRIDSIZE = 4;

let emptySpaceX, emptySpaceY;

//in the preload()
//gear = loadImage("assets/gear.png");
//in the draw() function
//image(gear, mouseX, mouseY);

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createRandomGrid();

  //remember to fix!!!!
  //fix this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //prob need an if/else statement to compare if the width or height is longer
  sideLength = height/5;
  widthOffset = width/2-(sideLength*2);
  heightOffset = height/2-(sideLength*2);

  textSize(sideLength/2);
  textAlign(CENTER);

  strokeWeight(3);
}

function draw() {
  background("#355262");

  displayGrid();
  findEmptySpace();


}

function findEmptySpace() {
  //because the grid variable is a 2d array, we cannot use indexOf() to find the 0 value
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      if (grid[y][x] === 0) {
        emptySpaceY = y;
        emptySpaceX = x;
      }
    }
  }
}

function createRandomGrid() {
  let listOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  let randomGrid = [];
  let someIndex;

  for (let i=0; i<4; i++) {
    randomGrid.push([]);

    for (let j=0; j<4; j++) {
      someIndex = floor(random(listOfNumbers.length));
      randomGrid[i].push(listOfNumbers[someIndex]);

      //remove the value at someIndex from the array of possible values (listOfNumbers) as to not add it twice
      listOfNumbers.splice(someIndex, 1);
    }
  }
  
  return randomGrid;
}

function displayGrid() {
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      fill(255);
      rect(x*sideLength + widthOffset, y*sideLength + heightOffset, sideLength, sideLength); 
          //widthOffset = width/2-(sideLength*2) <-- centre width offset
          //+ height/2-(sideLength*2) <-- centre height offset
      if (grid[y][x] !== 0) {
        fill(0);
        text(grid[y][x], 
            x*sideLength + widthOffset + sideLength/16, 
            y*sideLength + heightOffset + sideLength/3, 
            sideLength, sideLength);
      }
    }
  }
}

//figure out some kind of mouse hover event?
//or at least change it when pressing on something

function mousePressed() { //mouse must be pressed down (release not needed for function to be called)
  
  if (mouseX >= widthOffset && mouseX <= width-widthOffset && mouseY >= heightOffset && mouseY <= height-heightOffset) {
    console.log(emptySpaceX, emptySpaceY);
    
    //RIGHT square
    if (mouseX >= (emptySpaceX+1)*sideLength + widthOffset && mouseX <= (emptySpaceX+2)*sideLength + widthOffset &&
        mouseY >= (emptySpaceY)*sideLength + heightOffset && mouseY <= (emptySpaceY+1)*sideLength + heightOffset) {
      //console.log("right");
      grid[emptySpaceY][emptySpaceX] = grid[emptySpaceY][emptySpaceX+1];
      emptySpaceX += 1;
      //grid x,y of emptySpace = grid[emptySpaceY][emptySpaceX]
      console.log(emptySpaceX, emptySpaceY);

    }

    //LEFT square
    if (mouseX >= (emptySpaceX-1)*sideLength + widthOffset && mouseX <= (emptySpaceX)*sideLength + widthOffset &&
        mouseY >= (emptySpaceY)*sideLength + heightOffset && mouseY <= (emptySpaceY+1)*sideLength + heightOffset) {
      //console.log("left");
    }

    //UPPER square
    if (mouseX >= (emptySpaceX)*sideLength + widthOffset && mouseX <= (emptySpaceX+1)*sideLength + widthOffset &&
        mouseY >= (emptySpaceY-1)*sideLength + heightOffset && mouseY <= (emptySpaceY)*sideLength + heightOffset) {
      //console.log("upper");
    }

    //LOWER square
    if (mouseX >= (emptySpaceX)*sideLength + widthOffset && mouseX <= (emptySpaceX+1)*sideLength + widthOffset &&
        mouseY >= (emptySpaceY+1)*sideLength + heightOffset && mouseY <= (emptySpaceY+2)*sideLength + heightOffset) {
      //console.log("lower");
    }


  }

}
