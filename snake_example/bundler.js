/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
const GameView = __webpack_require__(4);


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("cv");
  const ctx = canvas.getContext("2d");
  const w = $l('#cv').nodes[0].width;
  const h = $l('#cv').nodes[0].height;
  let game;


  game = new Game(ctx);
  new GameView(game, ctx).start();



})


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {


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
    this.appleX = Math.round((Math.random()*w)/20)*20 - 20;
    this.appleY = Math.round((Math.random()*h)/20)*20 - 20;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.appleX, this.appleY , 20, 20);
  }


}




module.exports = Apple;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);
const Apple = __webpack_require__(2);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {



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


/***/ })
/******/ ]);
//# sourceMappingURL=bundler.js.map