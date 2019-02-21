var xSize;
var ySize;
var map, ludo;
let pawn;

function preload() {
  pawn = loadImage('assets/pawn.png');
  xSize = windowWidth;
  ySize = windowHeight;
}

function setup() {
  // put setup code here
  createCanvas(xSize, ySize);
  map = new createludoMap(20, 20, 601);
  ludo = new game();
  map.initialize();
  gameStartButton();
  rollDiceButton();
  current() != undefined ? current() : console.log('not started');
}

function draw() {
  frameRate(6);
  // noLoop();
  // put drawing code here

  map.render();
  current();
}

var gameStartButton = () => {
  button = createButton('Start Game.');
  button.position(230, 630);
  button.mousePressed(ludo.start);
}

var rollDiceButton = () => {
  button = createButton('Roll Dice.');
  button.position(330, 630);
  button.mousePressed(ludo.rollDice);
}

var current = () => {
  fill(0, 0, 0);
  textSize(20);
  text("Current Team : ", 750, 60);
  text(ludo.currentTeam != undefined ? ludo.currentTeam : 'none', 900, 60);

  text("Dice : ", 750, 120);
  text(ludo.dice != undefined ? ludo.dice : 'none', 900, 120);
}

function mouseClicked() {
  actOn();
  return;
}
//
// function touchStarted() {
//   return actOn();
// }

function actOn() {
  // prevent default
  if (find(mouseX, mouseY)) {
    console.log('here');
  }
  return false;
}

function find(x, y) {
  // check homeSquares[].foreach(inner.foreach(x,y))
  map.homeSquares.forEach(square => {
    square.inner.forEach(cell => {
      if (x > cell.x && x < (cell.x + cell.size)) {
        if (y > cell.y && y < (cell.y + cell.size)) {
          return true;
        }
      }
    });
  });
  // check finalPath[]
  map.finalPath.forEach(cell => {
    if (x > cell.x && x < (cell.x + cell.size)) {
      if (y > cell.y && y < (cell.y + cell.size)) {
        return true;
      }
    }
  });
  // check outerPath[]
  map.outerPath.forEach(cell => {
    if (x > cell.x && x < (cell.x + cell.size)) {
      if (y > cell.y && y < (cell.y + cell.size)) {
        return true;
      }
    }
  });
  return false;
}

//
// function mousePressed() {
//   loop();
//   console.log('loop');
// }
//
// function mouseReleased() {
//   noLoop();
//   console.log('no loop');
// }