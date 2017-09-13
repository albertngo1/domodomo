

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

  }

  start() {
    this.lastTime = 0;
    setInterval(() => this.animate(), 100)
    // requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    let delta = time - this.lastTime;
    this.game.step();






    this.lastTime = time;
    // requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
