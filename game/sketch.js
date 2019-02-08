var xSize = 601;
var ySize = 601;
var map;

function setup() {
  // put setup code here
  createCanvas(xSize, ySize);
  map = new createludoMap(xSize, ySize);
  map.initialize();
  // noLoop();
}

function draw() {
  // put drawing code here
  map.render();
  // map.onTop();

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