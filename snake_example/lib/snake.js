class Snake {
  constructor(ctx) {
    this.directions = "E";
    this.ctx = ctx;
    this.snakeLength = [];
    this.snakeInit(ctx);

    $l('body').on("keypress", (e) => {
      this.handleInput(e);
    })

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

    if (this.directions === "E") nx += 1;
    else if (this.directions === "W") nx -= 1;
    else if (this.directions === "N") ny -= 1;
    else if (this.directions === "S") ny += 1;

    let tail = this.snakeLength.pop();
    tail.y = ny;
    tail.x = nx;
    this.snakeLength.unshift(tail);
  }

  handleInput(e) {
    const keyPress = e.keyCode;
    if (keyPress === 97) {
      if (this.directions !== "E") {
        this.directions = "W";
      }
    } else if (keyPress === 119) {
      if (this.directions !== "S") {
        this.directions = "N";
      }
    } else if (keyPress === 115) {
      if (this.directions !== "N") {
        this.directions = "S";
      }
    } else if (keyPress === 100) {
      if (this.directions !== "W") {
        this.directions = "E";
      }
    }
  }


  draw(ctx) {
    const cw = 20;
    const w = $l('#cv').nodes[0].width;
    const h = $l('#cv').nodes[0].height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

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
