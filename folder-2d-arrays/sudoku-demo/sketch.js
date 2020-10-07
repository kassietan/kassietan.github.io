// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sudoku;
let initialState;


const GRIDSIZE = 9;
let sideLength;

function preload() {
  sudoku = loadStrings("assets/1.txt");
  initialState = loadStrings("assets/1.txt");   //loading the text file as a 1-dimensional array

  //if you want to use the other text file sudoku:
  //sudoku = loadStrings("assets/1.txt");
  //initialState = loadStrings("assets/1.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //convert sudoku and initial state into 2d array
  for (let i=0; i<sudoku.length; i++) {
    sudoku[i] = sudoku[i].split(",");
    initialState[i] = initialState[i].split(",");
  }

  //loop through the whol 2d array and turn everything into number data type
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      sudoku[y][x] = int(sudoku[y][x]);
      initialState[y][x] = int(initialState[y][x]);
    }
  }

  sideLength = ((width+height)/2) / 16; //(834/50);

  //change text settings in setup(), as to not put it in an endless loop for draw()
  textAlign(CENTER);
  textSize(sideLength/2);
  textStyle(BOLD);

}

function draw() {
  background("#123133");

  displayBackgroundSquares();
  displayGrid();
}

function displayBackgroundSquares() {
  strokeWeight(0);

  fill("#09575c");
  rect(width/2-(sideLength*4.5) + 15, height/2-(sideLength*4.5) + 15, sideLength*9);

  fill("#508b8f");
  rect(width/2-(sideLength*4.5) - 15, height/2-(sideLength*4.5) - 15, sideLength*9);
}

function displayGrid() {
  strokeWeight(1);
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      fill(255);
      rect(x*sideLength + width/2-(sideLength*4.5), y*sideLength + height/2-(sideLength*4.5), sideLength, sideLength); 
          //+ width/2-(sideLength*4.5) <-- centre width offset
          //+ height/2-(sideLength*4.5) <-- centre height offset
      if (sudoku[y][x] !== 0) {
        if (sudoku[y][x] === initialState[y][x]) {
          fill(0);
          text(sudoku[y][x], x*sideLength + width/2-(sideLength*4), y*sideLength + height/2-(sideLength*4) + sideLength/8);
        }
        else {
          fill("#ab465c");
          text(sudoku[y][x], x*sideLength + width/2-(sideLength*4), y*sideLength + height/2-(sideLength*4) + sideLength/8);
        }
      }
    }
  }

  //draw black outline
  strokeWeight(4);
  noFill();
  for (let i=0; i<3; i++) {
    for (let j=0; j<3; j++) {
      rect(i*sideLength*3 + width/2-(sideLength*4.5), j*sideLength*3 + height/2-(sideLength*4.5), sideLength*3, sideLength*3);
    }
  }
}

function mouseClicked() {
  let cellY = floor((mouseY - (height/2-(sideLength*4.5)))/ sideLength);
  let cellX = floor((mouseX - (width/2-(sideLength*4.5)))/ sideLength);

  //console.log(cellY, cellX);
  changeCell(cellX, cellY);
}

function changeCell(x, y) {

  if (sudoku[y][x] !== initialState[y][x] || sudoku[y][x] === 0) {
    //the number displayed will never go into double digits
    sudoku[y][x] = (sudoku[y][x] + 1) % 10;
  }
  
}