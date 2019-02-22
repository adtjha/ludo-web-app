var options = {}, start = false, game;

function setup() {
  options.players = select('.input').value();
  options.comp = options.players > 1 ? false : true
}

function startGame() {
  start = true;
  if (start) {
    game = new Game(0, 0, windowWidth, options)
    game.start()
    select('.options').addClass('hide')
  }
}

function draw() {
  if (start) {
    game.show()
  }
}
