var options = {},
  start = false,
  Kudo, stats = {},
  run = false,
  sel1, sel2;

function setup() {
  options.players = select('.input')
    .value();
  options.comp = options.players > 1 ? false : true
}

function startGame() {
  start = true;
  if (start) {
    Kudo = new Game(0, 0, windowWidth > windowHeight ? windowHeight : windowWidth, options)
    console.log(Kudo, windowWidth > windowHeight ? windowHeight : windowWidth);
    Kudo.start()
    update(Kudo)
    Kudo.selected.pawn = select('.pawnInput')
      .value()
    Kudo.selected.move = select('.moveInput')
      .value()
    select('.options')
      .addClass('hide')
  }
}

function draw() {
  if (start) {
    Kudo.show()
    update(Kudo)
    showStats(width, height)
  }
}

function edit() {
  console.log("clicked ");
  console.log(this);
}


function update(kudo) {
  if (!run) {
    (stats.input = () => {
      // SUBMIT BUTTON
      button = createButton('Move');
      button.position(250, 100);
      button.mousePressed(() => {
        if (Kudo.selected.pawn && Kudo.selected.move) {
          Kudo.play();
        } else {
          console.error("selected object not set");
        }
      });
      sel1 = createSelect();
      sel1.position(175, 82);
      sel1.addClass('pawnInput')
      sel1.option('0');
      sel1.option('1');
      sel1.option('2');
      sel1.option('3');
      sel1.changed(() => {
        Kudo.selected.pawn = sel1.value();
        console.log(sel1.value());
      });
      sel2 = createSelect();
      sel2.position(445, 82);
      sel2.addClass('moveInput')
      sel2.option('1');
      sel2.option('2');
      sel2.option('3');
      sel2.option('4');
      sel2.option('5');
      sel2.option('6');
      sel2.changed(() => {
        Kudo.selected.move = sel2.value();
        console.log(sel2.value());
      });
    })()
    run = true
  }
  stats.current = kudo.currentTeam;
  stats.players = kudo.players;
  stats.playing = kudo.playing;
  stats.steps = kudo.steps;
  stats.selected = kudo.selected;
  stats.played = kudo.played;
  stats.teams = kudo.teams;
  stats.state = {};
  var a = Object.keys(stats.teams);
  for (let i = 0; i < a.length; i++) {
    sta = {};
    sta.team = a[i];
    sta.pawn = [];
    Kudo.teams[a[i]].pawns.map((e, i) => {
      pawn = {}
      pawn.place = e.place.step
      pawn.moves = e.place.movesPlayed
      sta.pawn[i] = pawn
    })
    stats.state[i] = sta;
  }
}

function showStats(a, b) {
  push();
  textSize(32)
  stroke(0)
  keys = Object.keys(stats)
  text("CURRENT : ", a / 2 - 300, 50)
  text(stats.current, a / 2, 50)
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case "players":
        text(keys[i], a / 2 - 300, (i + 2) * 50)
        text(JSON.stringify(stats[keys[i]]), a / 2, (i + 2) * 50)
        text("pawn", 80, 100);
        text("steps", 350, 100);
        break;
      case "playing":
        text(keys[i], a / 2 - 300, (i + 2) * 50)
        text(JSON.stringify(stats[keys[i]]), a / 2, (i + 2) * 50)
        break;
      case "steps":
        text(keys[i], a / 2 - 300, (i + 2) * 50)
        text(JSON.stringify(stats[keys[i]]), a / 2, (i + 2) * 50)
        break;
      case "selected":
        text(keys[i], a / 2 - 300, (i + 2) * 50)
        text(JSON.stringify(stats[keys[i]]), a / 2, (i + 2) * 50)
        break;
      case "played":
        text(keys[i], a / 2 - 300, (i + 2) * 50)
        text(JSON.stringify(stats[keys[i]]), a / 2, (i + 2) * 50)
        break;
      case "teams":
        var keys = Object.keys(stats.state);
        var yspacing = (i + 2) * 50;
        keys.forEach((e, i) => {
          text(JSON.stringify(stats.state[i].team), i * 150, yspacing)
          var xspacing = i * 150 + 50
          stats.state[i].pawn.forEach((e, i) => {
            text(JSON.stringify(e.place), xspacing, i * 50 + yspacing + 100)
          });
          stats.state[i].team
        });
        break;
      case "state":
        text(stats.state.winners, a / 2 - 300, (i + 2) * 50)
        break;
    }
  }
  pop();
}
//
// this.addEventListner('move', this.move)
// this.addEventListner('next', this.nextTurn)
