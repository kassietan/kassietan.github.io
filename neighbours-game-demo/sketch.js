// 2D Array Class Demo
// Started: Monday, September 27th, 2020

let grid;
let cellWidth, cellHeight;

const GRIDSIZE = 4; //a const can never be changed (because it is a variable in your code that shouldn't ever change)
//consts are usually in all caps

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(GRIDSIZE);
  strokeWeight(0.2);

  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(170);
  drawGrid();
}

function generateRandomGrid(gridSize) {
  //local variable: grid
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      if (random(100) < 50){
        grid[i].push(1);
      }
      else {
        grid[i].push(0);
      }
    }
  }
  return grid;
}

function generateEmptyGrid(gridSize) {
  //local variable: grid
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

function keyPressed() {
  if (key === " ") {
    grid = generateEmptyGrid(4);
  }
}

function mousePressed() {
  //note that function mouseClicked() requires the mouse to be PRESSED AND RELEASED for the function to be called
  //mousePressed() calls the function right when the mouse button is pressed, no release is required

  //determine what grid space it is in
  //p5.js has a floor(number) function; normally would use: Math.floor(number)
  let cellY = floor(mouseY / cellHeight);
  let cellX = floor(mouseX / cellWidth);

  //console.log(xValue, yValue);

  //change the colour of the grid
  toggleCell(cellX, cellY); //self
  
  toggleCell(cellX, cellY-1); //north cell
  toggleCell(cellX, cellY+1); //south
  toggleCell(cellX+1, cellY); //east
  toggleCell(cellX-1, cellY); //west

}

function toggleCell(cellX, cellY) {
  if (cellX >= 0 && cellX < GRIDSIZE && cellY >= 0 && cellY < GRIDSIZE) {
    if (grid[cellY][cellX] === 0) {
      grid[cellY][cellX] = 1;
    }
    else {
      grid[cellY][cellX] = 0;
    }
  }
}

// function displayGrid(arraySource, squareLength) {
// the version i made of drawGrid() before the class demo
//   for (let y=0; y<arraySource.length; y++) {
//     for (let x=0; x<arraySource[y].length; x++) {

//       if (arraySource[y][x] === 1) {
//         fill(40);
//       }
//       else {
//         fill(220);
//       }

//       rect(x*squareLength, y*squareLength, squareLength, squareLength);
//     }
//   }
// }

function drawGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 1) { 
        fill("#c96526");
      }
      else {
        fill("#ded3cc");
      }
      
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}
