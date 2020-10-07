// 2D Array Class Demo
// Started: Monday, September 27th, 2020

let grid;
let cellWidth, cellHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(10);
  strokeWeight(0.5);

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
        grid[i].push(0);
      }
      else {
        grid[i].push(1);
      }
    }
  }

  return grid;
}

function keyPressed() {
  if (key === " ") {
    grid = generateRandomGrid(10);
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
  //change the array value from 0 to 1
  if (grid[cellY][cellX] === 0) {
    grid[cellY][cellX] = 1;
  }
  else {
    grid[cellY][cellX] = 0;
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
      if (grid[y][x] === 0) {
        fill("#611722");
      }
      else {
        fill("#dba0a9");
      }
      
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}
