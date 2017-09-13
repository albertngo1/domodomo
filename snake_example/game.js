const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Game {

  constructor(ctx) {
    this.snake = new Snake(ctx);
    this.apple = [new Apple(ctx)];
    this.ctx = ctx;
    this.gameOver = false;
  }

  step(delta) {
    const ctx = this.ctx;
    if (this.gameOver === false) {
      this.snake.draw(ctx);
      this.apple[0].draw(ctx);
      this.snake.move();
      this.checkCollisionSnake();
      this.checkCollisionApple();
      this.checkOutOfBounds();
    }
  }

  checkCollisionApple() {
    const snake = this.snake.snakeLength
    let applePos = [this.apple[0].appleX, this.apple[0].appleY];
    let snakePos = [snake[0].x*20, snake[0].y*20];
    if (applePos[0] === snakePos[0] && applePos[1] === snakePos[1]
      ) {
      this.snakeEatApple(snakePos);
    }
  }

  snakeEatApple(snakePos) {
    this.apple.splice(0, 1);
    this.apple.push(new Apple(this.ctx));
    this.snake.snakeLength.forEach( piece => {
      if (this.apple[0].appleX === piece[0] || this.apple[0].appleY === piece[1]) {
        this.apple.splice(0, 1);
        this.apple.push(new Apple(this.ctx));
      }
    })
    this.snake.snakeLength.splice(1, 0, {x: snakePos[0]/20, y: snakePos[1]/20})
  }
  checkCollisionSnake() {
    const snake = this.snake.snakeLength;
    const snakeHead = [snake[0].x, snake[0].y];
    debugger
    for (let i=1; i < snake.length; i++) {
      if (snakeHead[0] === snake[i].x && snakeHead[1] === snake[i].y) {
        this.gameOver = true;
      }
    }
  }

}







module.exports = Game;
