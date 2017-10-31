
class Apple {

  constructor(ctx) {
    this.ctx = ctx;
    this.appleX;
    this.appleY;
    this.applePos();
    this.draw(ctx);
  }

  applePos() {
    const w = $l('#cv').nodes[0].width;
    const h = $l('#cv').nodes[0].height;
    this.appleX = Math.round(Math.random()*w/20)*20 - 20;
    this.appleY = Math.round((Math.random()*h)/20)*20 - 20;
    if (this.appleX < 0) {
      this.appleX += 20;
    }
    if (this.appleY < 0) {
      this.appleY += 20;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.appleX, this.appleY , 20, 20);
  }


}




module.exports = Apple;
