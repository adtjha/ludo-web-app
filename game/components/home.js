function Home(x, y, size, radius, c) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.borderRadius = radius;
  this.c = c;
  this.inner = [];
  this.innnerSize = 60;

  this.steps = [];

  this.outlineHover = false;

  // STEPS TO CREATE INNER CIRCLES.
  // 1. loop 4 times and create 4 cells, each cell contains the pawn.
  // 2. fill all the InnerCircles with pawn.
  this.createInnerCircles = () => {
    // Cell (x, y, size, side)
    for (let i = 0; i < 4; i++) {
      switch (i) {
        case 0:
          this.inner.push(new Cell(this.x + 50, this.y + 50, this.innnerSize, "NO_SIDE"));
          break;
        case 1:
          this.inner.push(new Cell(this.x + 50, this.y + 150, this.innnerSize, "NO_SIDE"));
          break;
        case 2:
          this.inner.push(new Cell(this.x + 150, this.y + 50, this.innnerSize, "NO_SIDE"));
          break;
        case 3:
          this.inner.push(new Cell(this.x + 150, this.y + 150, this.innnerSize, "NO_SIDE"));
          break;
      }
    }
    this.inner.forEach(e => {
      e.type = "HOME_SQUARE";
      e.color = "#FFF";
      e.pawns.push(new Pawn((e.x - 25), (e.y - 25), this.c));
    });
  }

  this.render = () => {
    push();
    fill(color(this.c));
    if (this.outlineHover) {
      stroke(51);
      strokeWeight(frameCount % 12);
    }
    rect(this.x, this.y, this.size, this.size, this.borderRadius);
    pop();
  };

}