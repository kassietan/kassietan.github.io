/*
INFORMATION:
Name: Kassie Tan
Project Title: Keyboard Ghost Choir
Date: Sept. 22nd, 2020

EXTRA FOR EXPERTS:
1.1: Changing the size of the canvas dependant on the size of the window. All of the shapes/images in the program are scaled to size as well.

1.2: Using functions from the sound library (polySynth, FFT).

IMPORTANT SOURCES:
2.1: Coding Train's "17.9: Sound Visialization; Graphing Amplitude"
  - https://www.youtube.com/watch?v=jEwAMgcCgOA
  - information on setting up the mic input and inspiration for moving ellipse

2.2: p5/js user rios's "getEnergyFFTviz"
  - https://editor.p5js.org/rios/sketches/IazTFSKSt
  - example code on how to use getEnergy() properly because the p5.js reference was not very helpful
*/

let instructions = `Assuming you are using a standard QWERTY keyboard, place your hands on the home keys, index fingers resting on 'F' and 'J' 

The white keys are triggered using the row of keys 'ASDF' running from 'A' to ';' 
The black keys are triggered using the row of keys 'QWER' running from 'W' to 'P' (omitting respective keys as per the keyboard pattern)

Additionally, a microphone and quiet enviornment are necessary to see the full extent of the ghost choir

Have fun! But not too much fun.

(Side Note: unfortunately, this program is not particularly functional with a faulty butterfly keyboard)`;

let polySynth;
let mic;
let fft;

let startScreen = true;

let laBelleFont;
let quote = '"Mournful and yet grand is the destiny of the artist.” – Franz Liszt'

let whiteKeys = [false, false, false, false, false, false, false, false, false, false];
let blackKeys = [false, false, " ", false, false, false, " ", false, false];

let whiteKeyWidth, blackKeyWidth;

let ghosts;
let ghostsScalar;

let bassLevel, lowMidLevel, midLevel, highMidLevel, trebleLevel;



function preload() {
  laBelleFont = loadFont('LaBelleAurore-Regular.ttf');
  ghosts = loadImage("ghostsTransparent.png");
}



function setup() {
  if (windowWidth <= windowHeight) {
    createCanvas(windowWidth, windowWidth * 0.75)
  } else {
    createCanvas(windowHeight * (4 / 3), windowHeight);
  }

  //determine key width based on window size
  whiteKeyWidth = width * (1 / 12);
  blackKeyWidth = width * (7 / 125);
  
  ghostsScalar = width / ghosts.width;

  
  //loading libraries
  polySynth = new p5.PolySynth();
  
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 64);
  //set the mic such that the fft has a source to retrieve frequency levels
  fft.setInput(mic);
    
  //give users control over starting the audio; i.e. sound does not start until user triggers an event
  userStartAudio();
  
  console.log(instructions);
}



function draw() {
  background("#c78f8f");

  if (startScreen) {
    writeQuote();
  } 
  
  else {
    displayGhosts();
    drawMouths();
    
    drawWhiteKeys();
    drawBlackKeys();
  }
}



function writeQuote() {
  setTextStyle();
  
  text(quote, width / 2, height / 2, width / 2, height);

  //change state variable after 2.75 seconds
  if (millis() > 2750) {
    setKeyboardStyle();
    startScreen = !startScreen;
  }
}

function setTextStyle() {
  //sets up the proper style attributes for opening screen quote
  strokeWeight(0);
  textFont(laBelleFont);
  fill(0);
  textSize(windowWidth / 50);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function setKeyboardStyle() {
  //sets up proper style attributes for the keyboard and ghosts
  strokeWeight(height / 250);
  rectMode(CORNER);
  
  imageMode(CENTER);
}



//functions regarding ghosts

function displayGhosts() {
  image(ghosts, width / 2, (13 * height) / 18, ghosts.width * ghostsScalar, ghosts.height * ghostsScalar);
}

function drawMouths() {
  //get the amplitude of specified frequency ranges to determine height of ellipse (the mouth)
  getEnergyLevels();

  fill("#000000");

  //draw each ghost's (from left to right) mouth
  drawMovingEllipse(width * (19 / 120), height * 0.72, height / 45, midLevel, 5);
  drawMovingEllipse(width * 0.405, height * 0.7, height / 15, bassLevel, 5);
  drawMovingEllipse(width * (13 / 24), height * (19 / 30), height / 45, trebleLevel, 1);
  drawMovingEllipse(width * (2 / 3), height * 0.75, height / 45, lowMidLevel, 5);
  drawMovingEllipse(width * (0.832), height * 0.7, height / 90, highMidLevel, 5);
}

function getEnergyLevels() {
  fft.analyze();

  //getEnergy() gets the amplitude from a range of frequencies; the strings are specific predefined ranges
  bassLevel = fft.getEnergy("bass");
  lowMidLevel = fft.getEnergy("lowMid");
  midLevel = fft.getEnergy("mid");
  highMidLevel = fft.getEnergy("highMid");
  trebleLevel = fft.getEnergy("treble");
}

function drawMovingEllipse(x, y, width, energySource, ratio) {
  
  //drawn an ellipse where the height changes based on the volume
  //energySource is from getEnergyLevels(), which returns amplitude values
  //the parameter "ratio" changes how sensitive the height of the ellipse is to the amplitude values 
  
  ellipse(x, y, width, energySource / ratio);
}



//functions regarding the keyboard

function drawWhiteKeys() {
  for (let x = 0; x < whiteKeys.length; x++) {     
    //fill color changes based on whether or not the key/note is being pressed/played
    
    if (whiteKeys[x]) {
      fill("#8fb2c7");
    } else {
      fill("#ffffff");
    }
    
    //draw each individual white key
    rect((x + 1) * whiteKeyWidth, whiteKeyWidth, whiteKeyWidth, whiteKeyWidth * 3);
  }
}

function drawBlackKeys() {
  for (let x = 0; x < blackKeys.length; x++) {
    //blackKeys array accounts for "spaces" in the black keys;
    
    if (blackKeys[x] !== " ") {
      //fill color changes based on whether or not the key/note is being pressed/played
      if (blackKeys[x]) {
        fill("#274b61");
      } else {
        fill("#333333");
      }
      
      //draw the black keys
      rect(((x + 1) * whiteKeyWidth) + blackKeyWidth, whiteKeyWidth, blackKeyWidth, whiteKeyWidth * 2);
    }
  }
}

function keyPressed() {
  //playing notes is a keyboard event; order of "if" statements is chromatic (for both keyPressed() and keyReleased() )
  
  if (!startScreen) {
    if (keyCode === 65) { //this "a"
      polySynth.noteAttack('C4', 1);
      whiteKeys[0] = true;
    }

    if (keyCode === 87) {
      polySynth.noteAttack('C#4', 1);
      blackKeys[0] = true;
    }

    if (keyCode === 83) {
      polySynth.noteAttack('D4', 1);
      whiteKeys[1] = true;
    }

    if (keyCode === 69) {
      polySynth.noteAttack('D#4', 1);
      blackKeys[1] = true;
    }

    if (keyCode === 68) {
      polySynth.noteAttack('E4', 1);
      whiteKeys[2] = true;
    }

    if (keyCode === 70) {
      polySynth.noteAttack('F4', 1);
      whiteKeys[3] = true;
    }

    if (keyCode === 84) {
      polySynth.noteAttack('F#4', 1);
      blackKeys[3] = true;
    }

    if (keyCode === 71) {
      polySynth.noteAttack('G4', 1);
      whiteKeys[4] = true;
    }

    if (keyCode === 89) {
      polySynth.noteAttack('G#4', 1);
      blackKeys[4] = true;
    }

    if (keyCode === 72) {
      polySynth.noteAttack('A5', 1);
      whiteKeys[5] = true;
    }

    if (keyCode === 85) {
      polySynth.noteAttack('Bb5', 1);
      blackKeys[5] = true;
    }

    if (keyCode === 74) {
      polySynth.noteAttack('B5', 1);
      whiteKeys[6] = true;
    }

    if (keyCode === 75) {
      polySynth.noteAttack('C5', 1);
      whiteKeys[7] = true;
    }

    if (keyCode === 79) {
      polySynth.noteAttack('C#5', 1);
      blackKeys[7] = true;
    }

    if (keyCode === 76) {
      polySynth.noteAttack('D5', 1);
      whiteKeys[8] = true;
    }

    if (keyCode === 80) {
      polySynth.noteAttack('D#5', 1);
      blackKeys[8] = true;
    }

    if (keyCode === 186) {
      polySynth.noteAttack('E5', 1);
      whiteKeys[9] = true;
    }
  }
}

function keyReleased() {
  //as soon as the key is released by the user, the note is "cut off"
  
  if (!startScreen) {
    if (keyCode === 65) {
      polySynth.noteRelease('C4');
      whiteKeys[0] = false;
    }

    if (keyCode === 87) {
      polySynth.noteRelease('C#4');
      blackKeys[0] = false;
    }

    if (keyCode === 83) {
      polySynth.noteRelease('D4');
      whiteKeys[1] = false;
    }

    if (keyCode === 69) {
      polySynth.noteRelease('D#4');
      blackKeys[1] = false;
    }

    if (keyCode === 68) {
      polySynth.noteRelease('E4');
      whiteKeys[2] = false;
    }

    if (keyCode === 70) {
      polySynth.noteRelease('F4');
      whiteKeys[3] = false;
    }

    if (keyCode === 84) {
      polySynth.noteRelease('F#4');
      blackKeys[3] = false;
    }

    if (keyCode === 71) {
      polySynth.noteRelease('G4');
      whiteKeys[4] = false;
    }

    if (keyCode === 89) {
      polySynth.noteRelease('G#4');
      blackKeys[4] = false;
    }

    if (keyCode === 72) {
      polySynth.noteRelease('A5');
      whiteKeys[5] = false;
    }

    if (keyCode === 85) {
      polySynth.noteRelease('Bb5');
      blackKeys[5] = false;
    }

    if (keyCode === 74) {
      polySynth.noteRelease('B5');
      whiteKeys[6] = false;
    }

    if (keyCode === 75) {
      polySynth.noteRelease('C5');
      whiteKeys[7] = false;
    }

    if (keyCode === 79) {
      polySynth.noteRelease('C#5');
      blackKeys[7] = false;
    }

    if (keyCode === 76) {
      polySynth.noteRelease('D5');
      whiteKeys[8] = false;
    }

    if (keyCode === 80) {
      polySynth.noteRelease('D#5');
      blackKeys[8] = false;
    }

    if (keyCode === 186) {
      polySynth.noteRelease('E5');
      whiteKeys[9] = false;
    }
  }
}
