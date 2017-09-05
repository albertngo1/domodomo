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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

  class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(text) {
    if (typeof text === "string") {
      this.nodes.forEach( (el) => {
        el.innerHTML = text;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(content) {
    this.nodes.forEach((node) => {
      if (content instanceof DOMNodeCollection) {
        content.nodes.forEach((el) => node.innerHTML += el.outerHTML);
      } else if (content instanceof HTMLElement ) {
        node.innerHTML += content.outerHTML;
      } else {
        node.innerHTML += content;
      }
    });
  }

  attr(attributeName, value) {
    if (value) {
      this.nodes.forEach( (el) => {
        el.attributes[attributeName].value = value;
      });
    } else {
      return this.nodes[0].attributes[attributeName].value;
    }
  }

  addClass(klass) {
    this.nodes.forEach( (el) => {
      el.classList.add(klass);
    });
  }

  removeClass(klass) {
    this.nodes.forEach( (el) => {
      el.classList.remove(klass);
    });
  }

  children() {
    const dnc = new DOMNodeCollection([]);
    this.nodes.forEach((el) => {
      dnc.nodes.push(...el.children);
    });
    return dnc;
  }

  parent() {
    const dnc = new DOMNodeCollection([]);
    this.nodes.forEach((el) => {
      dnc.nodes.push(el.parentNode);
    });
    return dnc;
  }

  find(selector) {
    const dnc = new DOMNodeCollection([]);
    this.nodes.forEach((el) => {
      dnc.nodes.push(...el.querySelectorAll(selector));
    });
    return dnc;
  }

  remove() {
    this.nodes.forEach((el) => {
      el.outerHTML = "";
    });
    this.nodes = [];
  }

  on(type, callback) {
    this.nodes.forEach((el) => {
      el.addEventListener(type, callback);
      el.callback = callback;
    });
  }

  off(type) {
    this.nodes.forEach((el) => {
      el.removeEventListener(type, el.callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const loadedCallbacks = [];

window.$l = function (arg) {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "string") {
    const els = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(els));
  } else {
    if (document.readyState === "complete") {
      arg();
    } else {
      loadedCallbacks.push(arg);
    }
  }
};

$l.extend = function (obj1, ...objs) {
  objs.forEach( (el) => {
    let keys = Object.keys(el);
    keys.forEach( (key) => {
      obj1[key] = el[key];
    });
  });
};

$l.ajax = function (options = {}) {
  return new Promise(function(resolve, reject) {
    const defaults = {
      success: () => {},
      error: () => {},
      url: "/",
      method: "GET",
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    $l.extend(defaults, options);
    defaults.method = defaults.method.toUpperCase();
    const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        defaults.success(xhr.response);
        resolve(xhr.response);
      } else {
        defaults.error(xhr.response);
        reject(xhr.response);
      }
    }
    xhr.send(JSON.stringify(defaults.data));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadedCallbacks.forEach(func => func());
});
window.$l.ajax = $l.ajax;


/***/ })
/******/ ]);