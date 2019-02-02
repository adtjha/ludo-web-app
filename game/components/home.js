function Home( x, y, size, radius, fil) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.borderRadius = radius;
  this.fil = fil;

  // this.innerCircles = () => {
  //   inner = [];
  //   for (let i = 0; i < 4; i++) {
  //
  //   }
  //   return inner;
  // }

  this.render = () => {
    push();
      fill(color(this.fil));
      rect(this.x, this.y, this.size, this.size, this.borderRadius);
    pop();
  };

}
