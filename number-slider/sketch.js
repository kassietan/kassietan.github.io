// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



/**
 * better user interface = GUI instructions?
 * 
 * EXTRA FOR EXPERTS
 *    - good UX (buttons that make sense for restart)
 *    - good UI (just make it look nice yay)
 */



let gridSolution = [[1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                    [13,14,15,0]];
let grid;

const GRIDSIZE = 4;
let sideLength;
let widthOffset, heightOffset;

let emptySpaceX, emptySpaceY;
let winState = false;

let montserratSemiBoldFont, domineBoldFont;

//in the preload()
//gear = loadImage("assets/gear.png");
//in the draw() function
//image(gear, mouseX, mouseY);

function preload() {
  montserratSemiBoldFont = loadFont("assets/Montserrat-SemiBold.ttf");
  domineBoldFont = loadFont("assets/Domine-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createRandomGrid();

  //remember to fix!!!!
  //fix this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //prob need an if/else statement to compare if the width or height is longer
  if (height <= width) {
    sideLength = height/5;
  }
  else {
    sideLength = width/5;
  }

  widthOffset = width/2-(sideLength*2);
  heightOffset = height/2-(sideLength*2);

  //delete later
  console.log("width is " +width);
  console.log("height is " +height);
 
}

function draw() {
  drawBackground();

  //draw the title
  rectMode(CORNER);
  strokeWeight(6);
  stroke("#45252A");
  fill("#45252A");
  rect(0, 100, 90, 80, 0, 15, 15, 0);
  rect(0, 190, 285, 80, 0, 15, 15, 0);

  textFont(domineBoldFont);
  textSize(50);
  strokeWeight(3.5);
  stroke("#F7D0CC");
  textAlign(LEFT, CENTER);
  text("16", 20, 95, 100, 80);
  text("SQUARES", 20, 185, 295, 80);

  
  //draw the shuffle button 
  strokeWeight(6);
  stroke("#45252A");
  fill("#45252A");
  let restartButton = rect(width-90, height-180, 90, 80, 15, 0, 0, 15); //width-90 because rect width is 90
  // height-180 because 100pixel distance from bottom and 80pixel height
  let questionButton = rect(width-90, height-270, 90, 80, 15, 0, 0, 15); //height-270 because (270 = 90+80+80+10)

  strokeWeight(3.5);
  stroke("#F7D0CC");
  textAlign(CENTER, CENTER);
  text("R", width-45, height-145); //width-90+45 and height-180+40+5

  displayGrid();

  //font style settings FOR THE NUMBERS THE NUMBERS THE NUMBERS
  textFont(montserratSemiBoldFont); //again, might have to change to let = montserratFont or whatever font you choose to use
  textSize(sideLength/2);
  textAlign(CENTER, TOP);
  displayNumbers();

  findEmptySpace();

  checkForWin();

}

function drawBackground() {
  background("#764149");
  
  //draw the background diagonal line pattern
  let forwardSlash = true;
  strokeWeight(1); //should be ratio of width or something (but one is so small anyways...)
  stroke("#45252A");
  for (let x=0; x<width; x+=20) {
    for (let y=0; y<height; y+=20) {
      if (forwardSlash === true) {
        line(x, y, x+5, y+5);
      }
      else {
        line(x+5, y, x, y+5);
      }
      forwardSlash = !forwardSlash;
    }
    forwardSlash = !forwardSlash;
  }

  //background rectangles styles
  strokeWeight(0);
  rectMode(CENTER);

  //rectangular frame
  fill("#45252A");
  rect(width/2, height/2, sideLength*4.3, sideLength*4.3, 15); //remember to chagne the roundedness to a ratio of width or height

  //fill in the gaps from the rounded corners
  fill("#9D4C5A");
  rect(width/2, height/2, sideLength*3, sideLength*3, 15); //roundness should be ratio of width or something

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
  // let listOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  // let randomGrid = [];
  // let someIndex;

  // for (let i=0; i<4; i++) {
  //   randomGrid.push([]);

  //   for (let j=0; j<4; j++) {
  //     someIndex = floor(random(listOfNumbers.length));
  //     randomGrid[i].push(listOfNumbers[someIndex]);

  //     //remove the value at someIndex from the array of possible values (listOfNumbers) as to not add it twice
  //     listOfNumbers.splice(someIndex, 1);
  //   }
  // }
  

  //just for ease of debugging:
  let randomGrid = [[1,2,3,4],
                    [5,6,7,8],
                    [9,10,0,15],
                    [13,14,12,11]];
  return randomGrid;
}

function displayGrid() {
  rectMode(CORNER);
  stroke("#9D4C5A");
  strokeWeight(6); //should be ratio of width or something
  
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {

      // //create each square "button"
      if (grid[y][x] === gridSolution[y][x]) {
        fill("#EEADA6"); //deep pink if correct
      }
      else {
        fill("#F7D0CC"); //light pink if incorrect
      }
      rect(x*sideLength + widthOffset, y*sideLength + heightOffset, sideLength, sideLength, 15); ////remember to chagne the roundedness to a ratio of width or height
          //widthOffset = width/2-(sideLength*2) <-- centre width offset
          //+ height/2-(sideLength*2) <-- centre height offset    
    }
  }
}

function displayNumbers() {

  //Might want to separate drawing the grid and drawing the text 
  //because of the amount of times you have to switch
  //the stroke/fill colour and weight you know?
  //reduce the computational strain duuude
  fill("#562F35");
  stroke("#45252A");
  strokeWeight(5);  //stroke weight should be ratio of width or something

  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      if (grid[y][x] !== 0) {
        text(grid[y][x], 
            x*sideLength + widthOffset + sideLength/16, 
            y*sideLength + heightOffset + sideLength/5, 
            sideLength, sideLength);
      }
    }
  }
}

//figure out some kind of mouse hover event?
//or at least change it when pressing on something

function mousePressed() { //mouse must be pressed down (release not needed for function to be called)

  //delete later
  console.log("mouseX is " + mouseX + ", and mouseY is " +mouseY);


  if (winState === false) {
    if (mouseX >= widthOffset && mouseX <= width-widthOffset && mouseY >= heightOffset && mouseY <= height-heightOffset) {    
      //RIGHT square
      if (mouseX >= (emptySpaceX+1)*sideLength + widthOffset && mouseX <= (emptySpaceX+2)*sideLength + widthOffset &&
          mouseY >= (emptySpaceY)*sideLength + heightOffset && mouseY <= (emptySpaceY+1)*sideLength + heightOffset) {
        //console.log("right");
        
        //change the empty square into the NON-ZERO value
        grid[emptySpaceY][emptySpaceX] = grid[emptySpaceY][emptySpaceX+1];

        //change the pressed square INTO ZERO
        emptySpaceX += 1; 
        grid[emptySpaceY][emptySpaceX] = 0;


        //what? is? this? from??
        //grid x,y of emptySpace = grid[emptySpaceY][emptySpaceX]

      }

      //LEFT square
      if (mouseX >= (emptySpaceX-1)*sideLength + widthOffset && mouseX <= (emptySpaceX)*sideLength + widthOffset &&
          mouseY >= (emptySpaceY)*sideLength + heightOffset && mouseY <= (emptySpaceY+1)*sideLength + heightOffset) {
        //console.log("left");
        
        //change the empty square into the NON-ZERO value
        grid[emptySpaceY][emptySpaceX] = grid[emptySpaceY][emptySpaceX-1];

        //change the pressed square INTO ZERO
        emptySpaceX -= 1; 
        grid[emptySpaceY][emptySpaceX] = 0;
      }

      //UPPER square
      if (mouseX >= (emptySpaceX)*sideLength + widthOffset && mouseX <= (emptySpaceX+1)*sideLength + widthOffset &&
          mouseY >= (emptySpaceY-1)*sideLength + heightOffset && mouseY <= (emptySpaceY)*sideLength + heightOffset) {
        //console.log("upper");
        
        //change the empty square into the NON-ZERO value
        grid[emptySpaceY][emptySpaceX] = grid[emptySpaceY-1][emptySpaceX];

        //change the pressed square INTO ZERO
        emptySpaceY -= 1; 
        grid[emptySpaceY][emptySpaceX] = 0;
      }

      //LOWER square
      if (mouseX >= (emptySpaceX)*sideLength + widthOffset && mouseX <= (emptySpaceX+1)*sideLength + widthOffset &&
          mouseY >= (emptySpaceY+1)*sideLength + heightOffset && mouseY <= (emptySpaceY+2)*sideLength + heightOffset) {
        //console.log("lower");
        
        //change the empty square into the NON-ZERO value
        grid[emptySpaceY][emptySpaceX] = grid[emptySpaceY+1][emptySpaceX];

        //change the pressed square INTO ZERO
        emptySpaceY += 1; 
        grid[emptySpaceY][emptySpaceX] = 0;
      }


    }
  }
}

function checkForWin() {
  let errors = 0;

  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      if (grid[y][x] !== gridSolution[y][x]) {
        errors += 1;
      }
    }
  }

  if (errors === 0) {
    winState = true;
  }
}