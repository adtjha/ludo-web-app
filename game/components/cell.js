function Cell (x, y, size, side) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.hidden = false;
    this.side = side;

    // this.color = '',
    // this.contains = [],
    // this.pathType = '',
    // this.type = '';

    // this.hidden = () => {
    //   finalPath.forEach(elem => {
    //     // elem.hidden = true;
    //   });
    // };

    // this.color = () => {
    //
    // };
    //
    // this.outline = () => {
    //
    // };
    //
    // this.showPawn = () => {
    //
    // }
    //
    // this.numberOfPawnInside = () => {
    //
    // }

  Cell.prototype.render = function() {
    if(!this.hidden){
      push();
      if (this.color) {
        if(this.type === "FINAL_PATH"){
          // console.log(this.side);
          switch (this.side) {
            case "TOP":
              fill(color(this.color[1]));
              break;
            case "BOTTOM":
              fill(color(this.color[3]));
              break;
            case "LEFT":
              fill(color(this.color[2]));
              break;
            case "RIGHT":
              fill(color(this.color[0]));
              break;
          }
        }
        if (this.type === "OUTER_PATH") {
          fill(color(this.color[0]));
        }
      }
      ellipse(this.x, this.y, this.size, this.size);
    }
    pop();
  }

}
