function Home(x, y, size, radius, c) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.borderRadius = radius;
  this.c = c;
  this.inner = [];
  this.innnerSize = 60;

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
      e.contains.push(true);
      e.contains.push({
        x: e.x - 25,
        y: e.y - 25
      })
    });
  }

  this.render = () => {
    push();
    fill(color(this.c));
    rect(this.x, this.y, this.size, this.size, this.borderRadius);
    pop();
  };

}