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
