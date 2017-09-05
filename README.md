# docPELGANGER

docPELGANGER is a JavaScript library that allows users to manipulate the DOM (Document Object Model) using custom made commands that mimics jQuery in the lightest way possible.


## To Get Started

Import the `docpelganger.js` source file into your source code. Also include the script into your HTML document.

```html
<head>
<script src="docpelganger.js"></script>
</head>
```

## API

`$l`



`DOMNodeCollection`


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
* 
