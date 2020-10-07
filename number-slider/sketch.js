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
let rectRoundEdge;
let widthOffset, heightOffset;

let buttonGap, buttonHeight, buttonWidth;

let emptySpaceX, emptySpaceY;
let winState = false;
let montserratSemiBoldFont, domineBoldFont;

let needHelp = false;

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

  console.log(sideLength);
  rectRoundEdge = sideLength/10;
  console.log(rectRoundEdge);

  widthOffset = width/2-(sideLength*2);
  heightOffset = height/2-(sideLength*2);

  //delete later
  console.log("width is " +width);
  console.log("height is " +height);

  
  buttonGap = 10;
  buttonHeight = 80;
  buttonWidth = 90;
 
}

function draw() {
  drawBackground();

  drawButtonBoxes();
  drawButtonText();

  if (!winState) {
    //create game board
    displayGrid();
    displayNumbers();

    findEmptySpace();
    
    checkForWin();
  }

  else {
    //win screen is drawn if winState is true (game is won)
    drawWinScreen();
  }

  if (needHelp) {
    //boolean needHelp is triggered by the questionButton
    drawHelpScreen();
  }
}

function drawBackground() {
  //fill in the background colour
  background("#764149");
  
  //style settings for the line background pattern
  strokeWeight(sideLength/150);
  stroke("#45252A");
  let forwardSlash = true;

  //draw the line background pattern
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

  //style settings for gameboard background rectangles
  strokeWeight(0);
  rectMode(CENTER); 

  //rectangular gameboard frame 
  fill("#45252A");
  rect(width/2, height/2, sideLength*4.3, sideLength*4.3, rectRoundEdge); //remember to chagne the roundedness to a ratio of width or height

  //fill in the gaps from the rounded corners of the gameboard
  fill("#9D4C5A");
  rect(width/2, height/2, sideLength*3, sideLength*3, rectRoundEdge); //roundness should be ratio of width or something

}


function drawButtonBoxes() {
  //draw settings for rects
  rectMode(CORNER);
  strokeWeight(6);
  stroke("#45252A");
  fill("#45252A");



  //draw title boxes
  rect(0, buttonHeight*1.25, buttonWidth, buttonHeight, 0, rectRoundEdge, rectRoundEdge, 0);
  rect(0, buttonHeight*1.25+buttonHeight+buttonGap, buttonWidth, buttonHeight, 0, rectRoundEdge, rectRoundEdge, 0);

  //draw the shuffle and restart boxes
  //lower restart button
  rect(width-buttonWidth, height-buttonHeight*1.25-buttonHeight, buttonWidth, buttonHeight, rectRoundEdge, 0, 0, rectRoundEdge); //width-90 because rect width is 90
  // height-180 because 100pixel distance from bottom and 80pixel height

  //upper question button
  rect(width-buttonWidth, height-buttonHeight*1.25-buttonHeight-buttonHeight-buttonGap, buttonWidth, buttonHeight, rectRoundEdge, 0, 0, rectRoundEdge); //height-270 because (270 = 90+80+80+10)
}

  
// buttonGap = 10;
// buttonHeight = 80;
// buttonWidth = 90;


function drawButtonText() {
  //text settings 
  textFont(domineBoldFont);
  textSize(50);
  strokeWeight(3.5);
  stroke("#F7D0CC");
  textAlign(CENTER, CENTER);
  
  //question and restart text
  text("?", width-buttonWidth/2, height-235);
  text("R", width-buttonWidth/2, height-180+35); //width-90+45 and height-180+40+5

  //title text
  text("16", 0, 95, 100, 80);
  textSize(22);
  text("SQUA\nRES!", 0, 185, 90, 80);

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
  

  //just for ease of debugging:
  // let randomGrid = [[1,2,3,4],
  //                   [5,6,7,8],
  //                   [9,10,0,15],
  //                   [13,14,12,11]];
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
      rect(x*sideLength + widthOffset, y*sideLength + heightOffset, sideLength, sideLength, rectRoundEdge); ////remember to chagne the roundedness to a ratio of width or height
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

  //font style settings FOR THE NUMBERS THE NUMBERS THE NUMBERS
  textFont(montserratSemiBoldFont); 
  textSize(sideLength/2);
  textAlign(CENTER, TOP);

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

function mousePressed() { 

  //move squares
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

  //restart button
  if (mouseX >= width-90 && mouseX <= width &&  
      mouseY >= height-180 && mouseY <= height-100) { //260 is height-180+80 (80 is button height)
    console.log("restart");
    grid = createRandomGrid();
    winState = false;
  }

  //question button
  if (mouseX >= width-90 && mouseX <= width && 
      mouseY >= height-270 && mouseY <= height-190) {
    console.log("question");
    needHelp = !needHelp;
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

function drawWinScreen() {
  ///should the drawing background rect be a function because i use the exact same thing TWICE?
  //change draw settings for rectangle
  rectMode(CENTER);
  stroke("#EEADA6");
  fill("#EEADA6");

  //create background rectangle
  rect(width/2, height/2, sideLength*4, sideLength*4, rectRoundEdge);

  //change text settings
  textFont(domineBoldFont);
  stroke("#45252A");
  textSize(sideLength);
  strokeWeight(sideLength/10);

  //write text
  text("YOU\nWIN!", width/2, height/2);
}

function drawHelpScreen() {
  //change draw settings for rectangle
  rectMode(CENTER);
  stroke("#EEADA6");
  fill("#EEADA6");

  //create background rectangle
  rect(width/2, height/2, sideLength*4, sideLength*4, rectRoundEdge);

  //change text settings
  textFont(domineBoldFont);
  textAlign(CENTER, CENTER);
  fill("#45252A");
  strokeWeight(0);
  textSize(sideLength/6);
  strokeWeight(sideLength/25);

  //write text
  text(`Confused? (Me too)
  
1. Click on the squares surrounding the empty square to move \n
2. The goal is to order the numbers from 1 to 15 with the empty space in the bottom right
3. Click the R button to restart
4. Good luck!


*click on the question mark to exit`, width/2, height/2, sideLength*3, sideLength*3);
}
