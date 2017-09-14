const Game = require('./game.js');
const GameView = require('./game_view');


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("cv");
  const ctx = canvas.getContext("2d");
  const w = $l('#cv').nodes[0].width;
  const h = $l('#cv').nodes[0].height;
  let game;


  game = new Game(ctx);
  new GameView(game, ctx).start();



})
