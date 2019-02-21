// COLORS
/**
RED : (218,34,34)
GREEN : (89,209,56)
BLUE :
YELLOW :
*/

function createludoMap(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.homeSquares = [];
  this.finalSquares = [];
  this.outerPath = [];
  this.steps = [0, 1, 2, 4, 6, 8, 10, 12, 39, 41, 43, 45, 47, 49, 50, 51, 48, 46, 44, 42, 40, 14, 16, 18, 20, 22, 25, 24, 23, 21, 19, 17, 15, 13, 38, 36, 34, 32, 30, 28, 27, 26, 29, 31, 33, 35, 37, 11, 9, 7, 5, 3];
  this.finalPath = [];

  this.update = (a) => {
    // highlight current square.
    this.homeSquares.forEach(e => {
      if (e.c === a.currentTeam) {
        e.outlineHover = true;
        // Check the dice Number and switch according.
        if (a.dice) {
          if (a.dice === 6) {
            // Extra move.
            // if in home getOut of home.
            console.log('rolled : ' + a.dice);
            if (!e.pawnsOut || e.pawnsOut.length === 0) {
              // move pawn that has been touched.
              e.pawnsOut.push(e.inner[e.inner.length - 1].pop());
              e.pawnsOut[e.pawnsOut.length].move(e.steps.start[0].x, e.steps.start[0].y);

            }
          } else if (a.dice === 1 || a.dice === 2 || a.dice === 3 || a.dice === 4 || a.dice === 5) {
            console.log('rolled : ' + a.dice);
            ludo.changeTeam();
          }
        } else {
          console.log("waiting to roll dice...");
        }
      } else {
        e.outlineHover = false;
      }
    });
  }

  this.initialize = () => {
    this.createPaths();
    this.createfinalSquare();
    this.createhomeSquare();
  }

  this.render = () => {
    this.back();
    this.renderFinalSquare();
    this.renderHomeSquare();
    this.renderPaths();
  }

  this.halfSize = (x / 2 + y / 2) / 2;

  // this.onTop = () => {
  //   var space = 35;
  //   // // line(0,0,0,x);
  //   // line(0, 0, x, y);
  //   // line(0,y,x,0);
  //   // line(0, x/2, x, y/2);
  //   // line(y/2, 0, y/2, x);
  // }

  this.back = () => {
    background(180);
    fill(color('blueviolet'))
    rect(this.x, this.y, this.size, this.size, 20);
  };

  this.createfinalSquare = () => {

    x = this.x + (this.size / 2), y = this.y + (this.size / 2), colors = [], size = 60;
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
      this.finalSquares.push(new Final(x, y, size, radian[i], colors[i]));
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
    this.finalSquares.forEach(e => {
      e.render();
    });
  };

  this.createhomeSquare = () => {
    x = [], y = [], colors = [], size = 200;
    radius = 20;
    for (let i = 0; i < 4; i++) {
      x.push(i % 2 === 0 ? this.x : (this.x + this.size) - size);
      if (i < 2) {
        y.push(this.y);
      } else {
        y.push((this.y + this.size) - size);
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
      this.homeSquares.push(new Home(x[i], y[i], size, radius, colors[i]));
    }
    this.homeSquares.forEach(elem => {
      elem.createInnerCircles();
      elem.steps = arrangePath(elem.c);
      console.log(elem.steps);
    });
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
    this.homeSquares.forEach(e => {
      e.render();
    });
    this.homeSquares.forEach(e => {
      e.inner.forEach(e => {
        e.render();
      });
    });
  }


  this.createPaths = () => {
    var size = 30,
      spacing = this.y,
      inner_spacing = 10,
      offset = size / 2 + spacing;
    // top-side paths.
    for (var i = 0; i < 6; i++) {
      // ellipse(240, offset+(i*size + i*inner_spacing), size, size);
      this.outerPath.push(new Cell(this.x + 240, offset + (i * size + i * inner_spacing), size, "TOP"));
      if (i === 0) {
        // ellipse(300, offset+(i*size + i*inner_spacing), size, size)
        this.outerPath.push(new Cell(this.x + 300, offset + (i * size + i * inner_spacing), size, "TOP"));
      } else {
        this.finalPath.push(new Cell(this.x + 300, offset + (i * size + i * inner_spacing), size, "TOP"))
      }
      // ellipse(360, offset+(i*size + i*inner_spacing), size, size);
      this.outerPath.push(new Cell(this.x + 360, offset + (i * size + i * inner_spacing), size, "TOP"));
    }
    // bottom-side paths.
    spacing = this.y + 370;
    offset = size / 2 + spacing;
    for (var i = 0; i < 6; i++) {
      // ellipse(240, offset+(i*size + i*inner_spacing), size, size);
      this.outerPath.push(new Cell(this.x + 240, offset + (i * size + i * inner_spacing), size, "BOTTOM"))
      if (i === 5) {
        // ellipse(300, offset+(i*size + i*inner_spacing), size, size);
        this.outerPath.push(new Cell(this.x + 300, offset + (i * size + i * inner_spacing), size, "BOTTOM"))
      } else {
        this.finalPath.push(new Cell(this.x + 300, offset + (i * size + i * inner_spacing), size, "BOTTOM"))
      }
      // ellipse(360, offset+(i*size + i*inner_spacing), size, size);
      this.outerPath.push(new Cell(this.x + 360, offset + (i * size + i * inner_spacing), size, "BOTTOM"))
    }
    // left-side paths.
    spacing = this.x,
      offset = size / 2 + spacing;
    for (var i = 0; i < 6; i++) {
      // ellipse(offset+(i*size + i*inner_spacing), 240, size, size);
      this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 240, size, "LEFT"));
      if (i === 0) {
        // ellipse(offset+(i*size + i*inner_spacing), 300, size, size);
        this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 300, size, "LEFT"));
      } else {
        this.finalPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 300, size, "LEFT"));
      }
      // ellipse(offset+(i*size + i*inner_spacing), 360, size, size);
      this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 360, size, "LEFT"));
    }
    // right-side paths.
    spacing = this.x + 370;
    offset = size / 2 + spacing;
    for (var i = 0; i < 6; i++) {
      // ellipse(offset+(i*size + i*inner_spacing), 240, size, size);
      this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 240, size, "RIGHT"))
      if (i === 5) {
        // ellipse(offset+(i*size + i*inner_spacing), 300, size, size);
        this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 300, size, "RIGHT"))
      } else {
        this.finalPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 300, size, "RIGHT"))
      }
      // ellipse(offset+(i*size + i*inner_spacing), 360, size, size);
      this.outerPath.push(new Cell(offset + (i * size + i * inner_spacing), this.y + 360, size, "RIGHT"))
    }

    // arrangePath();
    assignType = () => {
      this.outerPath.forEach(cell => {
        cell.type = "OUTER_PATH"
      });
      this.finalPath.forEach(cell => {
        cell.type = "FINAL_PATH"
      });
    };
    assignColor = () => {
      this.outerPath.forEach((cell, index) => {
        cell.color = () => {
          if (index === 4) {
            return ["YELLOW"];
          } else if (index === 21) {
            return ["GREEN"];
          } else if (index === 29) {
            return ["BLUE"];
          } else if (index === 48) {
            return ["RED"];
          } else {
            return ["#ccc"];
          }
        };
        // cell.index = (index < 10) ? ('0' + index.toString()) : index;
        cell.index = index;

        cell.outline = () => {
          if (index === 5) {
            return true;
          } else if (index === 20) {
            return true;
          } else if (index === 32) {
            return true;
          } else if (index === 45) {
            return true;
          } else {
            return false;
          }
        };
      });
      this.finalPath.forEach((cell, index) => {

        // cell.index = (index < 10) ? ('0' + index.toString()) : index;
        cell.index = index;

        // cell.color = ["RED", "YELLOW", "BLUE", "GREEN"];
        cell.color = () => {
          switch (cell.side) {
            case "TOP":
              // fill(color(this.color[1]));
              return ["YELLOW"];
              break;
            case "BOTTOM":
              // fill(color(this.color[3]));
              return ["GREEN"];
              break;
            case "LEFT":
              // fill(color(this.color[2]));
              return ["BLUE"];
              break;
            case "RIGHT":
              // fill(color(this.color[0]));
              return ["RED"];
              break;
          }
        }
        // 1, 3, 2, 0
      });
    };

    arrangePath = (color) => {
      route = {
        team: color,
        out: false,
        start: [],
        mid: [],
        end: []
      };
      this.outerPath.forEach((cell) => {
        if (cell.color()[0] != "#ccc" && cell.color()[0] === route.team) {
          route.start.push(cell);
          return;
        } else if (cell.color()[0] === "#ccc") {
          route.mid.push(cell);
        }
      });

      route.mid = rearrange(route, this.outerPath, this.steps);

      this.finalPath.forEach(cell => {
        if (cell.color()[0] === route.team) {
          route.end.push(cell);
          return;
        }
      });
      return route;
      // console.log(route);
    }

    assignType();
    assignColor();

  }

  this.renderPaths = () => {
    this.outerPath.forEach(cell => {
      cell.render()
    });
    this.finalPath.forEach(cell => {
      cell.render()
    });
  }

  function rearrange(route, outer, steps) {
    // check the index of starting point,
    // set start =  index of starting point, ==> loop_counter = start
    counter = int(steps.findIndex((a) => {
      if (a === route.start[0].index) {
        return a
      }
    })) + 1;
    arranged = false;
    mid = [];
    // in each loop store the current cell, ==> route.mid.push(step[loop_counter]),
    for (let i = 0; i < steps.length - 2; i++) {
      mid.push(outer[steps[counter]]);
      counter = (counter <= 50) ? counter + 1 : 0;
    }
    // return the arranged route;
    return mid;
  }
}