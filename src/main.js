const DOMNodeCollection = require('./domNodeCollection.js');

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

    if (options.method === "GET"){
      options.url += "?" + toQueryString(options.data);
    }

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

toQueryString = obj => {
  let result = "";
  for (let key in obj) {
    if (obj.hasOwnProperty) {
      result += key + "=" + obj[key] + "&";
    }
  }
}



document.addEventListener("DOMContentLoaded", () => {
  loadedCallbacks.forEach(func => func());
});
