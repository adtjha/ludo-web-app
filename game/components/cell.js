function Cell(x, y, size, side) {
  this.size = size;
  this.x = x;
  this.y = y;
  this.hidden = false;
  this.side = side;

  this.nextCell = (current, steps) => {
    return steps[steps.indexOf(current) + 1];
  }

  // this.contains = ['true', [array stores locationsof pawns]],
  // this.contains = [];
  //
  // this.cellNext = () => {
  //   switch (this.side) {
  //     case "TOP":
  //
  //       break;
  //     case "BOTTOM":
  //
  //       break;
  //     case "LEFT":
  //
  //       break;
  //     case expression:
  //
  //       break;
  //   }
  // }

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
        noStroke();
        text(this.index, this.x - 7, this.y + 4);
      }
      if (this.type === "FINAL_PATH") {
        fill(color('white'));
        // noStroke();
        stroke(51);
        strokeWeight(5);
        text(this.index, this.x - 7, this.y + 4);
      }
      if (this.pawns) {
        // image(pawn, this.contains[1].x, this.contains[1].y);
        this.pawns.render();
      }
    }
    pop();
  }

}