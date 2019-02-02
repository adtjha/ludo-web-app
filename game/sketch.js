var xSize = 601;
var ySize = 601;
var map;

function setup() {
  // put setup code here
  createCanvas(xSize, ySize);
  map = new ludoMap(xSize, ySize);
  map.createPaths();
  map.createfinalSquare();
  map.createhomeSquare();
  noLoop();
}

function draw() {
  // put drawing code here
  map.background();
  map.renderFinalSquare();
  map.renderHomeSquare();
  map.renderPaths();
  map.onTop();
}


function mousePressed() {
  loop();
  console.log('loop');
}

function mouseReleased() {
  noLoop();
  console.log('no loop');
}
