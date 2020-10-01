// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSolution = [[1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                    [13,14,15,0]];

let grid;

//in the preload
//gear = loadImage("assets/gear.png");
//in the draw function
//image(gear, mouseX, mouseY);

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createRandomGrid();
}

function draw() {
  background("#355212");
}

function createRandomGrid() {
  let listOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  let randomGrid = [];

  for (let i=0; i<4; i++) {
    randomGrid.push([]);

    for (let j=0; j<4; j++) {
      randomGrid[i].push(listOfNumbers[random(listOfNumbers.length)]);
    }
  }
}