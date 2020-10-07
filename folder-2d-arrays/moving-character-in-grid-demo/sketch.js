// Creating Conway's Game of Life - in-class demo
// Started: Wednesday, September 30th

let grid;
let cellWidth, cellHeight;

const GRIDSIZE = 40;

let playerX = 0;
let playerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.2);
  stroke("#232433");

  grid = generateRandomGrid(GRIDSIZE);

  //place player
  grid[playerY][playerX] = 9;

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
  if (key === "r") { //r for random
    grid = generateRandomGrid(GRIDSIZE);
  }

  if (key === "c") { //c for clear
    grid = generateEmptyGrid(GRIDSIZE);
  }

  //WASD controls for character
  //sanity checks to ensure character only moves through the WHITE (1) grid: i.e. if the square to move to is purple (0) then you can't move
  if (key === "w") {
    //move up
    if (grid[playerY-1][playerX] === 0) {
      grid[playerY][playerX] = 0; //resetting player's current location to white
      playerY -= 1;
      grid[playerY][playerX] = 9; //set new location to red
    }
  }
  if (key === "a") {
    //move left
    if (grid[playerY][playerX-1] === 0) {
      grid[playerY][playerX] = 0; 
      playerX -= 1;
      grid[playerY][playerX] = 9;
    }
  }
  if (key === "s") {
    //move down
    if (grid[playerY+1][playerX] === 0) {
      grid[playerY][playerX] = 0; 
      playerY += 1;
      grid[playerY][playerX] = 9;
    }
  }
  if (key === "d") {
    //move right
    if (grid[playerY][playerX+1] === 0) {
      grid[playerY][playerX] = 0; 
      playerX += 1;
      grid[playerY][playerX] = 9;
    }
  }
}

function mousePressed() {
  let cellY = floor(mouseY / cellHeight);
  let cellX = floor(mouseX / cellWidth);

  //change the colour of the grid
  toggleCell(cellX, cellY); //self
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

function drawGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 1) { 
        fill("#2f2547"); //purple
      }
      else if (grid[y][x] === 9) {
        fill("#e670a9"); //pink
      }
      else {
        fill("#ded3cc"); //white
      }
      
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}
