# DOMODOMO

<p align="center">
  <img width="460" height="300" src="/assets/snake_example.gif">
</p>

DOMODOMO is a JavaScript library that allows users to manipulate the DOM (Document Object Model) using custom made commands that mimics jQuery in the lightest way possible.

[Live](https://albertngo1.github.io/domodomo/)


## To Get Started

Import the `DOMODOMO.js` source file into your source code from the `src` folder. Also include the script into your HTML document.

```html
<head>
<script src="./src/DOMODOMO.js"></script>
</head>
```

One may also use `webpack -w` in the terminal to bundle the `main.js` and `dom_node_collection.js` files to access the library.

## API

#### `$l`

`$l` is a wrapper that allows the usage of the DOMODOMO methods. It can take in the following as arguments:
- HTML Element objects
- strings (classes, id, html)

```javascript
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
```
It will parse the arguments into an array-like object (`DOMNodeCollection`)
which allows for the following methods to be used below.

The wrapper will also allow queueing up actions to be taken place after the DOM has been fully loaded, preventing side effects from occuring.


#### `DOMNodeCollection` methods

`html(text)`
* Returns the `innerHTML` of the first node in the array if no argument is given. Otherwise, it sets the `innerHTML` of all nodes selected to the specified text in the argument.

`empty()`
* Clears out the content of all nodes selected.

`append(content)`
* Takes a `DOMNodeCollection` , HTMLElement, or string and appends it to each element in the `DOMNodeCollection`.

`attr(attributeName, value)`
* The `attr` function acts as a setter/getter. If a value is passed in as a second argument, it will assign an attribute and value to each node in the `DOMNodeCollection`. Otherwise, the function will just return the value of the attribute specified in the argument.

`addClass(class)`
* Adds classes to selected nodes.

`removeClass(class)`
* Removes classes from selected nodes.

`children()`
* Creates a `DOMNodeCollection` consisting of the children nodes of the current `DOMNodeCollection`.

`parent()`
* Returns the parent nodes of the current `DOMNodeCollection`.

`find(selector)`
* Finds nodes that meet the argument criteria.

`remove()`
* Removes HTML of all nodes in the DOM as well as the nodes themselves from the array.

#### Event Listeners

`on(type, callback)`
* Takes in a type of event handler and the callback and applies it to a `DOMNodeCollection`.

`off(type)`
* Removes passed in event handler from the `DOMNodeCollection`.

#### AJAX

An AJAX call can be made by sending a HTTP request with options containing the following:

```javascript
defaults = {
  success: () => {},
  error: () => {},
  url: "",
  method: 'GET',
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};  
```
The options merge with the defaults to achieve the desired request.


### Live Example

A showcase of the library is [shown here](https://albertngo1.github.io/domodomo/). The game uses the DOMODOMO library to be able to let you play snake!
