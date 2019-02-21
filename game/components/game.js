function game() {

  // this.state = false;
  //
  // this.teams = ['GREEN', 'RED', 'BLUE', 'YELLOW'];
  //
  // this.gameNext = () => {
  //   if (this.state) {
  //     map.update(this);
  //   }
  //   redraw();
  // }
  //
  // this.changeTeam = () => {
  // }
  //
  // this.start = () => {
  //   this.startTime = new Date().getTime();
  //   console.log('Started Game at : ' + this.startTime);
  //   this.state = true;
  //   //
  //   this.currentTeam = random(this.teams);
  //   this.players = 4;
  //   this.gameNext();
  // };
  //
  // this.gameEnd = () => {
  //   this.endTime = new Date().getTime();
  // }
  //
  // this.gameDuration = () => {
  //   if ((this.endTime) && (this.startTime)) {
  //     console.log("duration [ms] = " + (this.endTime - this.startTime));
  //   } else if ((!this.endTime) && (this.startTime)) {
  //     console.log("Match is not yet finished !");
  //   } else if ((!this.endTime) && (!this.startTime)) {
  //     console.log("Match is not yet started !");
  //   }
  // }
  //
  // this.rollDice = () => {
  //   this.dice = random([1, 2, 3, 4, 5, 6]);
  //   this.gameNext();
  // };
  //
  // this.history = [];
  //
  // this.storeMove = () => {
  //   var move = {};
  //
  // }
  //
  // this.move = (startCell, endCell) => {
  //   endCell.pawns.push(startCell.pawns.pop());
  // }

  this.state = false;

  this.update = () => {

  }

  // this.teams = ['GREEN', 'RED', 'BLUE', 'YELLOW'];
  this.teams = {
    'GREEN': {
      pawns: {
        out: 0,
        current: [0, 0, 0, 0],
        reached: [0, 0, 0, 0]
      }
    },
    'RED': {
      pawns: {
        out: 0,
        current: [0, 0, 0, 0],
        reached: [0, 0, 0, 0],
        selected: 0
      }
    },
    'BLUE': {
      pawns: {
        out: 0,
        current: [0, 0, 0, 0],
        reached: [0, 0, 0, 0],
        selected: 0
      }
    },
    'YELLOW': {
      pawns: {
        out: 0,
        current: [0, 0, 0, 0],
        reached: [0, 0, 0, 0],
        selected: 0
      }
    }
  }

  this.teams.array = function() {
    a = Object.keys(ludo.teams);
    a.pop();
    a.pop();
    return a;
  };

  this.movePawns = function(team, type, selected) {
    switch (type) {
      case 'out':
        this.teams[team].out++;
        this.teams[team].current[this.teams[team].out]++;
        break;
      case 'increament':
        this.teams[team].current[selected]++;
        break;
      case 'back':
        this.teams[team].current[selected] = 0;
        this.pawnsOut--;
        break;
    };
    for (let i = 0; i < this.teams[team].current.length; i++) {
      if (this.teams[team].current[i] >= 52) {
        this.teams[team].current[i] = 52;
        this.teams[team].reached[i] = true;
      }
    }
  };


  this.rollDice = () => {
    this.rolled = true;
    return random([1, 2, 3, 4, 5, 6]);
  }

  this.changeTeam = () => {
    array = this.teams.array();
    index = array.indexOf(this.currentTeam);
    if (index >= 3) {
      index = 0;
    } else if (index < 3) {
      index++;
    }
    this.currentTeam = array[index];
  }

  this.start = () => {
    this.rolled = false;
    this.currentTeam = random(this.teams.array());
    this.rollDice();
    if (this.rolled) {
      this.move();
      this.rolled = false;
    }
  }

  this.turn = () => {
    this.rolled = false;
    // this.rollDice();
    if (this.rolled) {
      this.move();
      this.rolled = false;
    }
    this.changeTeam();
  }

  this.move = () => {
    function checkState(x, y) {

      return y[x].pawns.out;

    }

    var state = checkState(this.currentTeam, this.teams);
    if (state.pawnsOut === 0) {
      if (this.dice === 6) {
        movePawns(this.currentTeam, 'out');
      }
    } else if (state.pawnsOut > 0) {
      if (state.pawnsOut > 1) {
        movePawns(this.currentTeam, 'increament', selected);
      }
      movePawns(this.currentTeam, 'increament');
    }
  }

}




/**

LUDO FEN STRING :

|  r1  | r2  |       |  b1  | b2  |
|  r3  | r4  |       |  b3  | b4  |


|  g1  | g2  |       |  y1  | y2  |
|  g3  | g4  |       |  y3  | y4  |

step => s = 1-52,

final => f = 1-5

starting position => (r1,r2,r3,r4)/(g1,g2,g3,g4)/(y1,y2,y3,y4)/(b1,b2,b3,b4)

ending position => (r1.1,r2.)

*/
