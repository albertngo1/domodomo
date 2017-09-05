const DOMNodeCollection = require('./dom_node_collection');

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

$l.ajax = function (options) {
  defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = (() => options.success(JSON.parse(xhr.response)));
  xhr.send(JSON.stringify(options.data));
};

document.addEventListener("DOMContentLoaded", () => {
  loadedCallbacks.forEach(func => func());
});
