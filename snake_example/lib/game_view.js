

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    setInterval(() => this.animate(), 100)
  }

  animate(time) {
    let delta = time - this.lastTime;

    if (this.game.gameOver) {

    } else {
      this.game.step();

    }
    this.lastTime = time;
  }
}

module.exports = GameView;
