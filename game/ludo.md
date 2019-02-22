1. Show StartScreen for options.
2. Store the options in a `options{}` object.
3. When startButton is clicked, set `start` to `true`,
4. create a new game, using the game object.
5. play game by calling every turn, ` game.nextTurn()`, and check for `game.ended`
6. in each `game.turn()`, 
   1. check for all the currentTeam's pawns loacation, and store it in state.
   2. Set the `movesAllowed` object with the pawns that can be moved and by how many steps that pawn can move at maximum, at minimum.
   3. Ask for user move `playMove() ==> userMove` and,
      1.  if `isLegalMove(userMove)` returns true than store it in `movePlayed()` 
      2. if it returns false then send error and ask user to `playMove()` again, and show error.
   4. if `movePlayed != undefined` than, `game.move(movePlayed.from, movePlayed.to)`,
   5. if all the pawns have reached the final stage[`checkFinal(state)`], then call `game.final()` ,
   6. If `game.ended` is `false`, call `game.changeTurn()`, else if it is `true,` then `game.end()`
7. when a team has successfully moved all of its pawns to the final stage, `game.final()` is called,
   1. push it in `game.winners` array, 
   2. if `game.winners.length === 2`, then set `game.ended === true` 
8.  `game.end()` is called when, `game.ended` is true,
   1. take the screen shot and save it in `game.VictoryImage`,
   2. Show the winners,
   3. give the option for game restart.