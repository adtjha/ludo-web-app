function Cell(x, y, size, side) {
  this.size = size;
  this.x = x;
  this.y = y;
  this.hidden = false;
  this.side = side;

  this.nextCell = (current, steps) => {
    return steps[steps.indexOf(current) + 1];
  }

  this.pawns = [];
  // this.contains = ['true', [array stores locations of pawns]],
  // this.contains = [];

  this.render = function() {
    if (!this.hidden) {
      push();
      // display the squares.
      if (this.color) {
        if (this.type === "FINAL_PATH") {
          fill(color(this.color()[0]));
        }
        if (this.type === "OUTER_PATH") {
          fill(color(this.color()[0]));
          if (this.outline()) {
            stroke(51);
            strokeWeight(5);
          }
        }
        // display the starting home squares.
        if (this.type === "HOME_SQUARE") {
          fill(color(this.color));
        }
      }
      ellipse(this.x, this.y, this.size, this.size);
      if (this.type === "OUTER_PATH") {
        fill(color('black'));
        // noStroke();
        // text(this.index, this.x - 7, this.y + 4);
      }
      if (this.type === "FINAL_PATH") {
        fill(color('white'));
        // // noStroke();
        // stroke(51);
        // strokeWeight(5);
        // text(this.index, this.x - 7, this.y + 4);
      }
      if (this.pawns && this.pawns.length > 0) {
        // image(pawn, this.contains[1].x, this.contains[1].y);
        this.pawns.forEach(e => {
          e.render();
        });
      }
    }
    pop();
  }

}