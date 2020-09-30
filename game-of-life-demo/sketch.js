// Creating Conway's Game of Life - in-class demo
// Started: Wednesday, September 30th

let grid;
let cellWidth, cellHeight;

const GRIDSIZE = 10;

let autoPlay = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRIDSIZE);
  strokeWeight(0.2);
  stroke("#232433");

  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(170);

  // if you want it to "take turns" automatically
  if (autoPlay) {
    if (frameCount % 30 === 0) {
      takeNextTurn();
    }
  }

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
  if (key === " ") {
    takeNextTurn();
  }
  if (key === "c") { //c for clear
    grid = generateEmptyGrid(GRIDSIZE);
  }
  if (key === "a") { //a for autoplay
    autoPlay = !autoPlay;
  }
}

function takeNextTurn() {
  let nextTurn = generateEmptyGrid(GRIDSIZE);

  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      
      //count neighbours
      let neighbours = 0;
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          if (y+i >= 0 && y+i < GRIDSIZE && x+j >= 0 && x+j < GRIDSIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //subtract self from neighbour ount
      neighbours -= grid[y][x];


      //apply the rules
      //only worry about when they are going to become alive in the nextTurn
      //as the nextTurn array is already all set to dead

      //if dead on current turn
      if (grid[y][x] === 0) {
        if (neighbours === 3) {
          nextTurn[y][x] = 1; //turn to alive
        }
      }

      //if alive on current turn
      if (grid[y][x] === 1) {
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1; //turn to alive
        }
      }      
    }
  }
  
  grid = nextTurn;
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
        fill("#72759e");
      }
      else {
        fill("#ded3cc");
      }
      
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}
