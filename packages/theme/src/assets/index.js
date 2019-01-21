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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = undefined;
exports.addVariant = addVariant;
exports.updateAddon = updateAddon;
exports.removeAddon = removeAddon;
exports.addItemById = addItemById;
exports.fetchCart = fetchCart;

var _unfetch = __webpack_require__(9);

var _unfetch2 = _interopRequireDefault(_unfetch);

var _mitt = __webpack_require__(3);

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ev = (0, _mitt2.default)();

var on = exports.on = ev.on;

function addVariant(variant, quantity) {
  var numAvailable = variant.inventory_policy === 'deny' && variant.inventory_management === 'shopify' ? variant.inventory_quantity : null; // null means they can add as many as they want

  return fetchCart().then(function (_ref) {
    var items = _ref.items;

    var existing = items.filter(function (item) {
      return item.id === variant.id;
    })[0] || {};
    var numRequested = (existing.quantity || 0) + quantity;

    if (numAvailable !== null && numRequested > numAvailable) {
      var err = 'There are only ' + numAvailable + ' of that product available, requested ' + numRequested + '.';
      ev.emit('error', err);
      throw new Error(err);
    } else {
      return addItemById(variant.id, quantity);
    }
  });
}

function updateAddon(id, quantity) {
  return fetchCart().then(function (_ref2) {
    var items = _ref2.items;

    for (var i = 0; i < items.length; i++) {
      if (items[i].variant_id === parseInt(id)) {
        return changeAddon(i + 1, quantity); // shopify cart is a 1-based index
      }
    }
  });
}

function removeAddon(id) {
  return updateAddon(id, 0);
}

function changeAddon(line, quantity) {
  ev.emit('updating');

  return (0, _unfetch2.default)('/cart/change.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ line: line, quantity: quantity })
  }).then(function (res) {
    return res.json();
  }).then(function (cart) {
    ev.emit('addon', { item: null, cart: cart });
    return cart;
  });
}

/**
 * Warning: this does not check available products first
 */
function addItemById(id, quantity) {
  ev.emit('updating');

  return (0, _unfetch2.default)('/cart/add.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, quantity: quantity })
  }).then(function (r) {
    return r.json();
  }).then(function (item) {
    return fetchCart().then(function (cart) {
      ev.emit('updated', { item: item, cart: cart });
      return { item: item, cart: cart };
    });
  });
}

function fetchCart() {
  return (0, _unfetch2.default)('/cart.js', {
    method: 'GET',
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(2);

var _router2 = _interopRequireDefault(_router);

var _picoapp = __webpack_require__(10);

var _picoapp2 = _interopRequireDefault(_picoapp);

var _header = __webpack_require__(4);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(types) {
  return function () {
    var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    for (var type in types) {
      var attr = 'data-' + type;
      var nodes = [].slice.call(ctx.querySelectorAll('[' + attr + ']'));

      for (var i = 0; i < nodes.length; i++) {
        try {
          __webpack_require__(30)(types[type] + nodes[i].getAttribute(attr) + '.js').default(nodes[i]);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
};

// document.addEventListener('DOMContentLoaded', e => {
//   init({
//     component: './components/',
//     page: './pages/'
//   })()
// })
//
// /**
//  * Script management
//  */
// scripts.init({
//   component: 'components/',
//   util: 'util/'
// })
//
// scripts.mount()

var app = (0, _picoapp2.default)({
  header: _header2.default
});

app.mount();

_router2.default.on('afterRender', function () {
  console.log('route rendered!');
  app.unmount();
  setTimeout(function () {
    app.mount();
  }, 0);
});

console.groupCollapsed('Slater credits 🍝  pew');
console.log('Development by The Couch https://thecouch.nyc');
console.groupEnd();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operator = __webpack_require__(25);

var _operator2 = _interopRequireDefault(_operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as scripts from 'micromanager'

var router = (0, _operator2.default)({
  transitionSpeed: 400,
  routes: {}
});

// router.addRoute('*', () => {
//   const cache = scripts.cache.dump()
//   let modules = []
//
//   for (let key in cache) {
//     modules.push(cache[key])
//   }
//
//   return Promise.all(modules.map(mod => {
//     return mod.leave ? mod.leave() : mod
//   }))
// })

router.on('afterRender', function (requestedRoute) {
  // const cartDrawer = scripts.cache.get('cart-drawer')
  // cartDrawer && cartDrawer.close()

  var pageTransition = document.getElementById('pageTransition');
  setTimeout(function () {
    pageTransition.classList.remove('cover');
  }, 600);
});

router.on('beforeRender', function (requestedRoute) {
  var root = document.getElementById('root');
  var pageTransition = document.getElementById('pageTransition');

  root.classList.add('moving');
  pageTransition.classList.add('cover');
  setTimeout(function () {
    console.log('waiting game');
  }, 700);
});

exports.default = router;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cart = __webpack_require__(0);

var _picoapp = __webpack_require__(10);

exports.default = (0, _picoapp.component)(function (_ref) {
  var header = _ref.node;

  // Handle cart count hard hit
  console.log('hey header?');
  var cartCount = header.querySelector('.js-cart-count');
  var cart = (0, _cart.fetchCart)();
  cart.then(function (res) {
    /* eslint-disable */
    res ? cartCount.innerHTML = res.item_count : null;
    /* eslint-enable */
  });
  (0, _cart.on)('updated', function (_ref2) {
    var cart = _ref2.cart;

    cartCount.innerHTML = cart.item_count;
  });
  (0, _cart.on)('addon', function (_ref3) {
    var cart = _ref3.cart;

    cartCount.innerHTML = cart.item_count;
  });
  /**
  // * Cart opening
  // */
  var cartToggles = header.querySelectorAll('.js-cart-drawer-toggle');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cartToggles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var toggle = _step.value;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var cartDrawer = scripts.cache.get('cart-drawer');
        cartDrawer.open();
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProductSelector;

var _mitt = __webpack_require__(3);

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProductSelector() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    main: '[data-product-select]',
    options: '[data-single-option-selector]',
    data: '[data-product-json]'
  };

  var ev = (0, _mitt2.default)();

  var main = document.querySelector(config.main);
  var options = [].slice.call(document.querySelectorAll(config.options));
  var data = JSON.parse(document.querySelector(config.data).innerHTML);

  options.forEach(function (opt) {
    return opt.addEventListener('change', function (e) {
      var val = options.reduce(function (res, opt, i) {
        res += i < options.length - 1 ? opt.value + ' / ' : opt.value;
        return res;
      }, '');

      for (var i = 0; i < main.options.length; i++) {
        if (main.options[i].text === val) {
          main.selectedIndex = i;
          break;
        }
      }

      ev.emit('update', data.variants.filter(function (v) {
        return v.title === val;
      })[0]);
    });
  });

  return {
    on: ev.on,
    destroy: function destroy() {
      options.forEach(function (opt) {
        // opt.removeEventListener('change', updateSelect)
      });
    }
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMoney = formatMoney;

var _utils = __webpack_require__(7);

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */

/* eslint-disable */

function formatMoney(cents) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '${{amount}}';

  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }

  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = (0, _utils.defaultTo)(precision, 2);
    thousands = (0, _utils.defaultTo)(thousands, ',');
    decimal = (0, _utils.defaultTo)(decimal, '.');

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    var centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (format.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_space_separator':
      value = formatWithDelimiters(cents, 2, ' ', '.');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, ',', '.');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
  }

  return format.replace(placeholderRegex, value);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInstance = findInstance;
exports.removeInstance = removeInstance;
exports.compact = compact;
exports.defaultTo = defaultTo;
/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

/**
 * Return an object from an array of objects that matches the provided key and value
 *
 * @param {array} array - Array of objects
 * @param {string} key - Key to match the value against
 * @param {string} value - Value to get match of
 */
function findInstance(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
}

/**
 * Remove an object from an array of objects by matching the provided key and value
 *
 * @param {array} array - Array of objects
 * @param {string} key - Key to match the value against
 * @param {string} value - Value to get match of
 */
function removeInstance(array, key, value) {
  var i = array.length;

  while (i--) {
    if (array[i][key] === value) {
      array.splice(i, 1);
      break;
    }
  }

  return array;
}

/**
 * _.compact from lodash
 * Remove empty/false items from array
 * Source: https://github.com/lodash/lodash/blob/master/compact.js
 *
 * @param {array} array
 */
function compact(array) {
  var index = -1;
  var resIndex = 0;
  var length = array == null ? 0 : array.length;
  var result = [];

  while (++index < length) {
    var value = array[index];

    if (value) {
      result[resIndex++] = value;
    }
  }

  return result;
}

/**
 * _.defaultTo from lodash
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
 *
 * @param {*} value - Value to check
 * @param {*} defaultValue - Default value
 * @returns {*} - Returns the resolved value
 */
function defaultTo(value, defaultValue) {
  return value == null ? defaultValue : value;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.loadImage = loadImage;
exports.imageSize = imageSize;
exports.getSizedImageUrl = getSizedImageUrl;
exports.removeProtocol = removeProtocol;
/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */
function preload(images, size) {
  if (typeof images === 'string') {
    images = [images];
  }

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
function loadImage(path) {
  /* eslint-disable */
  new Image().src = path;
  /* eslint-enable */
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
function imageSize(src) {
  /* eslint-disable */
  var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
  /* esling-enable */

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
function getSizedImageUrl(src, size) {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    var prefix = src.split(match[0]);
    var suffix = match[0];

    return removeProtocol(prefix[0] + '_' + size + suffix);
  } else {
    return null;
  }
}

function removeProtocol(path) {
  return path.replace(/http(s)?:/, '');
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch=='function' ? fetch.bind() : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return n; });
function t(t,n,e){return{node:t,actions:n,hydrate:e.hydrate,get state(){return e.state}}}function n(n){return function(e,r,o){var u=n(t(e,r,o))||{};return u.onStateChange&&o.listen(u.onStateChange),u}}/* harmony default export */ __webpack_exports__["default"] = (function(n,e,r){void 0===n&&(n={}),void 0===r&&(r={});var o=[],u=function(t){var n=Object.assign({},t),e=[],r=[];return{get state(){return n},hydrate:function(t){return n=Object.assign({},n,"function"==typeof t?t(n):t),function(t){for(var o=0,u=e;o<u.length;o+=1)(0,u[o])(n);for(;r.length;)r.pop()(n);t&&t()}},listen:function(t){return e.indexOf(t)<0&&e.push(t),function(){return e.splice(e.indexOf(t),1)}},once:function(t){r.indexOf(t)<0&&r.push(t)},reset:function(){n=t},replace:function(t){n=t}}}(e||{}),i=Object.keys(r).reduce(function(t,n){return t[n]=function(t){return Promise.resolve(r[n](t)(u.state)).then(function(t){return u.hydrate(t)()})},t},{});return{actions:i,hydrate:u.hydrate,get state(){return u.state},add:function(t){Object.assign(n,t)},mount:function(t){void 0===t&&(t="data-component"),t=[].concat(t);for(var e=0;e<t.length;e++)for(var r=t[e],c=[].slice.call(document.querySelectorAll("["+r+"]"));c.length;)for(var a=c.pop(),f=a.getAttribute(r).split(/\s/),s=0;s<f.length;s++){var l=n[f[s]];if(l){a.removeAttribute(r);try{o.push(l(a,i,u))}catch(t){console.error("picoapp - "+f[s]+" failed - "+(t.message||t),t.stack)}}}},unmount:function(){return Promise.all(o.filter(function(t){return t.onUnmount}).map(function(n){var e=n.onUnmount;return Promise.resolve("function"==typeof e?e(t(n.node,i,u)):null)})).then(function(){o=o.filter(function(t){return!t.onUnmount}).filter(function(t){return!document.documentElement.contains(t.node)})})}}});;
//# sourceMappingURL=picoapp.es.js.map


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (outer) {
  var login = outer.querySelector('.js-login-dialog');
  var recover = outer.querySelector('.js-recover-dialog');
  var recoverLink = outer.querySelector('.js-recover-trigger');
  var cancelRecoverLink = outer.querySelector('.js-recover-cancel');

  /* eslint-disable */
  var recoverIsTarget = window.location.hash.match(/\#recover/) ? true : false;
  /* eslint-enable */

  var successMessage = outer.querySelector('.js-recover-success') !== null;

  if (recoverIsTarget || successMessage) {
    login.style.display = 'none';
    recover.style.display = 'block';
  } else {
    login.style.display = 'block';
  }

  recoverLink.addEventListener('click', function (e) {
    e.preventDefault();
    login.style.display = 'none';
    recover.style.display = 'block';
  });

  cancelRecoverLink.addEventListener('click', function (e) {
    e.preventDefault();
    recover.style.display = 'none';
    login.style.display = 'block';
  });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cart = __webpack_require__(0);

exports.default = function (item) {
  var button = item.getElementsByTagName('button')[0];
  var decrease = item.querySelector('.js-remove-single');
  var increase = item.querySelector('.js-add-single');
  var currentQty = item.querySelector('.js-single-quantity').innerHTML;
  var id = item.getAttribute('data-id');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    (0, _cart.removeAddon)(id);
  });

  decrease.addEventListener('click', function (e) {
    e.preventDefault();
    (0, _cart.updateAddon)(id, parseInt(currentQty) - 1);
  });

  increase.addEventListener('click', function (e) {
    e.preventDefault();
    (0, _cart.updateAddon)(id, parseInt(currentQty) + 1);
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _micromanager = __webpack_require__(31);

var scripts = _interopRequireWildcard(_micromanager);

var _cart = __webpack_require__(0);

var _images = __webpack_require__(8);

var _currency = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var X = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentcolor" stroke-width="3" style="display:inline-block;vertical-align:middle;overflow:visible;"><path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path><path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path></svg>';

function createItem(_ref) {
  var id = _ref.variant_id,
      title = _ref.product_title,
      price = _ref.line_price,
      color = _ref.variant_title,
      image = _ref.image,
      url = _ref.url,
      quantity = _ref.quantity,
      item = _objectWithoutProperties(_ref, ['variant_id', 'product_title', 'line_price', 'variant_title', 'image', 'url', 'quantity']);

  var img = image ? (0, _images.getSizedImageUrl)(image.replace('_' + (0, _images.imageSize)(image), ''), '200x' // TODO hacky af
  ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333';

  return '\n<div class=\'cart-drawer__item\' data-component=\'cart-drawer-item\' data-id=' + id + '>\n  <div class=\'f aic\'>\n    <a href=\'' + url + '\'>\n      <img src=\'' + img + '\' />\n    </a>\n    <div class=\'__content pl1 f fill-y ais jcb\'>\n      <div>\n        <a href=\'' + url + '\' class=\'serif mv0 p mv0\'>' + title + '</a>\n        <div class=\'small sans track mt025 mb05 book\'>' + (0, _currency.formatMoney)(price) + '</div>\n        <div class=\'f aic\'>\n          <div class=\'cart-quantity js-remove-single px05\'>-</div>\n          <div class=\'js-single-quantity\'>' + quantity + '</div>\n          <div class=\'cart-quantity js-add-single px05\'>+</div>\n        </div>\n        ' + (color ? '<div class=\'xsmall sans caps track cm mv025 book\'>' + color.split(':')[0] + '</div>' : '') + '\n      </div>\n\n      <button class=\'button--reset\'>' + X + '</button>\n    </div>\n  </div>\n</div>\n';
}

function renderItems(items) {
  return items.length > 0 ? items.reduce(function (markup, item) {
    markup += createItem(item);
    return markup;
  }, '') : '<div class=\'pv1\'><p class=\'pv1 mv05 sans small cm i ac\'>Your cart is empty</p></div>';
}

exports.default = function (outer) {
  var isOpen = false;

  var overlay = outer.querySelector('.js-overlay');
  var closeButton = outer.querySelector('.js-close');
  var subtotal = outer.querySelector('.js-subtotal');
  var itemsRoot = outer.querySelector('.js-items');
  var loading = itemsRoot.innerHTML;

  function render() {
    (0, _cart.fetchCart)().then(function (cart) {
      itemsRoot.innerHTML = renderItems(cart.items);
      subtotal.innerHTML = (0, _currency.formatMoney)(cart.total_price);
      setTimeout(function () {
        scripts.mount();
      }, 0);
    });
  }

  function open() {
    outer.classList.add('is-active');

    itemsRoot.innerHTML = loading;

    setTimeout(function () {
      outer.classList.add('is-visible');
      isOpen = true;
      setTimeout(render, 10);
    }, 50);
  }

  function close() {
    outer.classList.remove('is-visible');

    setTimeout(function () {
      outer.classList.remove('is-active');
      isOpen = false;
    }, 400);
  }

  (0, _cart.on)('updated', function (_ref2) {
    var cart = _ref2.cart;

    isOpen ? render() : open();
  });
  (0, _cart.on)('addon', function (_ref3) {
    var cart = _ref3.cart;

    isOpen ? render() : open();
  });
  overlay.addEventListener('click', close);
  closeButton.addEventListener('click', close);

  return {
    open: open,
    close: close
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  console.log('hero fired', props);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (wrapper) {
  var input = wrapper.getElementsByTagName('input')[0];

  function handleAddRemove(e) {
    e.target.value ? add() : remove();
  }

  function add() {
    wrapper.classList.add('has-value');
  }

  function remove() {
    wrapper.classList.remove('has-value');
  }

  input.addEventListener('change', handleAddRemove);
  input.addEventListener('blur', handleAddRemove);
  input.addEventListener('focus', add);

  return {
    unmount: function unmount() {
      input.removeEventListener('change', handleAddRemove);
      input.removeEventListener('blur', handleAddRemove);
      input.removeEventListener('focus', add);
    }
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cart = __webpack_require__(0);

exports.default = function (el) {
  var _JSON$parse = JSON.parse(el.querySelector('.js-product-json').innerHTML),
      selectedOrFirstAvailableVariant = _JSON$parse.selectedOrFirstAvailableVariant,
      product = _JSON$parse.product;

  var currentVariant = product.variants.filter(function (v) {
    return v.id === selectedOrFirstAvailableVariant;
  })[0];

  /**
   * Adding products to cart
   */
  var form = el.getElementsByTagName('form')[0];
  var submit = form.querySelector('.js-submit-cart');
  var quantity = form.querySelector('.js-quantity').value;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submit.disabled = true;
    (0, _cart.addVariant)(currentVariant, quantity).then(function (_ref) {
      var item = _ref.item,
          cart = _ref.cart;

      submit.disabled = false;
    }).catch(function (e) {
      submit.disabled = false;
      /* eslint-disable */
      alert(e);
      /* eslint-enable */
    });
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productSelector = __webpack_require__(5);

var _productSelector2 = _interopRequireDefault(_productSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (el) {
  var selector = (0, _productSelector2.default)();

  selector.on('update', function (variant) {
    console.log(variant);
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// /**
//  * Product Template Script
//  * ------------------------------------------------------------------------------
//  * A file that contains scripts highly couple code to the Product template.
//  *
//    * @namespace product
//  */
//
/* eslint-disable */

console.log('hi');

exports.default = function (props) {
  console.log('product woo', props);
};

// theme.Product = (function() {
//
//   var selectors = {
//     addToCart: '[data-add-to-cart]',
//     addToCartText: '[data-add-to-cart-text]',
//     comparePrice: '[data-compare-price]',
//     comparePriceText: '[data-compare-text]',
//     originalSelectorId: '[data-product-select]',
//     priceWrapper: '[data-price-wrapper]',
//     productFeaturedImage: '[data-product-featured-image]',
//     productJson: '[data-product-json]',
//     productPrice: '[data-product-price]',
//     productThumbs: '[data-product-single-thumbnail]',
//     singleOptionSelector: '[data-single-option-selector]'
//   };
//
//   /**
//    * Product section constructor. Runs on page load as well as Theme Editor
//    * `section:load` events.
//    * @param {string} container - selector for the section container DOM element
//    */
//   function Product(container) {
//     this.$container = $(container);
//     var sectionId = this.$container.attr('data-section-id');
//
//     this.settings = {};
//     this.namespace = '.product';
//
//     // Stop parsing if we don't have the product json script tag when loading
//     // section in the Theme Editor
//     if (!$(selectors.productJson, this.$container).html()) {
//       return;
//     }
//
//     this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());
//     this.settings.imageSize = slate.Image.imageSize($(selectors.productFeaturedImage, this.$container).attr('src'));
//
//     slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);
//
//     this.initVariants();
//   }
//
//   Product.prototype = $.extend({}, Product.prototype, {
//
//     /**
//      * Handles change events from the variant inputs
//      */
//     initVariants: function() {
//       var options = {
//         $container: this.$container,
//         enableHistoryState: this.$container.data('enable-history-state') || false,
//         singleOptionSelector: selectors.singleOptionSelector,
//         originalSelectorId: selectors.originalSelectorId,
//         product: this.productSingleObject
//       };
//
//       this.variants = new slate.Variants(options);
//
//       this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
//       this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
//       this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));
//     },
//
//     /**
//      * Updates the DOM state of the add to cart button
//      *
//      * @param {boolean} enabled - Decides whether cart is enabled or disabled
//      * @param {string} text - Updates the text notification content of the cart
//      */
//     updateAddToCartState: function(evt) {
//       var variant = evt.variant;
//
//       if (variant) {
//         $(selectors.priceWrapper, this.$container).removeClass('hide');
//       } else {
//         $(selectors.addToCart, this.$container).prop('disabled', true);
//         $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
//         $(selectors.priceWrapper, this.$container).addClass('hide');
//         return;
//       }
//
//       if (variant.available) {
//         $(selectors.addToCart, this.$container).prop('disabled', false);
//         $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
//       } else {
//         $(selectors.addToCart, this.$container).prop('disabled', true);
//         $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
//       }
//     },
//
//     /**
//      * Updates the DOM with specified prices
//      *
//      * @param {string} productPrice - The current price of the product
//      * @param {string} comparePrice - The original price of the product
//      */
//     updateProductPrices: function(evt) {
//       var variant = evt.variant;
//       var $comparePrice = $(selectors.comparePrice, this.$container);
//       var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);
//
//       $(selectors.productPrice, this.$container)
//         .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));
//
//       if (variant.compare_at_price > variant.price) {
//         $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
//         $compareEls.removeClass('hide');
//       } else {
//         $comparePrice.html('');
//         $compareEls.addClass('hide');
//       }
//     },
//
//     /**
//      * Updates the DOM with the specified image URL
//      *
//      * @param {string} src - Image src URL
//      */
//     updateProductImage: function(evt) {
//       var variant = evt.variant;
//       var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);
//
//       $(selectors.productFeaturedImage, this.$container).attr('src', sizedImgUrl);
//     },
//
//     /**
//      * Event callback for Theme Editor `section:unload` event
//      */
//     onUnload: function() {
//       this.$container.off(this.namespace);
//     }
//   });
//
//   return Product;
// })();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */

slate.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document).on('shopify:section:load', this._onSectionLoad.bind(this)).on('shopify:section:unload', this._onSectionUnload.bind(this)).on('shopify:section:select', this._onSelect.bind(this)).on('shopify:section:deselect', this._onDeselect.bind(this)).on('shopify:section:reorder', this._onReorder.bind(this)).on('shopify:block:select', this._onBlockSelect.bind(this)).on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function _createInstance(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function _onSectionLoad(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function _onSectionUnload(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (!instance) {
      return;
    }

    if (typeof instance.onUnload === 'function') {
      instance.onUnload(evt);
    }

    this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
  },

  _onSelect: function _onSelect(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function _onDeselect(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  _onReorder: function _onReorder(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onReorder === 'function') {
      instance.onReorder(evt);
    }
  },

  _onBlockSelect: function _onBlockSelect(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockSelect === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function _onBlockDeselect(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockDeselect === 'function') {
      instance.onBlockDeselect(evt);
    }
  },

  register: function register(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function (index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

/* eslint-disable */

slate.utils = {

  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function findInstance(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function removeInstance(array, key, value) {
    var i = array.length;
    while (i--) {
      if (array[i][key] === value) {
        array.splice(i, 1);
        break;
      }
    }

    return array;
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function compact(array) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var resIndex = 0;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function defaultTo(value, defaultValue) {
    return value == null || value !== value ? defaultValue : value;
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

/* eslint-disable */

slate.Variants = function () {

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = $.extend({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function _getCurrentOptions() {
      var currentOptions = $.map($(this.singleOptionSelector, this.$container), function (element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function _getVariantFromOptions() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;
      var found = false;

      variants.forEach(function (variant) {
        var satisfied = true;

        selectedValues.forEach(function (option) {
          if (satisfied) {
            satisfied = option.value === variant[option.index];
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function _onSelectChange() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function _updateImages(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function _updatePrice(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function _updateHistoryState(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({ path: newurl }, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function _updateMasterSelect(variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id;
    }
  });

  return Variants;
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

/* eslint-disable */

theme.customerAddresses = function () {
  var $newAddressForm = $('#AddressNewForm');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function () {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', function () {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function () {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
  });

  $('.address-delete').on('click', function () {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');
    if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
      Shopify.postLink('/account/addresses/' + formId, { parameters: { _method: 'delete' } });
    }
  });
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

/* eslint-disable */

theme.customerLogin = function () {
  var config = {
    recoverPasswordForm: '#RecoverPassword',
    hideRecoverPasswordLink: '#HideRecoverPasswordLink'
  };

  if (!$(config.recoverPasswordForm).length) {
    return;
  }

  checkUrlHash();
  resetPasswordSuccess();

  $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
  $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

  function onShowHidePasswordForm(evt) {
    evt.preventDefault();
    toggleRecoverPasswordForm();
  }

  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  /**
   *  Show/Hide recover password form
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *  Show reset password success message
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (div) {
  var theme = div.getAttribute('data-theme');
  var header = document.getElementById('header');

  if (!/light|dark/.test(theme)) {
    return console.warn('Header theme must be either \'light\' or \'dark\', not ' + theme + '.');
  }

  if (theme === 'light') {
    header.classList.add('header--light');
  } else {
    header.classList.remove('header--light');
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = operator;

var _mitt = __webpack_require__(3);

var _mitt2 = _interopRequireDefault(_mitt);

var _unfetch = __webpack_require__(9);

var _unfetch2 = _interopRequireDefault(_unfetch);

var _scrollRestoration = __webpack_require__(26);

var _scrollRestoration2 = _interopRequireDefault(_scrollRestoration);

var _cache = __webpack_require__(27);

var _cache2 = _interopRequireDefault(_cache);

var _util = __webpack_require__(28);

var _routes = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function operator(_ref) {
  var _ref$root = _ref.root,
      root = _ref$root === undefined ? 'root' : _ref$root,
      _ref$transitionSpeed = _ref.transitionSpeed,
      transitionSpeed = _ref$transitionSpeed === undefined ? 0 : _ref$transitionSpeed,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? {} : _ref$routes,
      _ref$evaluateScripts = _ref.evaluateScripts,
      evaluateScripts = _ref$evaluateScripts === undefined ? false : _ref$evaluateScripts;

  if (!window.history.pushState) {
    return console.error('operator: the history API is unavailable, aborting.');
  }

  /**
   * Take control of scroll position
   */
  _scrollRestoration2.default.init();

  /**
   * Changed via enable()/disable() methods
   */
  var ajaxDisabled = false;

  /**
   * Emitter instance
   */
  var ev = (0, _mitt2.default)();

  /**
   * Map over routes to create pattern
   * matching handlers
   */
  routes = Object.keys(routes).map(function (k) {
    return (0, _routes.createRoute)(k, routes[k]);
  });

  /**
   * Update active links to match initial
   * page load
   */
  (0, _util.setActiveLinks)(_util.location.href);

  /**
   * @param {string} markup The new markup from a successful request
   * @param {string} href The new URL
   * @param {boolean} isPopstate True if render is called via popstate, false otherwise
   */
  function render(markup, href, isPopstate) {
    var mountNode = document.getElementById(root);
    var oldDom = document;
    var newDom = new window.DOMParser().parseFromString(markup, 'text/html');
    var title = newDom.title;

    ev.emit('beforeRender', href);

    document.documentElement.classList.add('operator-is-transitioning');
    mountNode.style.height = mountNode.clientHeight + 'px';

    /**
     * After transition out, render new page
     * and (optionally) push a new history location
     */
    setTimeout(function () {
      mountNode.innerHTML = newDom.getElementById(root).innerHTML;

      /**
       * If a popstate event occurred, we don't
       * need to manually create a new history
       * location: it's already there from
       * a previous navigation
       */
      !isPopstate && instance.push(href, title);

      /**
       * Finish up
       */
      setTimeout(function () {
        mountNode.style.height = '';
        document.documentElement.classList.remove('operator-is-transitioning');
        (0, _util.setActiveLinks)(href);
        ev.emit('afterRender', href);
        evaluateScripts && (0, _util.evalScripts)(newDom, oldDom);
        _scrollRestoration2.default.restore();
      }, 0);
    }, transitionSpeed);
  }

  function handleClick(e) {
    if (ajaxDisabled) return;

    var target = e.target;

    /**
     * Find link that was clicked
     */
    while (target && !(target.href && target.nodeName === 'A')) {
      target = target.parentNode;
    }

    /**
     * Validate URL
     */
    var href = (0, _util.getValidPath)(e, target);

    if (href) {
      e.preventDefault();

      if ((0, _util.isSameURL)(href)) {
        if ((0, _util.isHash)(href)) {
          instance.push(href);
          ev.emit('afterRender', href);
        }

        return;
      }

      /**
       * Only save on clicks, not on popstate
       */
      _scrollRestoration2.default.save();

      instance.go(href);

      return false;
    }
  }

  /**
   * Notes on popstate:
   *  - catches hashchange
   *  - must validate url before AJAX
   */
  function onPopstate(e) {
    if (ajaxDisabled) return;

    e.preventDefault();

    /**
     * If it's a back button, the
     * target should be a window object.
     * Otherwise this could be a hash
     * link or otherwise.
     */
    var path = e.target.window ? e.target.window.location.href : (0, _util.getValidPath)(e, e.target);

    if (path) {
      instance.go(e.target.location.href, true); // set isPopstate to true

      return false;
    }
  }

  var instance = _extends({}, ev, {
    go: function go(href, isPopstate) {
      var _this = this;

      href = (0, _util.getAnchor)(href).href; // ensure it's a full address

      (0, _routes.executeRoute)(href, routes, function (redirect) {
        if (redirect) return _this.go(redirect);

        _this.prefetch(href).then(function (markup) {
          return render(markup, href, isPopstate);
        });
      });
    },
    push: function push(route) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;

      window.history.pushState({}, title, route);
      document.title = title;
    },
    prefetch: function prefetch(route) {
      var cached = _cache2.default.get(route);
      return cached ? Promise.resolve(cached) : (0, _unfetch2.default)(route, { credentials: 'include' }).then(function (res) {
        return res.text();
      }).then(function (markup) {
        _cache2.default.set(route, markup);
        return markup;
      });
    },
    addRoute: function addRoute(route, handler) {
      routes.push((0, _routes.createRoute)(route, handler));
    },
    disable: function disable() {
      ajaxDisabled = true;
    },
    enable: function enable() {
      ajaxDisabled = false;
    },
    isEnabled: function isEnabled() {
      return ajaxDisabled;
    },
    destroy: function destroy() {
      document.body.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', onPopstate);
    }
  });

  document.body.addEventListener('click', handleClick);
  window.addEventListener('popstate', onPopstate);

  /**
   * Runs any applicable routes on page load,
   * restore scroll (if saved at history.state.scrollPosition)
   * *after* routes are fired
   */
  (0, _routes.executeRoute)(window.location.pathname, routes, function (redirect) {
    if (redirect) return instance.go(redirect);
    _scrollRestoration2.default.restore();
  });

  return instance;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},scroll=function(a){return window.scrollTo(0,a)},state=function(){return history.state?history.state.scrollPosition:0},save=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null;history.replaceState(_extends({},history.state,{scrollPosition:a||pageYOffset||scrollY}),'')},restore=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=state();a?a(b):scroll(b)},init=function(){'scrollRestoration'in history&&(history.scrollRestoration='manual',scroll(state()),onbeforeunload=function onbeforeunload(){return save()})};Object.defineProperty(exports,'__esModule',{value:!0});exports.default='undefined'==typeof window?{}:{init:init,save:save,restore:restore,state:state};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cache = {};

exports.default = {
  set: function set(route, markup) {
    cache = _extends({}, cache, _defineProperty({}, route, markup));
  },
  get: function get(route) {
    return cache[route];
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrigin = getOrigin;
exports.getAnchor = getAnchor;
exports.sanitize = sanitize;
exports.isHash = isHash;
exports.isSameURL = isSameURL;
exports.isSameOrigin = isSameOrigin;
exports.getValidPath = getValidPath;
exports.setActiveLinks = setActiveLinks;
exports.evalScripts = evalScripts;
var location = exports.location = window.location;

function getOrigin(loc) {
  var _ref = loc || window.location,
      protocol = _ref.protocol,
      host = _ref.host;

  return protocol + '//' + host;
}

function getAnchor(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}

/**
 * @param {string} url Raw URL to parse
 * @return {string} URL sans origin
 */
function sanitize(url) {
  var route = url.replace(new RegExp(getOrigin()), '');
  return route;
}

function isHash(href) {
  return (/#/.test(href)
  );
}

function isSameURL(href) {
  return window.location.search === getAnchor(href).search && window.location.pathname === getAnchor(href).pathname;
}

function isSameOrigin(href) {
  return getOrigin() === getOrigin(getAnchor(href));
}

function getValidPath(e, target) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (!target) return;
  if (!target.href) return;
  if (target.target === '_blank') return;
  if (!isSameOrigin(target.href)) return;
  if (target.classList.contains('no-ajax')) return;
  return target.href;
}

var activeLinks = [];

function setActiveLinks(href) {
  var route = getAnchor(href).pathname;
  var regex = /^\/$/.test(route) ? RegExp(/^\/$/) : new RegExp(route);

  for (var i = 0; i < activeLinks.length; i++) {
    activeLinks[i].classList.remove('is-active');
  }

  activeLinks = [].slice.call(document.querySelectorAll('[href$="' + route + '"]'));

  for (var _i = 0; _i < activeLinks.length; _i++) {
    if (regex.test(sanitize(activeLinks[_i].href))) {
      activeLinks[_i].classList.add('is-active');
    }
  }
}

function evalScripts(newDom, existingDom) {
  var existing = Array.prototype.slice.call(existingDom.getElementsByTagName('script'));
  var scripts = newDom.getElementsByTagName('script');

  var _loop = function _loop(i) {
    if (existing.filter(function (e) {
      return e.isEqualNode(scripts[i]);
    }).length > 0) {
      return 'continue';
    }

    var s = document.createElement('script');

    for (var a = 0; a < scripts[i].attributes.length; a++) {
      var attr = scripts[i].attributes[a];
      s.setAttribute(attr.name, attr.value);
    }

    if (!s.src) {
      s.innerHTML = scripts[i].innerHTML;
    }

    document.body.appendChild(s);
  };

  for (var i = 0; i < scripts.length; i++) {
    var _ret = _loop(i);

    if (_ret === 'continue') continue;
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectParams = collectParams;
exports.createRoute = createRoute;
exports.executeRoute = executeRoute;
/**
 * route utils lifted and adapted from
 * dush-router by @@tunnckoCore
 * @see https://github.com/tunnckoCore/dush-router
 */
function collectParams(r, pathname) {
  var match = null;

  pathname.replace(r.regex, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _loop = function _loop(i) {
      r.keys.forEach(function (key) {
        r.params[key] = args[i];
      });
      match = true;
    };

    for (var i = 1; i < args.length - 2; i++) {
      _loop(i);
    }
  });

  return match ? r.params : match;
}

function createRoute(route, handler) {
  var keys = [];

  var regex = new RegExp(route.replace(/\*/g, '(?:.*)').replace(/([:*])(\w+)/g, function (key) {
    keys.push(key.slice(1));
    return '([\\w-]+)';
  }) + '(?:[\/|?\w+]$|$)' + '$', 'ig');

  return {
    route: route,
    handler: handler,
    regex: regex,
    keys: keys,
    params: {},
    match: function match(pathname) {
      return regex.test(pathname) ? collectParams(this, pathname) : false;
    }
  };
}

function executeRoute(pathname, routes, done) {
  if (routes.length < 1) return done && done();

  var handlers = [];

  /**
   * If we have configured routes,
   * check them and fire any handlers
   */
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;

      var params = route.match(pathname);
      /**
       * params will return be `null` if
       * there was a match, but not parametized
       * route params. If params is `false`,
       * it means a no-match, so skip the handler
       */
      if (params === false) {
        continue;
      }

      handlers.push(route.handler(params || {}, pathname));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  Promise.all(handlers).then(function (responses) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = responses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var response = _step2.value;

        if (typeof response === 'string') return done(response); // handle redirect
        if (response === false && window.location.pathname !== pathname) {
          return window.location = pathname;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    done && done();
  });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./components/account-login.js": 11,
	"./components/cart-drawer-item.js": 12,
	"./components/cart-drawer.js": 13,
	"./components/header.js": 4,
	"./components/hero.js": 14,
	"./components/input-text.js": 15,
	"./components/product.js": 16,
	"./index.js": 1,
	"./lib/router.js": 2,
	"./pages/product.js": 17,
	"./sections/product.js": 18,
	"./slate/sections.js": 19,
	"./slate/utils.js": 20,
	"./slate/variants.js": 21,
	"./slater/cart.js": 0,
	"./slater/currency.js": 6,
	"./slater/images.js": 8,
	"./slater/product-selector.js": 5,
	"./slater/utils.js": 7,
	"./templates/customers-addresses.js": 22,
	"./templates/customers-login.js": 23,
	"./util/theme-provider.js": 24
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 30;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.mount = mount;
exports.unmount = unmount;
var types = {};

var __cache = {};

function log(level, msg) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  (_console = console)[level].apply(_console, ['⚙️ micromanager -', msg].concat(args));
}

function init(t) {
  types = t;
}

function mount() {
  for (var type in types) {
    var attr = 'data-' + type;
    var nodes = [].slice.call(document.querySelectorAll('[' + attr + ']'));
    var path = types[type].replace(/^\/|\/$/, '');

    for (var i = 0; i < nodes.length; i++) {
      var name = nodes[i].getAttribute(attr);

      try {
        var instance = __webpack_require__(32)("./" + path + '/' + name + '.js').default(nodes[i]);

        nodes[i].removeAttribute(attr);

        if (instance) {
          this.cache.set(instance.displayName || name, instance);
        }
      } catch (e) {
        log('error', name + ' threw an error\n\n', e);
      }
    }
  }
}

function unmount() {
  for (var key in __cache) {
    var instance = __cache[key];
    if (instance.unmount) {
      instance.unmount();
      delete __cache[key];
    }
  }
}

var cache = exports.cache = {
  set: function set(id, instance) {
    if (__cache[id]) log('warn', 'a duplicate key ' + id + ' was found in the cache. This instance will be overwritten.');
    __cache[id] = instance;
  },
  get: function get(id) {
    try {
      return __cache[id];
    } catch (e) {
      log('warn', 'can\'t find ' + id + ' in the cache', e);
      return null;
    }
  },
  dump: function dump() {
    return __cache;
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./components/account-login.js": 11,
	"./components/cart-drawer-item.js": 12,
	"./components/cart-drawer.js": 13,
	"./components/header.js": 4,
	"./components/hero.js": 14,
	"./components/input-text.js": 15,
	"./components/product.js": 16,
	"./index.js": 1,
	"./lib/router.js": 2,
	"./pages/product.js": 17,
	"./sections/product.js": 18,
	"./slate/sections.js": 19,
	"./slate/utils.js": 20,
	"./slate/variants.js": 21,
	"./slater/cart.js": 0,
	"./slater/currency.js": 6,
	"./slater/images.js": 8,
	"./slater/product-selector.js": 5,
	"./slater/utils.js": 7,
	"./templates/customers-addresses.js": 22,
	"./templates/customers-login.js": 23,
	"./util/theme-provider.js": 24
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 32;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map