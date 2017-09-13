const Snake = require('./snake.js');


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("cv");
  const ctx = canvas.getContext("2d");
  const w = $l('#cv').nodes[0].width;
  const h = $l('#cv').nodes[0].height;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  const snake = new Snake(null, ctx);


  setInterval(() => snake.draw(ctx), 60)
  snake.move();

})
