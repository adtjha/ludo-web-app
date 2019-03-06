// GAME CLASS DEFINES THE KUDO GAME OBJECT
class Game {
  // STORES THE ESSENTIAL DATAPOINTS
  constructor(x, y, size, options) {
    this.pos = {
      x: x,
      y: y
    }
    this.size = size
    this.players = options.players
    this.comp = options.comp
    this.canvas = createCanvas(this.size, this.size)
    this.playing = true
    this.steps = []
    this.selected = {
      move: undefined,
      pawn: undefined
    } //USED WHEN USER SELECTS A PIECE TO MOVE.
    this.played = false
    // SAVES THE WINNERS.
    this.winners = []
  }
  // FIRST TIME RUN
  start = () => {
    // String names of the Teams.
    var teams = ['GREEN', 'RED', 'BLUE', 'YELLOW']
    // teams Object storing each team.
    this.teams = {}
    // moves, stores the moves that are possible.
    var moves = []
    // Array running for initializing each team.
    for (let j = 0; j < this.players; j++) {
      // pawns.place = []
      this.teams[teams[j]] = {}
      this.teams[teams[j]].pawns = []
      for (let i = 0; i < 4; i++) {
        var pawn = {}
        // Storing Label names in order to identify each pawn.
        pawn.label = {
          team: teams[j].toString(),
          name: i.toString()
        };
        // Place Object stores each pawn's current place and the available moves.
        pawn.place = {
          step: 0,
          movesPlayed: {
            1: 3,
            2: 3,
            3: 3,
            4: 3,
            5: 2,
            6: 2
          }
        }
        // State Object is an arrow function, which when called returns the current state of the pawn, ["out", "inside", "reached"]
        pawn.state = (team, pawn) => {
          if (this.teams[team].pawns[pawn].place.step > 0 && this.teams[team].pawns[pawn].place.step < 56) {
            return 'out'
          } else if (this.teams[team].pawns[pawn].place.step === 56) {
            return 'reached'
          } else if (this.teams[team].pawns[pawn].place.step < 1) {
            return 'inside'
          }
        }
        // Storing pawn object in each pawn created.
        this.teams[teams[j]].pawns[i] = pawn
      }
    }

    // Fill in Steps,
    this.steps = new Array(52);

    // In the start, set the current team randomnly
    this.currentTeam = random(teams)
  }

  // CHANGES THE TURN BY CHANGING THE CURRENT-TEAM PLAYING
  changeTurn() {
    var teams = Object.keys(this.teams),
      index = undefined;
    teams.forEach((team, i) => {
      if (team === this.currentTeam) {
        index = i
      }
    })
    if (index === 3) {
      index = 0;
    } else if (index < 3) {
      index++;
    }
    this.currentTeam = teams[index];
    console.log(this.currentTeam);
    // this.turn()
  }

  // DOES THE ACTIONS THAT ARE REQUIRED FOR A TURN, MOVING A PEICE, THEN CHANGING TURN.
  turn() {
    if (!this.playing) {
      console.log(this.playing)
      this.end()
    } else if (this.playing) {
      // this.pawnState = this.teams[this.currentTeam].pawns
      this.play()
    }
  }

  // CALLS THE MOVE FUNCTION, AFTER CHECKING IF MOVE IS VALID AND LEGAL.
  play() {
    console.log("Team : " + this.currentTeam)
    console.log("Waiting for a move")
    var current = this.currentTeam
    if (this.selected.move) {
      var legal = this.checkLegal(this.selected)
      var valid = this.checkValidity(this.selected)
      if (legal && valid) {
        this.move(this.selected)
        return
      } else {
        if (legal && !valid) {
          count = 0
          this.teams[current].pawns.forEach((pawn, index) => {
            if (pawn.state(current, index) === 'reached') {
              count++
            }
          })
          if (count.length === this.teams[current].pawns.length) {
            this.winner.push(current)
            delete this.teams[current]
          }
        }
        alert("Illegal Move");
        console.error(legal, valid);
      }
      this.history.push(this.selected)
    }
  }

  // MOVES A PEICE ON THE BOARD ACCORDING TO THE SELECTED PEICE.
  move(peice) {
    var current = this.currentTeam
    console.log("Moving Pawn ...");
    var count = 0
    this.teams[current].pawns.forEach(pawn => {
      if (pawn.label.name === peice.pawn) {
        --pawn.place.movesPlayed[peice.move];
        console.log("Editing available moves", pawn.place.movesPlayed);
        for (let i = 0; i < peice.move; i++) {
          pawn.place.step++
        }
      }
    })
    this.changeTurn()
    return
  }

  // CALLED WHEN THE GAME HAS ENDED.
  end() {
    this.playing = false
    // var victoryImage = saveImage()
    console.log("Winners : " + this.winners);
  }

  // this.move.dispatchEvent('move')

  show() {
    background(127)
  }

  checkValidity(userMove) {
    if (this.teams[this.currentTeam].pawns[userMove.pawn].state === "reached") {
      return false
    } else {
      return true
    }
  }

  checkLegal(userMove) {
    console.log(userMove);
    var pawn = (this.teams[this.currentTeam].pawns[userMove.pawn]);
    console.log(pawn);
    switch (pawn.state(this.currentTeam, pawn.label.name)) {
      case "inside":
        if (userMove.move == 1) {
          return true
        } else if (userMove.move != 1) {
          return false
        }
        break
      case "reached":
        return false
        break
      case "out":
        if (availableMoves(pawn.place.movesPlayed, userMove.move)) {
          return true
        } else {
          return false
        }
        break
    }
    console.log("here.. still not returned");
  }


}

function availableMoves(moves, move) {
  if (moves[move] > 0) {
    return true
  } else {
    return false
  }
}

//
//
//
//
// /**
//
// LUDO FEN STRING :
//
// |  r1  | r2  |       |  b1  | b2  |
// |  r3  | r4  |       |  b3  | b4  |
//
//
// |  g1  | g2  |       |  y1  | y2  |
// |  g3  | g4  |       |  y3  | y4  |
//
// step => s = 1-52,
//
// final => f = 1-5
//
// starting position => (r1,r2,r3,r4)/(g1,g2,g3,g4)/[]/(y1,y2,y3,y4)/(b1,b2,b3,b4)
//
// ending position => (r1.1,r2.)
//
// */
