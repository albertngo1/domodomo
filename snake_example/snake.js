const Coord = require("./coord.js");



class Snake {
  constructor(board, ctx) {
    this.directions = "N";
    this.turning = false;
    this.board = board;
    this.ctx = ctx;
    this.snakeLength = [];
    this.snakeInit(ctx);
    this.draw(ctx);
  }

  snakeInit() {
    let length = 5;

    for (let i=4; i >= 0; i--) {
      this.snakeLength.push({x: i, y: 0});
    }
  }
  
  move() {
    let nx = this.snakeLength[0].x;
    let ny = this.snakeLength[0].y;

    nx++;

    let tail = this.snakeLength.pop();
    tail.x = nx;
    this.snakeLength.unshift(tail);
  }


  draw(ctx) {
    const cw = 20;
    for (let j=0; j < this.snakeLength.length; j++) {
      let c = this.snakeLength[j];
      ctx.fillStyle = "blue";
      ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(c.x*cw, c.y*cw, cw, cw)

    }
  }



}

module.exports = Snake;
