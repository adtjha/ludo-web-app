function Pawn(x, y, team) {
  this.x = x;
  this.y = y;
  this.team = team;
  // this.size = '48px';

  this.move = () => {
    console.log("MOVE");
  };

  this.render = () => {
    image(pawn, this.x, this.y);
  }

}