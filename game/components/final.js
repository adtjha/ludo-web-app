function Final( x, y, size, r, fil) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.r = r;
  this.hidden;
  console.log(this.x, this.y, this.size, this.size, (this.r), ((this.r===315)?(45):(this.r+90)), PIE);
  this.fil = fil;

  this.render = () => {
    if (this.hidden) {
      push();
        ellipseMode(RADIUS);
        fill(color(this.fil));
        // arc(a,b,c,g,h,i,j,k)
        arc(this.x, this.y, this.size, this.size, (this.r), ((this.r===315)?(45):(this.r+90)), PIE);
      pop();
    }
  };

}
