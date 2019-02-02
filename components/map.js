

var homeSquares = [],finalSquares = [],outerPath = [], finalPath = [];

// COLORS
/**
RED : (218,34,34)
GREEN : (89,209,56)
BLUE :
YELLOW :
*/
// horizontal lines
// [(0,0),(0,x)] => [(0,y),(x,y)]
// vertical lines
// [(0,0),(0,y)] => [(x,0),(x,y)]

function ludoMap(x,y) {
  this.xSize = x;
  this.ySize = y;

  this.halfSize = (x/2 + y/2)/2;

  this.onTop = () => {
    var space = 35;
    // // line(0,0,0,x);
    // line(0, 0, x, y);
    // line(0,y,x,0);
    // line(0, x/2, x, y/2);
    // line(y/2, 0, y/2, x);
  }

  this.background = ()=>{
    background(220);
  };

  this.createfinalSquare = () => {

    x = this.xSize/2, y = this.ySize/2, colors = [], size = 60;
    radian = [];
    for (let i = 0; i < 4; i++) {
      switch (i) {
        case 0:
          colors.push("GREEN");
          radian.push(45);
          break;
        case 1:
          colors.push("BLUE");
          radian.push(135);
          break;
        case 2:
          colors.push("YELLOW");
          radian.push(225);
          break;
        case 3:
          colors.push("RED");
          radian.push(315);
          break;
      }
    }
    for (let i = 0; i < 4; i++) {
      finalSquares.push(new Final( x, y, size, radian[i], colors[i]));
    }
    // ellipseMode(RADIUS);
    // fill(color('GREEN'));
    // arc(this.xSize/2, this.ySize/2, size, size, radians(45), radians(135), PIE);
    // fill(color('BLUE'));
    // arc(this.xSize/2, this.ySize/2, size, size, radians(135), radians(225), PIE);
    // fill(color('YELLOW'));
    // arc(this.xSize/2, this.ySize/2, size, size, radians(225), radians(315), PIE);
    // fill(color('RED'));
    // arc(this.xSize/2, this.ySize/2, size, size, radians(315), radians(45), PIE);
  };

  this.renderFinalSquare = () => {
    finalSquares.forEach(e => {
      e.render();
    });
  };

  this.createhomeSquare = () => {
    x = [], y = [], colors = [], size = 200;
    radius = 20;
    for (let i = 0; i < 4; i++) {
      x.push(i%2 === 0?0:400);
      if (i < 2) {
        y.push(0);
      } else {
        y.push(400);
      }
      switch (i) {
        case 0:
          colors.push("BLUE");
          break;
        case 1:
          colors.push("YELLOW");
          break;
        case 2:
          colors.push("GREEN");
          break;
        case 3:
          colors.push("RED");
          break;
      }
    }
    for (let i = 0; i < 4; i++) {
      homeSquares.push(new Home( x[i], y[i], size, radius, colors[i]));
    }
    // fill(color('BLUE'));
    // rect(0, 0, 200, 200, 20);
    // fill(color('YELLOW'));
    // rect(400, 0, 200, 200, 20);
    // fill(color('GREEN'));
    // rect(0, 400, 200, 200, 20);
    // fill(color('RED'));
    // rect(400, 400, 200, 200, 20);
  };

  this.renderHomeSquare = () => {
    homeSquares.forEach(e => {
      e.render();
    });
  }


  this.createPaths = () => {
    var size = 30,
        spacing = 0,
        inner_spacing = 10,
        offset = size/2;
      // top-side paths.
      for (var i = 0; i < 6; i++) {
        // ellipse(240, offset+(i*size + i*inner_spacing), size, size);
        outerPath.push(new Cell(240, offset+(i*size + i*inner_spacing), size, "TOP"));
        if (i===0) {
          // ellipse(300, offset+(i*size + i*inner_spacing), size, size)
          outerPath.push(new Cell(300, offset+(i*size + i*inner_spacing), size, "TOP"));
        }
        else {
          finalPath.push(new Cell(300, offset+(i*size + i*inner_spacing), size, "TOP"))
        }
        // ellipse(360, offset+(i*size + i*inner_spacing), size, size);
        outerPath.push(new Cell(360, offset+(i*size + i*inner_spacing), size, "TOP"));
      }
      // bottom-side paths.
      spacing +=370;
      offset = size/2 + spacing;
      for (var i = 0; i < 6; i++) {
        // ellipse(240, offset+(i*size + i*inner_spacing), size, size);
        outerPath.push(new Cell(240, offset+(i*size + i*inner_spacing), size, "BOTTOM"))
        if (i===5) {
          // ellipse(300, offset+(i*size + i*inner_spacing), size, size);
          outerPath.push(new Cell(300, offset+(i*size + i*inner_spacing), size, "BOTTOM"))
        }
        else{
          finalPath.push(new Cell(300, offset+(i*size + i*inner_spacing), size, "BOTTOM"))
        }
        // ellipse(360, offset+(i*size + i*inner_spacing), size, size);
        outerPath.push(new Cell(360, offset+(i*size + i*inner_spacing), size, "BOTTOM"))
      }
      // left-side paths.
      spacing = 0,
      offset = size/2 + spacing;
      for (var i = 0; i < 6; i++) {
        // ellipse(offset+(i*size + i*inner_spacing), 240, size, size);
        outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 240, size, "LEFT"));
        if (i===0) {
          // ellipse(offset+(i*size + i*inner_spacing), 300, size, size);
          outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 300, size, "LEFT"));
        }
        else {
          finalPath.push(new Cell(offset+(i*size + i*inner_spacing), 300, size, "LEFT"));
        }
        // ellipse(offset+(i*size + i*inner_spacing), 360, size, size);
        outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 360, size, "LEFT"));
      }
      // right-side paths.
      spacing+=370;
      offset = size/2 + spacing;
      for (var i = 0; i < 6; i++) {
        // ellipse(offset+(i*size + i*inner_spacing), 240, size, size);
        outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 240, size, "RIGHT"))
        if (i===5) {
          // ellipse(offset+(i*size + i*inner_spacing), 300, size, size);
          outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 300, size, "RIGHT"))
        }
        else {
          finalPath.push(new Cell(offset+(i*size + i*inner_spacing), 300, size, "RIGHT"))
        }
        // ellipse(offset+(i*size + i*inner_spacing), 360, size, size);
        outerPath.push(new Cell(offset+(i*size + i*inner_spacing), 360, size, "RIGHT"))
      }

      assignColor();
      assignType();
      // arrangePath();
  };

  function assignType() {
    outerPath.forEach(cell => {
      cell.type = "OUTER_PATH"
    });
    finalPath.forEach(cell => {
      cell.type = "FINAL_PATH"
    });
  }

  function assignColor() {
    outerPath.forEach(cell => {
      cell.color = ["#444"]
    });
    finalPath.forEach(cell => {
      cell.color = ["RED","YELLOW", "BLUE", "GREEN"]
      // 1, 3, 2, 0
    });
  }

  this.renderPaths = () => {
    outerPath.forEach(cell => {
      cell.render()
    });
    finalPath.forEach(cell => {
      cell.render()
    });
  }

}
