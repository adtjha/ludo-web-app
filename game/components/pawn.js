function Pawn(x, y, team) {
  this.x = x;
  this.y = y;
  this.team = team;

  this.out = false;

  this.step;

  this.clicked = false;

  this.finalPath = false;

  this.reached = false;

  this.home = true;
  // this.size = '48px';

  this.move = (x, y) => {
    this.x = x;
    this.y = y;
  };

  this.render = () => {
    image(pawn, this.x, this.y);
  }

}