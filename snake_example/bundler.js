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

const Snake = __webpack_require__(1);


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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(2);



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


/***/ }),
/* 2 */
/***/ (function(module, exports) {



class Coord {

  plus() {

  }

}


/***/ })
/******/ ]);
//# sourceMappingURL=bundler.js.map