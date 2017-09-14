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
    this.snake.draw(ctx);
    this.apple[0].draw(ctx);
    this.snake.move();
    this.checkCollisionSnake();
    this.checkCollisionApple();
    this.checkOutOfBounds();
  }

  checkOutOfBounds() {
    const snakeHead = [this.snake.snakeLength[0].x * 20, this.snake.snakeLength[0].y * 20];
    const w = $l('#cv').nodes[0].width;
    const h = $l('#cv').nodes[0].height;
    if (snakeHead[0] < 0 || snakeHead[0] > w - 20 ||
    snakeHead[1] < 0 || snakeHead[1] > h - 20) {
      this.gameOver = true;
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
    for (let i=1; i < snake.length; i++) {
      if (snakeHead[0] === snake[i].x && snakeHead[1] === snake[i].y) {
        this.gameOver = true;
      }
    }
  }

}







module.exports = Game;
