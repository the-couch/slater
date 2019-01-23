
  ;(function (global) {
    try {
      var ls = global.localStorage

      var scrollPos = ls.getItem('slater-scroll')

      if (scrollPos) {
        global.scrollTo(0, scrollPos)
      }

      var socketio = document.createElement('script')

      socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'

      socketio.onload = function init () {
        var disconnected = false
        var socket = io('https://localhost:3000', {
          reconnectionAttempts: 3
        })
        socket.on('connect', () => console.log('@slater/cli connected'))
        socket.on('refresh', () => {
          ls.setItem('slater-scroll', global.scrollY)
          global.location.reload()
        })
        socket.on('disconnect', () => {
          disconnected = true
        })
        socket.on('reconnect_failed', e => {
          if (disconnected) return
          console.error("@slater/cli - Connection to the update server failed. Please visit https://localhost:3000 in your browser to trust the certificate. Then, refresh this page.")
        })
      }

      document.head.appendChild(socketio)
    } catch (e) {}
  })(this);

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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@arr/every/index.js":
/*!******************************************!*\
  !*** ./node_modules/@arr/every/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (arr, cb) {
	var i=0, len=arr.length;

	for (; i < len; i++) {
		if (!cb(arr[i], i, arr)) {
			return false;
		}
	}

	return true;
}


/***/ }),

/***/ "./node_modules/matchit/lib/matchit.mjs":
/*!**********************************************!*\
  !*** ./node_modules/matchit/lib/matchit.mjs ***!
  \**********************************************/
/*! exports provided: match, parse, exec */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return match; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exec", function() { return exec; });
/* harmony import */ var _arr_every__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @arr/every */ "./node_modules/@arr/every/index.js");




const SEP = '/';
// Types ~> static, param, any, optional
const STYPE=0, PTYPE=1, ATYPE=2, OTYPE=3;
// Char Codes ~> / : *
const SLASH=47, COLON=58, ASTER=42, QMARK=63;

function strip(str) {
	if (str === SEP) return str;
	(str.charCodeAt(0) === SLASH) && (str=str.substring(1));
	var len = str.length - 1;
	return str.charCodeAt(len) === SLASH ? str.substring(0, len) : str;
}

function split(str) {
	return (str=strip(str)) === SEP ? [SEP] : str.split(SEP);
}

function isMatch(str, obj) {
	return (obj.val === str && obj.type === STYPE) || (str === SEP ? obj.type > PTYPE : obj.type !== STYPE && (str || '').endsWith(obj.end));
}

function match(str, all) {
	let segs=split(str), len=segs.length, l;
	let i=0, tmp, fn=(o,x) => isMatch(segs[x], o);

	for (; i < all.length; i++) {
		tmp = all[i];
		if ((l=tmp.length) === len || (l < len && tmp[l-1].type === ATYPE) || (l > len && tmp[l-1].type === OTYPE)) {
			if (_arr_every__WEBPACK_IMPORTED_MODULE_0__(tmp, fn)) return tmp;
		}
	}

	return [];
}

function parse(str) {
	if (str === SEP) {
		return [{ old:str, type:STYPE, val:str, end:'' }];
	}

	let c, x, t, sfx, nxt=strip(str), i=-1, j=0, len=nxt.length, out=[];

	while (++i < len) {
		c = nxt.charCodeAt(i);

		if (c === COLON) {
			j = i + 1; // begining of param
			t = PTYPE; // set type
			x = 0; // reset mark
			sfx = '';

			while (i < len && nxt.charCodeAt(i) !== SLASH) {
				c = nxt.charCodeAt(i);
				if (c === QMARK) {
					x=i; t=OTYPE;
				} else if (c === 46 && sfx.length === 0) {
					sfx = nxt.substring(x=i);
				}
				i++; // move on
			}

			out.push({
				old: str,
				type: t,
				val: nxt.substring(j, x||i),
				end: sfx
			});

			// shorten string & update pointers
			nxt=nxt.substring(i); len-=i; i=0;

			continue; // loop
		} else if (c === ASTER) {
			out.push({
				old: str,
				type: ATYPE,
				val: nxt.substring(i),
				end: ''
			});
			continue; // loop
		} else {
			j = i;
			while (i < len && nxt.charCodeAt(i) !== SLASH) {
				++i; // skip to next slash
			}
			out.push({
				old: str,
				type: STYPE,
				val: nxt.substring(j, i),
				end: ''
			});
			// shorten string & update pointers
			nxt=nxt.substring(i); len-=i; i=j=0;
		}
	}

	return out;
}

function exec(str, arr) {
	let i=0, x, y, segs=split(str), out={};
	for (; i < arr.length; i++) {
		x=segs[i]; y=arr[i];
		if (x === SEP) continue;
		if (x !== void 0 && y.type | 2 === OTYPE) {
			out[ y.val ] = x.replace(y.end, '');
		}
	}
	return out;
}


/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/operator/dist/operator.es.js":
/*!***************************************************!*\
  !*** ./node_modules/operator/dist/operator.es.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var matchit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matchit */ "./node_modules/matchit/lib/matchit.mjs");
var r=new Map;function o(t){return t.replace(window.location.origin,"")}function a(e,r){var o="",a="",i=e.split(/#|\?/),c=i[0],u=i.slice(1);c=(c=c.replace(/\/$/g,""))||"/";for(var l=0;l<u.length;l++){var f=e.split(u[l])[0];"?"===f[f.length-1]&&(a=u[l]),"#"===f[f.length-1]&&(o=u[l])}var s=Object(matchit__WEBPACK_IMPORTED_MODULE_0__["match"])(c,r.map(function(t){return t.matcher})),h=r.filter(function(t){return t.path===s[0].old})[0];return s[0]?Object.assign({},h,{params:Object(matchit__WEBPACK_IMPORTED_MODULE_0__["exec"])(c,s),hash:o,search:a,pathname:c,location:e}):null}/* harmony default export */ __webpack_exports__["default"] = (function(t,n){void 0===n&&(n=["*"]);var i,c=document.querySelector(t),u=[],l={};n=n.concat(n.indexOf("*")<0?"*":[]).reduce(function(t,n){return"function"==typeof n?(u.push(n),t):t.concat(n)},[]).map(function(t){return t.path?Object.assign({},t,{matcher:Object(matchit__WEBPACK_IMPORTED_MODULE_0__["parse"])(t.path)}):{path:t,matcher:Object(matchit__WEBPACK_IMPORTED_MODULE_0__["parse"])(t)}}),"scrollRestoration"in history&&(history.scrollRestoration="manual");var f=a(o(window.location.href),n),s=Object.assign({title:document.title},f);function h(t){return l[t]?l[t].map(function(t){return t(s)}):[]}function d(t,n,e,r){s.title=t.title,Promise.all(u.concat(e.handler||[]).map(function(t){return t(s)})).then(function(){window.scrollTo(0,0),requestAnimationFrame(function(){c.innerHTML=n,h("after")})})}function p(n,e,o){if(!e)return window.location.href=n;fetch(n,{credentials:"include"}).then(function(t){return t.text()}).then(function(a){var i=(new window.DOMParser).parseFromString(a,"text/html"),c=[i,i.querySelector(t).innerHTML];r.set(n,c),o&&o(c[0],c[1],e)})}function m(t,n,e){i=function(){var e=r.get(t);e&&!1!==n.cache?d(e[0],e[1],n):p(t,n,d)},s=Object.assign(s,n),Promise.all(h("before")).then(i)}function g(t){var e=o(t);return[e,a(e,n)]}return document.body.addEventListener("click",function(t){if(!(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||t.defaultPrevented)){for(var n=t.target;n&&(!n.href||"A"!==n.nodeName);)n=n.parentNode;if(n&&window.location.origin===n.origin&&!n.hasAttribute("download")&&"_blank"!==n.target&&!/mailto|tel/.test(n.href)&&!n.classList.contains("no-ajax")){var e=g(n.pathname),r=e[0],o=e[1];return o.ignore?t:(t.preventDefault(),s.location!==r&&m(r,o),h("navigate"),!1)}}}),window.addEventListener("popstate",function(t){if(t.target.location.pathname!==s.location)return m.apply(void 0,g(t.target.location.href).concat([!0])),!1}),{get state(){return s},go:function(t){i=null,m.apply(void 0,g(t).concat([!1]))},load:function(t,n){return p.apply(void 0,g(t).concat([n]))},on:function(t,n){return l[t]=l[t]?l[t].concat(n):[n],function(){return l[t].slice(l[t].indexOf(n),1)}}}});
//# sourceMappingURL=operator.es.js.map


/***/ }),

/***/ "./node_modules/picoapp/dist/picoapp.es.js":
/*!*************************************************!*\
  !*** ./node_modules/picoapp/dist/picoapp.es.js ***!
  \*************************************************/
/*! exports provided: default, component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return n; });
function t(t,n,e){return{node:t,actions:n,hydrate:e.hydrate,get state(){return e.state}}}function n(n){return function(e,r,o){var u=n(t(e,r,o))||{};return u.onStateChange&&o.listen(u.onStateChange),u}}/* harmony default export */ __webpack_exports__["default"] = (function(n,e,r){void 0===n&&(n={}),void 0===r&&(r={});var o=[],u=function(t){var n=Object.assign({},t),e=[],r=[];return{get state(){return n},hydrate:function(t){return n=Object.assign({},n,"function"==typeof t?t(n):t),function(t){for(var o=0,u=e;o<u.length;o+=1)(0,u[o])(n);for(;r.length;)r.pop()(n);t&&t()}},listen:function(t){return e.indexOf(t)<0&&e.push(t),function(){return e.splice(e.indexOf(t),1)}},once:function(t){r.indexOf(t)<0&&r.push(t)},reset:function(){n=t},replace:function(t){n=t}}}(e||{}),i=Object.keys(r).reduce(function(t,n){return t[n]=function(t){return Promise.resolve(r[n](t)(u.state)).then(function(t){return u.hydrate(t)()})},t},{});return{actions:i,hydrate:u.hydrate,get state(){return u.state},add:function(t){Object.assign(n,t)},mount:function(t){void 0===t&&(t="data-component"),t=[].concat(t);for(var e=0;e<t.length;e++)for(var r=t[e],c=[].slice.call(document.querySelectorAll("["+r+"]"));c.length;)for(var a=c.pop(),f=a.getAttribute(r).split(/\s/),s=0;s<f.length;s++){var l=n[f[s]];if(l){a.removeAttribute(r);try{o.push(l(a,i,u))}catch(t){console.error("picoapp - "+f[s]+" failed - "+(t.message||t),t.stack)}}}},unmount:function(){return Promise.all(o.filter(function(t){return t.onUnmount}).map(function(n){var e=n.onUnmount;return Promise.resolve("function"==typeof e?e(t(n.node,i,u)):null)})).then(function(){o=o.filter(function(t){return!t.onUnmount}).filter(function(t){return!document.documentElement.contains(t.node)})})}}});;
//# sourceMappingURL=picoapp.es.js.map


/***/ }),

/***/ "./node_modules/sliced/index.js":
/*!**************************************!*\
  !*** ./node_modules/sliced/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}



/***/ }),

/***/ "./node_modules/unfetch/dist/unfetch.es.js":
/*!*************************************************!*\
  !*** ./node_modules/unfetch/dist/unfetch.es.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var index = typeof fetch=='function' ? fetch.bind() : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url, true);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body || null);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/100|0) == 2,		// 200-299
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

/***/ "./node_modules/w2t/dist/w2t.es.js":
/*!*****************************************!*\
  !*** ./node_modules/w2t/dist/w2t.es.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(e,n){return Promise.all(n.concat(new Promise(function(n){return setTimeout(n,e)}))).then(function(e){return e.slice(0,e.length-1)})});;
//# sourceMappingURL=w2t.es.js.map


/***/ }),

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");
/* harmony import */ var _components_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header.js */ "./src/scripts/components/header.js");
/* harmony import */ var _components_product_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/product.js */ "./src/scripts/components/product.js");
/* harmony import */ var _components_product_selection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/product-selection.js */ "./src/scripts/components/product-selection.js");
/* harmony import */ var _components_cartDrawer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cartDrawer.js */ "./src/scripts/components/cartDrawer.js");
/* harmony import */ var _components_cartDrawerItem_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/cartDrawerItem.js */ "./src/scripts/components/cartDrawerItem.js");
/* harmony import */ var _components_accountLogin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/accountLogin.js */ "./src/scripts/components/accountLogin.js");







var state = {
  cartOpen: false
};
var actions = {
  toggleCart: function toggleCart(open) {
    return function (state) {
      return {
        cartOpen: !state.cartOpen
      };
    };
  }
};
var components = {
  header: _components_header_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  product: _components_product_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  productSelection: _components_product_selection_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  cartDrawer: _components_cartDrawer_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  cartDrawerItem: _components_cartDrawerItem_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  accountLogin: _components_accountLogin_js__WEBPACK_IMPORTED_MODULE_6__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_0__["default"])(components, state, actions));

/***/ }),

/***/ "./src/scripts/components/accountLogin.js":
/*!************************************************!*\
  !*** ./src/scripts/components/accountLogin.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_0__["component"])(function (_ref) {
  var outer = _ref.node,
      state = _ref.state;
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
}));

/***/ }),

/***/ "./src/scripts/components/cartDrawer.js":
/*!**********************************************!*\
  !*** ./src/scripts/components/cartDrawer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slater_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slater/cart */ "./src/scripts/slater/cart.js");
/* harmony import */ var _slater_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../slater/images */ "./src/scripts/slater/images.js");
/* harmony import */ var _slater_currency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../slater/currency */ "./src/scripts/slater/currency.js");
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.js */ "./src/scripts/app.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var X = "<svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentcolor\" stroke-width=\"3\" style=\"display:inline-block;vertical-align:middle;overflow:visible;\"><path d=\"M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179\"></path><path d=\"M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179\"></path></svg>";

function createItem(_ref) {
  var id = _ref.variant_id,
      title = _ref.product_title,
      price = _ref.line_price,
      color = _ref.variant_title,
      image = _ref.image,
      url = _ref.url,
      quantity = _ref.quantity,
      item = _objectWithoutProperties(_ref, ["variant_id", "product_title", "line_price", "variant_title", "image", "url", "quantity"]);

  var img = image ? Object(_slater_images__WEBPACK_IMPORTED_MODULE_1__["getSizedImageUrl"])(image.replace('_' + Object(_slater_images__WEBPACK_IMPORTED_MODULE_1__["imageSize"])(image), ''), '200x' // TODO hacky af
  ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333';
  return "\n<div class='cart-drawer__item' data-component='cartDrawerItem' data-id=".concat(id, ">\n  <div class='f aic'>\n    <a href='").concat(url, "'>\n      <img src='").concat(img, "' />\n    </a>\n    <div class='__content pl1 f y ais jcb'>\n      <div>\n        <a href='").concat(url, "' class='serif mv0 p mv0'>").concat(title, "</a>\n        <div class='small sans track mt025 mb05 book'>").concat(Object(_slater_currency__WEBPACK_IMPORTED_MODULE_2__["formatMoney"])(price), "</div>\n        <div class='f aic'>\n          <div class='cart-quantity js-remove-single px05'>-</div>\n          <div class='js-single-quantity'>").concat(quantity, "</div>\n          <div class='cart-quantity js-add-single px05'>+</div>\n        </div>\n        ").concat(color ? "<div class='xsmall sans caps track cm mv025 book'>".concat(color.split(':')[0], "</div>") : "", "\n      </div>\n\n      <button class='button--reset'>").concat(X, "</button>\n    </div>\n  </div>\n</div>\n");
}

function renderItems(items) {
  return items.length > 0 ? items.reduce(function (markup, item) {
    markup += createItem(item);
    return markup;
  }, '') : "<div class='pv1'><p class='pv1 mv05 sans small cm i ac'>Your cart is empty</p></div>";
}

/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_3__["component"])(function (_ref2) {
  var node = _ref2.node,
      state = _ref2.state,
      actions = _ref2.actions;
  var overlay = node.querySelector('.js-overlay');
  var closeButton = node.querySelector('.js-close');
  var subtotal = node.querySelector('.js-subtotal');
  var itemsRoot = node.querySelector('.js-items');
  var loading = itemsRoot.innerHTML;

  var render = function render(cart) {
    itemsRoot.innerHTML = renderItems(cart.items);
    subtotal.innerHTML = Object(_slater_currency__WEBPACK_IMPORTED_MODULE_2__["formatMoney"])(cart.total_price);
  };

  var open = function open(cart) {
    node.classList.add('is-active');
    itemsRoot.innerHTML = loading;
    setTimeout(function () {
      node.classList.add('is-visible');
      setTimeout(render(cart), 10);
      _app_js__WEBPACK_IMPORTED_MODULE_4__["default"].mount();
    }, 50);
  };

  var close = function close() {
    node.classList.remove('is-visible');
    setTimeout(function () {
      node.classList.remove('is-active');
      _app_js__WEBPACK_IMPORTED_MODULE_4__["default"].hydrate({
        cartOpen: false
      });
    }, 400);
  };

  render(state.cart);
  overlay.addEventListener('click', close);
  closeButton.addEventListener('click', close);
  return {
    onStateChange: function onStateChange(_ref3) {
      var cart = _ref3.cart,
          cartOpen = _ref3.cartOpen;
      console.log('state is changing?', cartOpen);
      cartOpen ? open(cart) : null;
    }
  };
})); //
// export default outer => {
//   let isOpen = false
//
//   const overlay = outer.querySelector('.js-overlay')
//   const closeButton = outer.querySelector('.js-close')
//   const subtotal = outer.querySelector('.js-subtotal')
//   const itemsRoot = outer.querySelector('.js-items')
//   const loading = itemsRoot.innerHTML
//
//   function render () {
//     fetchCart().then(cart => {
//       itemsRoot.innerHTML = renderItems(cart.items)
//       subtotal.innerHTML = formatMoney(cart.total_price)
//       setTimeout(() => {
//         scripts.mount()
//       }, 0)
//     })
//   }
//
//   function open () {
//     outer.classList.add('is-active')
//
//     itemsRoot.innerHTML = loading
//
//     setTimeout(() => {
//       outer.classList.add('is-visible')
//       isOpen = true
//       setTimeout(render, 10)
//     }, 50)
//   }
//
//   function close () {
//     outer.classList.remove('is-visible')
//
//     setTimeout(() => {
//       outer.classList.remove('is-active')
//       isOpen = false
//     }, 400)
//   }
//
//   on('updated', ({ cart }) => {
//     isOpen ? render() : open()
//   })
//   on('addon', ({ cart }) => {
//     isOpen ? render() : open()
//   })
//   overlay.addEventListener('click', close)
//   closeButton.addEventListener('click', close)
//
//   return {
//     open,
//     close: close
//   }
// }

/***/ }),

/***/ "./src/scripts/components/cartDrawerItem.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/cartDrawerItem.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slater_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slater/cart.js */ "./src/scripts/slater/cart.js");
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_1__["component"])(function (_ref) {
  var item = _ref.node,
      state = _ref.state;
  var button = item.getElementsByTagName('button')[0];
  var decrease = item.querySelector('.js-remove-single');
  var increase = item.querySelector('.js-add-single');
  var currentQty = item.querySelector('.js-single-quantity').innerHTML;
  var id = item.getAttribute('data-id');
  button.addEventListener('click', function (e) {
    e.preventDefault();
    Object(_slater_cart_js__WEBPACK_IMPORTED_MODULE_0__["removeAddon"])(id);
  });
  decrease.addEventListener('click', function (e) {
    e.preventDefault();
    Object(_slater_cart_js__WEBPACK_IMPORTED_MODULE_0__["updateAddon"])(id, parseInt(currentQty) - 1);
  });
  increase.addEventListener('click', function (e) {
    e.preventDefault();
    Object(_slater_cart_js__WEBPACK_IMPORTED_MODULE_0__["updateAddon"])(id, parseInt(currentQty) + 1);
  });
}));

/***/ }),

/***/ "./src/scripts/components/header.js":
/*!******************************************!*\
  !*** ./src/scripts/components/header.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");
// import { on, fetchCart } from '../slater/cart'
 // import Cart from './cart-drawer.js'

/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_0__["component"])(function (_ref) {
  var header = _ref.node,
      state = _ref.state,
      actions = _ref.actions;
  var cartCount = header.querySelector('.js-cart-count');
  var cartToggles = header.querySelectorAll('.js-cart-drawer-toggle');
  cartCount.innerHTML = state.cart.items.length >= 1 ? state.cart.item_count : null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cartToggles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var toggle = _step.value;
      toggle.addEventListener('click', function (e) {
        console.log('yo click', state);
        e.preventDefault();
        actions.toggleCart(true);
        console.log('yo click', state);
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    onStateChange: function onStateChange(state) {
      cartCount.innerHTML = state.cart.item_count;
    }
  }; //   const cartCount = header.querySelector('.js-cart-count')
  //   const cart = fetchCart()
  //   cart.then(res => {
  //      /* eslint-disable */
  //     res ? cartCount.innerHTML = res.item_count : null
  //     /* eslint-enable */
  //   })
  // on('updated', ({ cart }) => {
  //   cartCount.innerHTML = cart.item_count
  // })
  // on('addon', ({ cart }) => {
  //   cartCount.innerHTML = cart.item_count
  // })
  //   /**
  //  // * Cart opening
  //  // */
  //   const cartToggles = header.querySelectorAll('.js-cart-drawer-toggle')
  //   for (let toggle of cartToggles) {
  //     toggle.addEventListener('click', e => {
  //       console.log('clicked?')
  //       e.preventDefault()
  //       Cart.open()
  //       // const cartDrawer = scripts.cache.get('cart-drawer')
  //       // cartDrawer.open()
  //     })
  //   }
}));

/***/ }),

/***/ "./src/scripts/components/product-selection.js":
/*!*****************************************************!*\
  !*** ./src/scripts/components/product-selection.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slater_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slater/cart.js */ "./src/scripts/slater/cart.js");
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");
/* harmony import */ var w2t__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! w2t */ "./node_modules/w2t/dist/w2t.es.js");
/* harmony import */ var _slater_radio_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../slater/radio.js */ "./src/scripts/slater/radio.js");
/* harmony import */ var _slater_options_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../slater/options.js */ "./src/scripts/slater/options.js");
/* harmony import */ var _slater_getProductJson_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../slater/getProductJson.js */ "./src/scripts/slater/getProductJson.js");






/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_1__["component"])(function (_ref) {
  var node = _ref.node;
  var opts = Object(_slater_options_js__WEBPACK_IMPORTED_MODULE_4__["default"])(node); // cache

  Object(_slater_getProductJson_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
  opts.onUpdate(function (state) {
    Object(_slater_getProductJson_js__WEBPACK_IMPORTED_MODULE_5__["default"])().then(function (json) {
      var variant = json.variants.filter(function (v) {
        return v.id == state.id;
      })[0];
    });
  });
}));

/***/ }),

/***/ "./src/scripts/components/product.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/product.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slater_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slater/cart.js */ "./src/scripts/slater/cart.js");
/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! picoapp */ "./node_modules/picoapp/dist/picoapp.es.js");
/* harmony import */ var w2t__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! w2t */ "./node_modules/w2t/dist/w2t.es.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(picoapp__WEBPACK_IMPORTED_MODULE_1__["component"])(function (_ref) {// const { selectedOrFirstAvailableVariant, product } = JSON.parse(el.querySelector('.js-product-json').innerHTML)
  // let currentVariant = product.variants.filter(v => v.id === selectedOrFirstAvailableVariant)[0]
  // const form = el.getElementsByTagName('form')[0]
  // const submit = form.querySelector('.js-submit-cart')
  // const quantity = form.querySelector('.js-quantity').value
  // console.log('subby', form)
  // form.addEventListener('submit', e => {
  //   e.preventDefault()
  //   submit.children[0].innerHTML = 'Adding..'
  //   wait(1000, [
  //     addVariant(currentVariant, quantity).then(({ item, cart }) => {
  //       submit.children[0].innerHTML = 'Add to Cart'
  //     }).catch(e => {
  //       alert(e)
  //     })
  //   ])
  // })

  var el = _ref.node,
      state = _ref.state;
})); //
// export default el => {
//   const { selectedOrFirstAvailableVariant, product } = JSON.parse(el.querySelector('.js-product-json').innerHTML)
//
//   let currentVariant = product.variants.filter(v => v.id === selectedOrFirstAvailableVariant)[0]
//
//   /**
//    * Adding products to cart
//    */
//   const form = el.getElementsByTagName('form')[0]
//   const submit = form.querySelector('.js-submit-cart')
//   const quantity = form.querySelector('.js-quantity').value
//
//   form.addEventListener('submit', e => {
//     e.preventDefault()
//     console.log('add to cart')
//
//     submit.disabled = true
//     addVariant(currentVariant, quantity).then(({ item, cart }) => {
//       submit.disabled = false
//     }).catch(e => {
//       submit.disabled = false
//       /* eslint-disable */
//       alert(e)
//       /* eslint-enable */
//     })
//   })
// }

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var operator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! operator */ "./node_modules/operator/dist/operator.es.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ "./src/scripts/app.js");
/* harmony import */ var _slater_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slater/cart */ "./src/scripts/slater/cart.js");
/* harmony import */ var _slater_util_select_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slater/util/select.js */ "./src/scripts/slater/util/select.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_main_css__WEBPACK_IMPORTED_MODULE_4__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function transition() {
  return new Promise(function (res) {
    document.body.classList.add('is-transitioning');
    setTimeout(res, 600);
    setTimeout(function () {
      return document.body.classList.remove('is-transitioning');
    }, 800);
  });
}

var router = Object(operator__WEBPACK_IMPORTED_MODULE_0__["default"])('#root', [transition]);
router.on('before', function (state) {
  return Promise.all([_app_js__WEBPACK_IMPORTED_MODULE_1__["default"].unmount()]);
});
router.on('after', function (_ref) {
  var title = _ref.title,
      pathname = _ref.pathname;
  document.title = title;
  window.history.pushState({}, '', pathname);
});
document.addEventListener('DOMContentLoaded', function (e) {
  Promise.all([Object(_slater_cart__WEBPACK_IMPORTED_MODULE_2__["fetchCart"])()]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        cart = _ref3[0];

    _app_js__WEBPACK_IMPORTED_MODULE_1__["default"].hydrate({
      cart: cart
    });
    _app_js__WEBPACK_IMPORTED_MODULE_1__["default"].mount();
  });
});
console.groupCollapsed('Slater credits 🍝  taco');
console.log('Development by The Couch https://thecouch.nyc');
console.groupEnd();

/***/ }),

/***/ "./src/scripts/slater/cart.js":
/*!************************************!*\
  !*** ./src/scripts/slater/cart.js ***!
  \************************************/
/*! exports provided: on, addVariant, updateAddon, removeAddon, addItemById, fetchCart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addVariant", function() { return addVariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAddon", function() { return updateAddon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAddon", function() { return removeAddon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addItemById", function() { return addItemById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCart", function() { return fetchCart; });
/* harmony import */ var unfetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unfetch */ "./node_modules/unfetch/dist/unfetch.es.js");
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.js */ "./src/scripts/app.js");



var ev = Object(mitt__WEBPACK_IMPORTED_MODULE_1__["default"])();
var on = ev.on;
function addVariant(variant, quantity) {
  var numAvailable = variant.inventory_policy === 'deny' && variant.inventory_management === 'shopify' ? variant.inventory_quantity : null; // null means they can add as many as they want

  return fetchCart().then(function (_ref) {
    var items = _ref.items;
    var existing = items.filter(function (item) {
      return item.id === variant.id;
    })[0] || {};
    var numRequested = (existing.quantity || 0) + quantity;

    if (numAvailable !== null && numRequested > numAvailable) {
      var err = "There are only ".concat(numAvailable, " of that product available, requested ").concat(numRequested, ".");
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
  return Object(unfetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/cart/change.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      line: line,
      quantity: quantity
    })
  }).then(function (res) {
    return res.json();
  }).then(function (cart) {
    ev.emit('addon', {
      item: null,
      cart: cart
    });
    _app_js__WEBPACK_IMPORTED_MODULE_2__["default"].hydrate({
      cart: cart
    })(function () {
      return console.log('updated');
    });
    return cart;
  });
}
/**
 * Warning: this does not check available products first
 */


function addItemById(id, quantity) {
  ev.emit('updating');
  console.log('yo adddy');
  return Object(unfetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/cart/add.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      quantity: quantity
    })
  }).then(function (r) {
    return r.json();
  }).then(function (item) {
    return fetchCart().then(function (cart) {
      _app_js__WEBPACK_IMPORTED_MODULE_2__["default"].hydrate({
        cart: cart
      })(function () {
        return console.log('updated');
      });
      _app_js__WEBPACK_IMPORTED_MODULE_2__["default"].actions.toggleCart(); // ev.emit('updated', { item, cart })

      return {
        item: item,
        cart: cart
      };
    });
  });
}
function fetchCart() {
  return Object(unfetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/cart.js', {
    method: 'GET',
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  });
}

/***/ }),

/***/ "./src/scripts/slater/currency.js":
/*!****************************************!*\
  !*** ./src/scripts/slater/currency.js ***!
  \****************************************/
/*! exports provided: formatMoney */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatMoney", function() { return formatMoney; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/slater/utils.js");

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
    precision = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["defaultTo"])(precision, 2);
    thousands = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["defaultTo"])(thousands, ',');
    decimal = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["defaultTo"])(decimal, '.');

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

/***/ "./src/scripts/slater/getProductJson.js":
/*!**********************************************!*\
  !*** ./src/scripts/slater/getProductJson.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getProductJson; });
var cache = {};
function getProductJson() {
  var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.pathname.split('/').reverse()[0];
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (cache[slug] && !opts.refetch) return Promise.resolve(cache[slug]);
  return fetch(window.location.origin + '/products/' + slug + '.json').then(function (res) {
    return res.json();
  }).then(function (_ref) {
    var product = _ref.product;
    cache[slug] = product;
    return product;
  });
}

/***/ }),

/***/ "./src/scripts/slater/images.js":
/*!**************************************!*\
  !*** ./src/scripts/slater/images.js ***!
  \**************************************/
/*! exports provided: preload, loadImage, imageSize, getSizedImageUrl, removeProtocol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageSize", function() { return imageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSizedImageUrl", function() { return getSizedImageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeProtocol", function() { return removeProtocol; });
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

/***/ "./src/scripts/slater/options.js":
/*!***************************************!*\
  !*** ./src/scripts/slater/options.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return productSelection; });
/* harmony import */ var _slater_radio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slater/radio.js */ "./src/scripts/slater/radio.js");
/* harmony import */ var _util_select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/select.js */ "./src/scripts/slater/util/select.js");


function productSelection(node, opts) {
  opts = Object.assign({
    select: '[data-option-select]',
    radio: '[data-option-radio]',
    main: '[data-option-main]'
  }, opts);
  var listeners = [];
  var state = {
    id: null,
    options: []
  };
  var selects = slater.qsa(opts.select);
  var radios = slater.qsa(opts.radio);
  var main = slater.qs(opts.main);
  if (!main || !main.length) throw 'data-option-main is missing';
  if (radios.length > 3) throw 'you have more than three radio groups';
  if (selects.length > 3) throw 'you have more than three select inputs';
  var variants = [].slice.call(main.children).reduce(function (variants, child) {
    variants[child.innerHTML] = child.value;
    return variants;
  }, {});
  selects.forEach(function (select) {
    if (select.nodeName !== 'SELECT') throw 'data-option-select should be defined on the individual option selectors';
    var index = parseInt(select.getAttribute('data-index')); // set initial value

    state.options[index] = select.value;
    select.addEventListener('change', function (e) {
      state.options[index] = e.target.value;
      updateSelection();
    });
  });
  radios.forEach(function (r) {
    if (r.nodeName === 'INPUT') throw 'data-option-radio should be defined on a parent of the radio group, not the inputs themselves';
    var index = parseInt(r.getAttribute('data-index'));
    var inputs = [].slice.call(r.getElementsByTagName('input')); // set initial value

    inputs.forEach(function (r) {
      if (r.checked) state.options[index] = r.value;
    });
    Object(_slater_radio_js__WEBPACK_IMPORTED_MODULE_0__["default"])(inputs, function (value) {
      state.options[index] = value;
      updateSelection();
    });
  });
  updateSelection();

  function updateSelection() {
    state.id = variants[state.options.join(' / ')];
    main.value = state.id;

    for (var _i = 0; _i < listeners.length; _i++) {
      var fn = listeners[_i];
      fn(state);
    }
  }

  return {
    get state() {
      return state;
    },

    onUpdate: function onUpdate(fn) {
      listeners.indexOf(fn) < 0 && listeners.push(fn);
      return function () {
        return listeners.splice(listeners.indexOf(fn), 1);
      };
    }
  };
}

/***/ }),

/***/ "./src/scripts/slater/radio.js":
/*!*************************************!*\
  !*** ./src/scripts/slater/radio.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return radio; });
function radio(radios, cb) {
  radios.map(function (r) {
    return r.onclick = function (e) {
      return cb(e.target.value);
    };
  });
}

/***/ }),

/***/ "./src/scripts/slater/util/select.js":
/*!*******************************************!*\
  !*** ./src/scripts/slater/util/select.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sliced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sliced */ "./node_modules/sliced/index.js");
/* harmony import */ var sliced__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sliced__WEBPACK_IMPORTED_MODULE_0__);

window.slater = Object.assign(window.slater || {}, {
  qs: function qs(q, ctx) {
    return (ctx || document).querySelector(q);
  },
  qsa: function qsa(q, ctx) {
    return sliced__WEBPACK_IMPORTED_MODULE_0___default()((ctx || document).querySelectorAll(q));
  },
  gebtn: function gebtn(q, ctx) {
    return sliced__WEBPACK_IMPORTED_MODULE_0___default()((ctx || document).getElementsByTagName(q));
  },
  gebi: function gebi(q) {
    return document.getElementById(q);
  }
});

/***/ }),

/***/ "./src/scripts/slater/utils.js":
/*!*************************************!*\
  !*** ./src/scripts/slater/utils.js ***!
  \*************************************/
/*! exports provided: findInstance, removeInstance, compact, defaultTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findInstance", function() { return findInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeInstance", function() { return removeInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compact", function() { return compact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTo", function() { return defaultTo; });
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

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhcnIvZXZlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGNoaXQvbGliL21hdGNoaXQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taXR0L2Rpc3QvbWl0dC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlcmF0b3IvZGlzdC9vcGVyYXRvci5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGljb2FwcC9kaXN0L3BpY29hcHAuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NsaWNlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5mZXRjaC9kaXN0L3VuZmV0Y2guZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3cydC9kaXN0L3cydC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9hY2NvdW50TG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9jYXJ0RHJhd2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvY2FydERyYXdlckl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wcm9kdWN0LXNlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2xhdGVyL2NhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2xhdGVyL2N1cnJlbmN5LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NsYXRlci9nZXRQcm9kdWN0SnNvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zbGF0ZXIvaW1hZ2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NsYXRlci9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NsYXRlci9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zbGF0ZXIvdXRpbC9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2xhdGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5jc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgY2IpIHtcblx0dmFyIGk9MCwgbGVuPWFyci5sZW5ndGg7XG5cblx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdGlmICghY2IoYXJyW2ldLCBpLCBhcnIpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBldmVyeSBmcm9tICdAYXJyL2V2ZXJ5JztcblxuY29uc3QgU0VQID0gJy8nO1xuLy8gVHlwZXMgfj4gc3RhdGljLCBwYXJhbSwgYW55LCBvcHRpb25hbFxuY29uc3QgU1RZUEU9MCwgUFRZUEU9MSwgQVRZUEU9MiwgT1RZUEU9Mztcbi8vIENoYXIgQ29kZXMgfj4gLyA6ICpcbmNvbnN0IFNMQVNIPTQ3LCBDT0xPTj01OCwgQVNURVI9NDIsIFFNQVJLPTYzO1xuXG5mdW5jdGlvbiBzdHJpcChzdHIpIHtcblx0aWYgKHN0ciA9PT0gU0VQKSByZXR1cm4gc3RyO1xuXHQoc3RyLmNoYXJDb2RlQXQoMCkgPT09IFNMQVNIKSAmJiAoc3RyPXN0ci5zdWJzdHJpbmcoMSkpO1xuXHR2YXIgbGVuID0gc3RyLmxlbmd0aCAtIDE7XG5cdHJldHVybiBzdHIuY2hhckNvZGVBdChsZW4pID09PSBTTEFTSCA/IHN0ci5zdWJzdHJpbmcoMCwgbGVuKSA6IHN0cjtcbn1cblxuZnVuY3Rpb24gc3BsaXQoc3RyKSB7XG5cdHJldHVybiAoc3RyPXN0cmlwKHN0cikpID09PSBTRVAgPyBbU0VQXSA6IHN0ci5zcGxpdChTRVApO1xufVxuXG5mdW5jdGlvbiBpc01hdGNoKHN0ciwgb2JqKSB7XG5cdHJldHVybiAob2JqLnZhbCA9PT0gc3RyICYmIG9iai50eXBlID09PSBTVFlQRSkgfHwgKHN0ciA9PT0gU0VQID8gb2JqLnR5cGUgPiBQVFlQRSA6IG9iai50eXBlICE9PSBTVFlQRSAmJiAoc3RyIHx8ICcnKS5lbmRzV2l0aChvYmouZW5kKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaChzdHIsIGFsbCkge1xuXHRsZXQgc2Vncz1zcGxpdChzdHIpLCBsZW49c2Vncy5sZW5ndGgsIGw7XG5cdGxldCBpPTAsIHRtcCwgZm49KG8seCkgPT4gaXNNYXRjaChzZWdzW3hdLCBvKTtcblxuXHRmb3IgKDsgaSA8IGFsbC5sZW5ndGg7IGkrKykge1xuXHRcdHRtcCA9IGFsbFtpXTtcblx0XHRpZiAoKGw9dG1wLmxlbmd0aCkgPT09IGxlbiB8fCAobCA8IGxlbiAmJiB0bXBbbC0xXS50eXBlID09PSBBVFlQRSkgfHwgKGwgPiBsZW4gJiYgdG1wW2wtMV0udHlwZSA9PT0gT1RZUEUpKSB7XG5cdFx0XHRpZiAoZXZlcnkodG1wLCBmbikpIHJldHVybiB0bXA7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG5cdGlmIChzdHIgPT09IFNFUCkge1xuXHRcdHJldHVybiBbeyBvbGQ6c3RyLCB0eXBlOlNUWVBFLCB2YWw6c3RyLCBlbmQ6JycgfV07XG5cdH1cblxuXHRsZXQgYywgeCwgdCwgc2Z4LCBueHQ9c3RyaXAoc3RyKSwgaT0tMSwgaj0wLCBsZW49bnh0Lmxlbmd0aCwgb3V0PVtdO1xuXG5cdHdoaWxlICgrK2kgPCBsZW4pIHtcblx0XHRjID0gbnh0LmNoYXJDb2RlQXQoaSk7XG5cblx0XHRpZiAoYyA9PT0gQ09MT04pIHtcblx0XHRcdGogPSBpICsgMTsgLy8gYmVnaW5pbmcgb2YgcGFyYW1cblx0XHRcdHQgPSBQVFlQRTsgLy8gc2V0IHR5cGVcblx0XHRcdHggPSAwOyAvLyByZXNldCBtYXJrXG5cdFx0XHRzZnggPSAnJztcblxuXHRcdFx0d2hpbGUgKGkgPCBsZW4gJiYgbnh0LmNoYXJDb2RlQXQoaSkgIT09IFNMQVNIKSB7XG5cdFx0XHRcdGMgPSBueHQuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0aWYgKGMgPT09IFFNQVJLKSB7XG5cdFx0XHRcdFx0eD1pOyB0PU9UWVBFO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09IDQ2ICYmIHNmeC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRzZnggPSBueHQuc3Vic3RyaW5nKHg9aSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aSsrOyAvLyBtb3ZlIG9uXG5cdFx0XHR9XG5cblx0XHRcdG91dC5wdXNoKHtcblx0XHRcdFx0b2xkOiBzdHIsXG5cdFx0XHRcdHR5cGU6IHQsXG5cdFx0XHRcdHZhbDogbnh0LnN1YnN0cmluZyhqLCB4fHxpKSxcblx0XHRcdFx0ZW5kOiBzZnhcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBzaG9ydGVuIHN0cmluZyAmIHVwZGF0ZSBwb2ludGVyc1xuXHRcdFx0bnh0PW54dC5zdWJzdHJpbmcoaSk7IGxlbi09aTsgaT0wO1xuXG5cdFx0XHRjb250aW51ZTsgLy8gbG9vcFxuXHRcdH0gZWxzZSBpZiAoYyA9PT0gQVNURVIpIHtcblx0XHRcdG91dC5wdXNoKHtcblx0XHRcdFx0b2xkOiBzdHIsXG5cdFx0XHRcdHR5cGU6IEFUWVBFLFxuXHRcdFx0XHR2YWw6IG54dC5zdWJzdHJpbmcoaSksXG5cdFx0XHRcdGVuZDogJydcblx0XHRcdH0pO1xuXHRcdFx0Y29udGludWU7IC8vIGxvb3Bcblx0XHR9IGVsc2Uge1xuXHRcdFx0aiA9IGk7XG5cdFx0XHR3aGlsZSAoaSA8IGxlbiAmJiBueHQuY2hhckNvZGVBdChpKSAhPT0gU0xBU0gpIHtcblx0XHRcdFx0KytpOyAvLyBza2lwIHRvIG5leHQgc2xhc2hcblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHtcblx0XHRcdFx0b2xkOiBzdHIsXG5cdFx0XHRcdHR5cGU6IFNUWVBFLFxuXHRcdFx0XHR2YWw6IG54dC5zdWJzdHJpbmcoaiwgaSksXG5cdFx0XHRcdGVuZDogJydcblx0XHRcdH0pO1xuXHRcdFx0Ly8gc2hvcnRlbiBzdHJpbmcgJiB1cGRhdGUgcG9pbnRlcnNcblx0XHRcdG54dD1ueHQuc3Vic3RyaW5nKGkpOyBsZW4tPWk7IGk9aj0wO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjKHN0ciwgYXJyKSB7XG5cdGxldCBpPTAsIHgsIHksIHNlZ3M9c3BsaXQoc3RyKSwgb3V0PXt9O1xuXHRmb3IgKDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdHg9c2Vnc1tpXTsgeT1hcnJbaV07XG5cdFx0aWYgKHggPT09IFNFUCkgY29udGludWU7XG5cdFx0aWYgKHggIT09IHZvaWQgMCAmJiB5LnR5cGUgfCAyID09PSBPVFlQRSkge1xuXHRcdFx0b3V0WyB5LnZhbCBdID0geC5yZXBsYWNlKHkuZW5kLCAnJyk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXQ7XG59XG4iLCIvLyAgICAgIFxuLy8gQW4gZXZlbnQgaGFuZGxlciBjYW4gdGFrZSBhbiBvcHRpb25hbCBldmVudCBhcmd1bWVudFxuLy8gYW5kIHNob3VsZCBub3QgcmV0dXJuIGEgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbi8vIEFuIGFycmF5IG9mIGFsbCBjdXJyZW50bHkgcmVnaXN0ZXJlZCBldmVudCBoYW5kbGVycyBmb3IgYSB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyBBIG1hcCBvZiBldmVudCB0eXBlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcblxuLyoqIE1pdHQ6IFRpbnkgKH4yMDBiKSBmdW5jdGlvbmFsIGV2ZW50IGVtaXR0ZXIgLyBwdWJzdWIuXG4gKiAgQG5hbWUgbWl0dFxuICogIEByZXR1cm5zIHtNaXR0fVxuICovXG5mdW5jdGlvbiBtaXR0KGFsbCAgICAgICAgICAgICAgICAgKSB7XG5cdGFsbCA9IGFsbCB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdHJldHVybiB7XG5cdFx0LyoqXG5cdFx0ICogUmVnaXN0ZXIgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGdpdmVuIHR5cGUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcdFR5cGUgb2YgZXZlbnQgdG8gbGlzdGVuIGZvciwgb3IgYFwiKlwiYCBmb3IgYWxsIGV2ZW50c1xuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyIEZ1bmN0aW9uIHRvIGNhbGwgaW4gcmVzcG9uc2UgdG8gZ2l2ZW4gZXZlbnRcblx0XHQgKiBAbWVtYmVyT2YgbWl0dFxuXHRcdCAqL1xuXHRcdG9uOiBmdW5jdGlvbiBvbih0eXBlICAgICAgICAsIGhhbmRsZXIgICAgICAgICAgICAgICkge1xuXHRcdFx0KGFsbFt0eXBlXSB8fCAoYWxsW3R5cGVdID0gW10pKS5wdXNoKGhhbmRsZXIpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGdpdmVuIHR5cGUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcdFR5cGUgb2YgZXZlbnQgdG8gdW5yZWdpc3RlciBgaGFuZGxlcmAgZnJvbSwgb3IgYFwiKlwiYFxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gdG8gcmVtb3ZlXG5cdFx0ICogQG1lbWJlck9mIG1pdHRcblx0XHQgKi9cblx0XHRvZmY6IGZ1bmN0aW9uIG9mZih0eXBlICAgICAgICAsIGhhbmRsZXIgICAgICAgICAgICAgICkge1xuXHRcdFx0aWYgKGFsbFt0eXBlXSkge1xuXHRcdFx0XHRhbGxbdHlwZV0uc3BsaWNlKGFsbFt0eXBlXS5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW52b2tlIGFsbCBoYW5kbGVycyBmb3IgdGhlIGdpdmVuIHR5cGUuXG5cdFx0ICogSWYgcHJlc2VudCwgYFwiKlwiYCBoYW5kbGVycyBhcmUgaW52b2tlZCBhZnRlciB0eXBlLW1hdGNoZWQgaGFuZGxlcnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAgVGhlIGV2ZW50IHR5cGUgdG8gaW52b2tlXG5cdFx0ICogQHBhcmFtIHtBbnl9IFtldnRdICBBbnkgdmFsdWUgKG9iamVjdCBpcyByZWNvbW1lbmRlZCBhbmQgcG93ZXJmdWwpLCBwYXNzZWQgdG8gZWFjaCBoYW5kbGVyXG5cdFx0ICogQG1lbWJlck9mIG1pdHRcblx0XHQgKi9cblx0XHRlbWl0OiBmdW5jdGlvbiBlbWl0KHR5cGUgICAgICAgICwgZXZ0ICAgICApIHtcblx0XHRcdChhbGxbdHlwZV0gfHwgW10pLnNsaWNlKCkubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7IGhhbmRsZXIoZXZ0KTsgfSk7XG5cdFx0XHQoYWxsWycqJ10gfHwgW10pLnNsaWNlKCkubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7IGhhbmRsZXIodHlwZSwgZXZ0KTsgfSk7XG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtaXR0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWl0dC5lcy5qcy5tYXBcbiIsImltcG9ydHttYXRjaCBhcyB0LGV4ZWMgYXMgbixwYXJzZSBhcyBlfWZyb21cIm1hdGNoaXRcIjt2YXIgcj1uZXcgTWFwO2Z1bmN0aW9uIG8odCl7cmV0dXJuIHQucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLFwiXCIpfWZ1bmN0aW9uIGEoZSxyKXt2YXIgbz1cIlwiLGE9XCJcIixpPWUuc3BsaXQoLyN8XFw/LyksYz1pWzBdLHU9aS5zbGljZSgxKTtjPShjPWMucmVwbGFjZSgvXFwvJC9nLFwiXCIpKXx8XCIvXCI7Zm9yKHZhciBsPTA7bDx1Lmxlbmd0aDtsKyspe3ZhciBmPWUuc3BsaXQodVtsXSlbMF07XCI/XCI9PT1mW2YubGVuZ3RoLTFdJiYoYT11W2xdKSxcIiNcIj09PWZbZi5sZW5ndGgtMV0mJihvPXVbbF0pfXZhciBzPXQoYyxyLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdC5tYXRjaGVyfSkpLGg9ci5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQucGF0aD09PXNbMF0ub2xkfSlbMF07cmV0dXJuIHNbMF0/T2JqZWN0LmFzc2lnbih7fSxoLHtwYXJhbXM6bihjLHMpLGhhc2g6byxzZWFyY2g6YSxwYXRobmFtZTpjLGxvY2F0aW9uOmV9KTpudWxsfWV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHQsbil7dm9pZCAwPT09biYmKG49W1wiKlwiXSk7dmFyIGksYz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpLHU9W10sbD17fTtuPW4uY29uY2F0KG4uaW5kZXhPZihcIipcIik8MD9cIipcIjpbXSkucmVkdWNlKGZ1bmN0aW9uKHQsbil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbj8odS5wdXNoKG4pLHQpOnQuY29uY2F0KG4pfSxbXSkubWFwKGZ1bmN0aW9uKHQpe3JldHVybiB0LnBhdGg/T2JqZWN0LmFzc2lnbih7fSx0LHttYXRjaGVyOmUodC5wYXRoKX0pOntwYXRoOnQsbWF0Y2hlcjplKHQpfX0pLFwic2Nyb2xsUmVzdG9yYXRpb25cImluIGhpc3RvcnkmJihoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uPVwibWFudWFsXCIpO3ZhciBmPWEobyh3aW5kb3cubG9jYXRpb24uaHJlZiksbikscz1PYmplY3QuYXNzaWduKHt0aXRsZTpkb2N1bWVudC50aXRsZX0sZik7ZnVuY3Rpb24gaCh0KXtyZXR1cm4gbFt0XT9sW3RdLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdChzKX0pOltdfWZ1bmN0aW9uIGQodCxuLGUscil7cy50aXRsZT10LnRpdGxlLFByb21pc2UuYWxsKHUuY29uY2F0KGUuaGFuZGxlcnx8W10pLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdChzKX0pKS50aGVuKGZ1bmN0aW9uKCl7d2luZG93LnNjcm9sbFRvKDAsMCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7Yy5pbm5lckhUTUw9bixoKFwiYWZ0ZXJcIil9KX0pfWZ1bmN0aW9uIHAobixlLG8pe2lmKCFlKXJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZj1uO2ZldGNoKG4se2NyZWRlbnRpYWxzOlwiaW5jbHVkZVwifSkudGhlbihmdW5jdGlvbih0KXtyZXR1cm4gdC50ZXh0KCl9KS50aGVuKGZ1bmN0aW9uKGEpe3ZhciBpPShuZXcgd2luZG93LkRPTVBhcnNlcikucGFyc2VGcm9tU3RyaW5nKGEsXCJ0ZXh0L2h0bWxcIiksYz1baSxpLnF1ZXJ5U2VsZWN0b3IodCkuaW5uZXJIVE1MXTtyLnNldChuLGMpLG8mJm8oY1swXSxjWzFdLGUpfSl9ZnVuY3Rpb24gbSh0LG4sZSl7aT1mdW5jdGlvbigpe3ZhciBlPXIuZ2V0KHQpO2UmJiExIT09bi5jYWNoZT9kKGVbMF0sZVsxXSxuKTpwKHQsbixkKX0scz1PYmplY3QuYXNzaWduKHMsbiksUHJvbWlzZS5hbGwoaChcImJlZm9yZVwiKSkudGhlbihpKX1mdW5jdGlvbiBnKHQpe3ZhciBlPW8odCk7cmV0dXJuW2UsYShlLG4pXX1yZXR1cm4gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbih0KXtpZighKHQuY3RybEtleXx8dC5tZXRhS2V5fHx0LmFsdEtleXx8dC5zaGlmdEtleXx8dC5kZWZhdWx0UHJldmVudGVkKSl7Zm9yKHZhciBuPXQudGFyZ2V0O24mJighbi5ocmVmfHxcIkFcIiE9PW4ubm9kZU5hbWUpOyluPW4ucGFyZW50Tm9kZTtpZihuJiZ3aW5kb3cubG9jYXRpb24ub3JpZ2luPT09bi5vcmlnaW4mJiFuLmhhc0F0dHJpYnV0ZShcImRvd25sb2FkXCIpJiZcIl9ibGFua1wiIT09bi50YXJnZXQmJiEvbWFpbHRvfHRlbC8udGVzdChuLmhyZWYpJiYhbi5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1hamF4XCIpKXt2YXIgZT1nKG4ucGF0aG5hbWUpLHI9ZVswXSxvPWVbMV07cmV0dXJuIG8uaWdub3JlP3Q6KHQucHJldmVudERlZmF1bHQoKSxzLmxvY2F0aW9uIT09ciYmbShyLG8pLGgoXCJuYXZpZ2F0ZVwiKSwhMSl9fX0pLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIixmdW5jdGlvbih0KXtpZih0LnRhcmdldC5sb2NhdGlvbi5wYXRobmFtZSE9PXMubG9jYXRpb24pcmV0dXJuIG0uYXBwbHkodm9pZCAwLGcodC50YXJnZXQubG9jYXRpb24uaHJlZikuY29uY2F0KFshMF0pKSwhMX0pLHtnZXQgc3RhdGUoKXtyZXR1cm4gc30sZ286ZnVuY3Rpb24odCl7aT1udWxsLG0uYXBwbHkodm9pZCAwLGcodCkuY29uY2F0KFshMV0pKX0sbG9hZDpmdW5jdGlvbih0LG4pe3JldHVybiBwLmFwcGx5KHZvaWQgMCxnKHQpLmNvbmNhdChbbl0pKX0sb246ZnVuY3Rpb24odCxuKXtyZXR1cm4gbFt0XT1sW3RdP2xbdF0uY29uY2F0KG4pOltuXSxmdW5jdGlvbigpe3JldHVybiBsW3RdLnNsaWNlKGxbdF0uaW5kZXhPZihuKSwxKX19fX1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9wZXJhdG9yLmVzLmpzLm1hcFxuIiwiZnVuY3Rpb24gdCh0LG4sZSl7cmV0dXJue25vZGU6dCxhY3Rpb25zOm4saHlkcmF0ZTplLmh5ZHJhdGUsZ2V0IHN0YXRlKCl7cmV0dXJuIGUuc3RhdGV9fX1mdW5jdGlvbiBuKG4pe3JldHVybiBmdW5jdGlvbihlLHIsbyl7dmFyIHU9bih0KGUscixvKSl8fHt9O3JldHVybiB1Lm9uU3RhdGVDaGFuZ2UmJm8ubGlzdGVuKHUub25TdGF0ZUNoYW5nZSksdX19ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obixlLHIpe3ZvaWQgMD09PW4mJihuPXt9KSx2b2lkIDA9PT1yJiYocj17fSk7dmFyIG89W10sdT1mdW5jdGlvbih0KXt2YXIgbj1PYmplY3QuYXNzaWduKHt9LHQpLGU9W10scj1bXTtyZXR1cm57Z2V0IHN0YXRlKCl7cmV0dXJuIG59LGh5ZHJhdGU6ZnVuY3Rpb24odCl7cmV0dXJuIG49T2JqZWN0LmFzc2lnbih7fSxuLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0KSxmdW5jdGlvbih0KXtmb3IodmFyIG89MCx1PWU7bzx1Lmxlbmd0aDtvKz0xKSgwLHVbb10pKG4pO2Zvcig7ci5sZW5ndGg7KXIucG9wKCkobik7dCYmdCgpfX0sbGlzdGVuOmZ1bmN0aW9uKHQpe3JldHVybiBlLmluZGV4T2YodCk8MCYmZS5wdXNoKHQpLGZ1bmN0aW9uKCl7cmV0dXJuIGUuc3BsaWNlKGUuaW5kZXhPZih0KSwxKX19LG9uY2U6ZnVuY3Rpb24odCl7ci5pbmRleE9mKHQpPDAmJnIucHVzaCh0KX0scmVzZXQ6ZnVuY3Rpb24oKXtuPXR9LHJlcGxhY2U6ZnVuY3Rpb24odCl7bj10fX19KGV8fHt9KSxpPU9iamVjdC5rZXlzKHIpLnJlZHVjZShmdW5jdGlvbih0LG4pe3JldHVybiB0W25dPWZ1bmN0aW9uKHQpe3JldHVybiBQcm9taXNlLnJlc29sdmUocltuXSh0KSh1LnN0YXRlKSkudGhlbihmdW5jdGlvbih0KXtyZXR1cm4gdS5oeWRyYXRlKHQpKCl9KX0sdH0se30pO3JldHVybnthY3Rpb25zOmksaHlkcmF0ZTp1Lmh5ZHJhdGUsZ2V0IHN0YXRlKCl7cmV0dXJuIHUuc3RhdGV9LGFkZDpmdW5jdGlvbih0KXtPYmplY3QuYXNzaWduKG4sdCl9LG1vdW50OmZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiZGF0YS1jb21wb25lbnRcIiksdD1bXS5jb25jYXQodCk7Zm9yKHZhciBlPTA7ZTx0Lmxlbmd0aDtlKyspZm9yKHZhciByPXRbZV0sYz1bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbXCIrcitcIl1cIikpO2MubGVuZ3RoOylmb3IodmFyIGE9Yy5wb3AoKSxmPWEuZ2V0QXR0cmlidXRlKHIpLnNwbGl0KC9cXHMvKSxzPTA7czxmLmxlbmd0aDtzKyspe3ZhciBsPW5bZltzXV07aWYobCl7YS5yZW1vdmVBdHRyaWJ1dGUocik7dHJ5e28ucHVzaChsKGEsaSx1KSl9Y2F0Y2godCl7Y29uc29sZS5lcnJvcihcInBpY29hcHAgLSBcIitmW3NdK1wiIGZhaWxlZCAtIFwiKyh0Lm1lc3NhZ2V8fHQpLHQuc3RhY2spfX19fSx1bm1vdW50OmZ1bmN0aW9uKCl7cmV0dXJuIFByb21pc2UuYWxsKG8uZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Lm9uVW5tb3VudH0pLm1hcChmdW5jdGlvbihuKXt2YXIgZT1uLm9uVW5tb3VudDtyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZSh0KG4ubm9kZSxpLHUpKTpudWxsKX0pKS50aGVuKGZ1bmN0aW9uKCl7bz1vLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdC5vblVubW91bnR9KS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyh0Lm5vZGUpfSl9KX19fTtleHBvcnR7biBhcyBjb21wb25lbnR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGljb2FwcC5lcy5qcy5tYXBcbiIsIlxuLyoqXG4gKiBBbiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIGFsdGVybmF0aXZlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3Mgc29tZXRoaW5nIHdpdGggYSBsZW5ndGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZVxuICogQHBhcmFtIHtOdW1iZXJ9IHNsaWNlRW5kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3MsIHNsaWNlLCBzbGljZUVuZCkge1xuICB2YXIgcmV0ID0gW107XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAoMCA9PT0gbGVuKSByZXR1cm4gcmV0O1xuXG4gIHZhciBzdGFydCA9IHNsaWNlIDwgMFxuICAgID8gTWF0aC5tYXgoMCwgc2xpY2UgKyBsZW4pXG4gICAgOiBzbGljZSB8fCAwO1xuXG4gIGlmIChzbGljZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuID0gc2xpY2VFbmQgPCAwXG4gICAgICA/IHNsaWNlRW5kICsgbGVuXG4gICAgICA6IHNsaWNlRW5kXG4gIH1cblxuICB3aGlsZSAobGVuLS0gPiBzdGFydCkge1xuICAgIHJldFtsZW4gLSBzdGFydF0gPSBhcmdzW2xlbl07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4iLCJ2YXIgaW5kZXggPSB0eXBlb2YgZmV0Y2g9PSdmdW5jdGlvbicgPyBmZXRjaC5iaW5kKCkgOiBmdW5jdGlvbih1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRyZXF1ZXN0Lm9wZW4ob3B0aW9ucy5tZXRob2QgfHwgJ2dldCcsIHVybCwgdHJ1ZSk7XG5cblx0XHRmb3IgKHZhciBpIGluIG9wdGlvbnMuaGVhZGVycykge1xuXHRcdFx0cmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGksIG9wdGlvbnMuaGVhZGVyc1tpXSk7XG5cdFx0fVxuXG5cdFx0cmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzPT0naW5jbHVkZSc7XG5cblx0XHRyZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc29sdmUocmVzcG9uc2UoKSk7XG5cdFx0fTtcblxuXHRcdHJlcXVlc3Qub25lcnJvciA9IHJlamVjdDtcblxuXHRcdHJlcXVlc3Quc2VuZChvcHRpb25zLmJvZHkgfHwgbnVsbCk7XG5cblx0XHRmdW5jdGlvbiByZXNwb25zZSgpIHtcblx0XHRcdHZhciBrZXlzID0gW10sXG5cdFx0XHRcdGFsbCA9IFtdLFxuXHRcdFx0XHRoZWFkZXJzID0ge30sXG5cdFx0XHRcdGhlYWRlcjtcblxuXHRcdFx0cmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS5yZXBsYWNlKC9eKC4qPyk6W15cXFNcXG5dKihbXFxzXFxTXSo/KSQvZ20sIGZ1bmN0aW9uIChtLCBrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGtleXMucHVzaChrZXkgPSBrZXkudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRcdGFsbC5wdXNoKFtrZXksIHZhbHVlXSk7XG5cdFx0XHRcdGhlYWRlciA9IGhlYWRlcnNba2V5XTtcblx0XHRcdFx0aGVhZGVyc1trZXldID0gaGVhZGVyID8gKGhlYWRlciArIFwiLFwiICsgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0b2s6IChyZXF1ZXN0LnN0YXR1cy8xMDB8MCkgPT0gMixcdFx0Ly8gMjAwLTI5OVxuXHRcdFx0XHRzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuXHRcdFx0XHRzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG5cdFx0XHRcdHVybDogcmVxdWVzdC5yZXNwb25zZVVSTCxcblx0XHRcdFx0Y2xvbmU6IHJlc3BvbnNlLFxuXHRcdFx0XHR0ZXh0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdC5yZXNwb25zZVRleHQpOyB9LFxuXHRcdFx0XHRqc29uOiBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdC5yZXNwb25zZVRleHQpLnRoZW4oSlNPTi5wYXJzZSk7IH0sXG5cdFx0XHRcdGJsb2I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbcmVxdWVzdC5yZXNwb25zZV0pKTsgfSxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdGtleXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGtleXM7IH0sXG5cdFx0XHRcdFx0ZW50cmllczogZnVuY3Rpb24gKCkgeyByZXR1cm4gYWxsOyB9LFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIGhlYWRlcnNbbi50b0xvd2VyQ2FzZSgpXTsgfSxcblx0XHRcdFx0XHRoYXM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLnRvTG93ZXJDYXNlKCkgaW4gaGVhZGVyczsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZmV0Y2guZXMuanMubWFwXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlLG4pe3JldHVybiBQcm9taXNlLmFsbChuLmNvbmNhdChuZXcgUHJvbWlzZShmdW5jdGlvbihuKXtyZXR1cm4gc2V0VGltZW91dChuLGUpfSkpKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBlLnNsaWNlKDAsZS5sZW5ndGgtMSl9KX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD13MnQuZXMuanMubWFwXG4iLCJpbXBvcnQgcGljb2FwcCBmcm9tICdwaWNvYXBwJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci5qcyc7XG5pbXBvcnQgcHJvZHVjdCBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC5qcyc7XG5pbXBvcnQgcHJvZHVjdFNlbGVjdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC1zZWxlY3Rpb24uanMnO1xuaW1wb3J0IGNhcnREcmF3ZXIgZnJvbSAnLi9jb21wb25lbnRzL2NhcnREcmF3ZXIuanMnO1xuaW1wb3J0IGNhcnREcmF3ZXJJdGVtIGZyb20gJy4vY29tcG9uZW50cy9jYXJ0RHJhd2VySXRlbS5qcyc7XG5pbXBvcnQgYWNjb3VudExvZ2luIGZyb20gJy4vY29tcG9uZW50cy9hY2NvdW50TG9naW4uanMnO1xudmFyIHN0YXRlID0ge1xuICBjYXJ0T3BlbjogZmFsc2Vcbn07XG52YXIgYWN0aW9ucyA9IHtcbiAgdG9nZ2xlQ2FydDogZnVuY3Rpb24gdG9nZ2xlQ2FydChvcGVuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2FydE9wZW46ICFzdGF0ZS5jYXJ0T3BlblxuICAgICAgfTtcbiAgICB9O1xuICB9XG59O1xudmFyIGNvbXBvbmVudHMgPSB7XG4gIGhlYWRlcjogaGVhZGVyLFxuICBwcm9kdWN0OiBwcm9kdWN0LFxuICBwcm9kdWN0U2VsZWN0aW9uOiBwcm9kdWN0U2VsZWN0aW9uLFxuICBjYXJ0RHJhd2VyOiBjYXJ0RHJhd2VyLFxuICBjYXJ0RHJhd2VySXRlbTogY2FydERyYXdlckl0ZW0sXG4gIGFjY291bnRMb2dpbjogYWNjb3VudExvZ2luXG59O1xuZXhwb3J0IGRlZmF1bHQgcGljb2FwcChjb21wb25lbnRzLCBzdGF0ZSwgYWN0aW9ucyk7IiwiaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSAncGljb2FwcCc7XG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIG91dGVyID0gX3JlZi5ub2RlLFxuICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICB2YXIgbG9naW4gPSBvdXRlci5xdWVyeVNlbGVjdG9yKCcuanMtbG9naW4tZGlhbG9nJyk7XG4gIHZhciByZWNvdmVyID0gb3V0ZXIucXVlcnlTZWxlY3RvcignLmpzLXJlY292ZXItZGlhbG9nJyk7XG4gIHZhciByZWNvdmVyTGluayA9IG91dGVyLnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZWNvdmVyLXRyaWdnZXInKTtcbiAgdmFyIGNhbmNlbFJlY292ZXJMaW5rID0gb3V0ZXIucXVlcnlTZWxlY3RvcignLmpzLXJlY292ZXItY2FuY2VsJyk7XG4gIC8qIGVzbGludC1kaXNhYmxlICovXG5cbiAgdmFyIHJlY292ZXJJc1RhcmdldCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKC9cXCNyZWNvdmVyLykgPyB0cnVlIDogZmFsc2U7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICB2YXIgc3VjY2Vzc01lc3NhZ2UgPSBvdXRlci5xdWVyeVNlbGVjdG9yKCcuanMtcmVjb3Zlci1zdWNjZXNzJykgIT09IG51bGw7XG5cbiAgaWYgKHJlY292ZXJJc1RhcmdldCB8fCBzdWNjZXNzTWVzc2FnZSkge1xuICAgIGxvZ2luLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgcmVjb3Zlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfSBlbHNlIHtcbiAgICBsb2dpbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHJlY292ZXJMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9naW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICByZWNvdmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9KTtcbiAgY2FuY2VsUmVjb3ZlckxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZWNvdmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbG9naW4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0pO1xufSk7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTsgdmFyIGtleSwgaTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7IGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7IGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07IGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSB7fTsgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyB2YXIga2V5LCBpOyBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgeyBrZXkgPSBzb3VyY2VLZXlzW2ldOyBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlOyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IHsgZmV0Y2hDYXJ0IH0gZnJvbSAnLi4vc2xhdGVyL2NhcnQnO1xuaW1wb3J0IHsgZ2V0U2l6ZWRJbWFnZVVybCwgaW1hZ2VTaXplIH0gZnJvbSAnLi4vc2xhdGVyL2ltYWdlcyc7XG5pbXBvcnQgeyBmb3JtYXRNb25leSB9IGZyb20gJy4uL3NsYXRlci9jdXJyZW5jeSc7XG5pbXBvcnQgeyBjb21wb25lbnQgfSBmcm9tICdwaWNvYXBwJztcbmltcG9ydCBhcHAgZnJvbSAnLi4vYXBwLmpzJztcbnZhciBYID0gXCI8c3ZnIHZpZXdCb3g9XFxcIjAgMCAxNiAxNlxcXCIgd2lkdGg9XFxcIjE2XFxcIiBoZWlnaHQ9XFxcIjE2XFxcIiBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcImN1cnJlbnRjb2xvclxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIzXFxcIiBzdHlsZT1cXFwiZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO292ZXJmbG93OnZpc2libGU7XFxcIj48cGF0aCBkPVxcXCJNMS4wNjA2NjAxNzE3Nzk4MjEyIDEuMDYwNjYwMTcxNzc5ODIxMiBMMTQuOTM5MzM5ODI4MjIwMTc5IDE0LjkzOTMzOTgyODIyMDE3OVxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xNC45MzkzMzk4MjgyMjAxNzkgMS4wNjA2NjAxNzE3Nzk4MjEyIEwxLjA2MDY2MDE3MTc3OTgyMTIgMTQuOTM5MzM5ODI4MjIwMTc5XFxcIj48L3BhdGg+PC9zdmc+XCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUl0ZW0oX3JlZikge1xuICB2YXIgaWQgPSBfcmVmLnZhcmlhbnRfaWQsXG4gICAgICB0aXRsZSA9IF9yZWYucHJvZHVjdF90aXRsZSxcbiAgICAgIHByaWNlID0gX3JlZi5saW5lX3ByaWNlLFxuICAgICAgY29sb3IgPSBfcmVmLnZhcmlhbnRfdGl0bGUsXG4gICAgICBpbWFnZSA9IF9yZWYuaW1hZ2UsXG4gICAgICB1cmwgPSBfcmVmLnVybCxcbiAgICAgIHF1YW50aXR5ID0gX3JlZi5xdWFudGl0eSxcbiAgICAgIGl0ZW0gPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgW1widmFyaWFudF9pZFwiLCBcInByb2R1Y3RfdGl0bGVcIiwgXCJsaW5lX3ByaWNlXCIsIFwidmFyaWFudF90aXRsZVwiLCBcImltYWdlXCIsIFwidXJsXCIsIFwicXVhbnRpdHlcIl0pO1xuXG4gIHZhciBpbWcgPSBpbWFnZSA/IGdldFNpemVkSW1hZ2VVcmwoaW1hZ2UucmVwbGFjZSgnXycgKyBpbWFnZVNpemUoaW1hZ2UpLCAnJyksICcyMDB4JyAvLyBUT0RPIGhhY2t5IGFmXG4gICkgOiAnaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL1I5T1MyOXhKYi04LzIwMDB4MTMzMyc7XG4gIHJldHVybiBcIlxcbjxkaXYgY2xhc3M9J2NhcnQtZHJhd2VyX19pdGVtJyBkYXRhLWNvbXBvbmVudD0nY2FydERyYXdlckl0ZW0nIGRhdGEtaWQ9XCIuY29uY2F0KGlkLCBcIj5cXG4gIDxkaXYgY2xhc3M9J2YgYWljJz5cXG4gICAgPGEgaHJlZj0nXCIpLmNvbmNhdCh1cmwsIFwiJz5cXG4gICAgICA8aW1nIHNyYz0nXCIpLmNvbmNhdChpbWcsIFwiJyAvPlxcbiAgICA8L2E+XFxuICAgIDxkaXYgY2xhc3M9J19fY29udGVudCBwbDEgZiB5IGFpcyBqY2InPlxcbiAgICAgIDxkaXY+XFxuICAgICAgICA8YSBocmVmPSdcIikuY29uY2F0KHVybCwgXCInIGNsYXNzPSdzZXJpZiBtdjAgcCBtdjAnPlwiKS5jb25jYXQodGl0bGUsIFwiPC9hPlxcbiAgICAgICAgPGRpdiBjbGFzcz0nc21hbGwgc2FucyB0cmFjayBtdDAyNSBtYjA1IGJvb2snPlwiKS5jb25jYXQoZm9ybWF0TW9uZXkocHJpY2UpLCBcIjwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz0nZiBhaWMnPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPSdjYXJ0LXF1YW50aXR5IGpzLXJlbW92ZS1zaW5nbGUgcHgwNSc+LTwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPSdqcy1zaW5nbGUtcXVhbnRpdHknPlwiKS5jb25jYXQocXVhbnRpdHksIFwiPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9J2NhcnQtcXVhbnRpdHkganMtYWRkLXNpbmdsZSBweDA1Jz4rPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKS5jb25jYXQoY29sb3IgPyBcIjxkaXYgY2xhc3M9J3hzbWFsbCBzYW5zIGNhcHMgdHJhY2sgY20gbXYwMjUgYm9vayc+XCIuY29uY2F0KGNvbG9yLnNwbGl0KCc6JylbMF0sIFwiPC9kaXY+XCIpIDogXCJcIiwgXCJcXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8YnV0dG9uIGNsYXNzPSdidXR0b24tLXJlc2V0Jz5cIikuY29uY2F0KFgsIFwiPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCIpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtcyhpdGVtcykge1xuICByZXR1cm4gaXRlbXMubGVuZ3RoID4gMCA/IGl0ZW1zLnJlZHVjZShmdW5jdGlvbiAobWFya3VwLCBpdGVtKSB7XG4gICAgbWFya3VwICs9IGNyZWF0ZUl0ZW0oaXRlbSk7XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSwgJycpIDogXCI8ZGl2IGNsYXNzPSdwdjEnPjxwIGNsYXNzPSdwdjEgbXYwNSBzYW5zIHNtYWxsIGNtIGkgYWMnPllvdXIgY2FydCBpcyBlbXB0eTwvcD48L2Rpdj5cIjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KGZ1bmN0aW9uIChfcmVmMikge1xuICB2YXIgbm9kZSA9IF9yZWYyLm5vZGUsXG4gICAgICBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgYWN0aW9ucyA9IF9yZWYyLmFjdGlvbnM7XG4gIHZhciBvdmVybGF5ID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtb3ZlcmxheScpO1xuICB2YXIgY2xvc2VCdXR0b24gPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbG9zZScpO1xuICB2YXIgc3VidG90YWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1zdWJ0b3RhbCcpO1xuICB2YXIgaXRlbXNSb290ID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtaXRlbXMnKTtcbiAgdmFyIGxvYWRpbmcgPSBpdGVtc1Jvb3QuaW5uZXJIVE1MO1xuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoY2FydCkge1xuICAgIGl0ZW1zUm9vdC5pbm5lckhUTUwgPSByZW5kZXJJdGVtcyhjYXJ0Lml0ZW1zKTtcbiAgICBzdWJ0b3RhbC5pbm5lckhUTUwgPSBmb3JtYXRNb25leShjYXJ0LnRvdGFsX3ByaWNlKTtcbiAgfTtcblxuICB2YXIgb3BlbiA9IGZ1bmN0aW9uIG9wZW4oY2FydCkge1xuICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgaXRlbXNSb290LmlubmVySFRNTCA9IGxvYWRpbmc7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcbiAgICAgIHNldFRpbWVvdXQocmVuZGVyKGNhcnQpLCAxMCk7XG4gICAgICBhcHAubW91bnQoKTtcbiAgICB9LCA1MCk7XG4gIH07XG5cbiAgdmFyIGNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgYXBwLmh5ZHJhdGUoe1xuICAgICAgICBjYXJ0T3BlbjogZmFsc2VcbiAgICAgIH0pO1xuICAgIH0sIDQwMCk7XG4gIH07XG5cbiAgcmVuZGVyKHN0YXRlLmNhcnQpO1xuICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2UpO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlKTtcbiAgcmV0dXJuIHtcbiAgICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKF9yZWYzKSB7XG4gICAgICB2YXIgY2FydCA9IF9yZWYzLmNhcnQsXG4gICAgICAgICAgY2FydE9wZW4gPSBfcmVmMy5jYXJ0T3BlbjtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGF0ZSBpcyBjaGFuZ2luZz8nLCBjYXJ0T3Blbik7XG4gICAgICBjYXJ0T3BlbiA/IG9wZW4oY2FydCkgOiBudWxsO1xuICAgIH1cbiAgfTtcbn0pOyAvL1xuLy8gZXhwb3J0IGRlZmF1bHQgb3V0ZXIgPT4ge1xuLy8gICBsZXQgaXNPcGVuID0gZmFsc2Vcbi8vXG4vLyAgIGNvbnN0IG92ZXJsYXkgPSBvdXRlci5xdWVyeVNlbGVjdG9yKCcuanMtb3ZlcmxheScpXG4vLyAgIGNvbnN0IGNsb3NlQnV0dG9uID0gb3V0ZXIucXVlcnlTZWxlY3RvcignLmpzLWNsb3NlJylcbi8vICAgY29uc3Qgc3VidG90YWwgPSBvdXRlci5xdWVyeVNlbGVjdG9yKCcuanMtc3VidG90YWwnKVxuLy8gICBjb25zdCBpdGVtc1Jvb3QgPSBvdXRlci5xdWVyeVNlbGVjdG9yKCcuanMtaXRlbXMnKVxuLy8gICBjb25zdCBsb2FkaW5nID0gaXRlbXNSb290LmlubmVySFRNTFxuLy9cbi8vICAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbi8vICAgICBmZXRjaENhcnQoKS50aGVuKGNhcnQgPT4ge1xuLy8gICAgICAgaXRlbXNSb290LmlubmVySFRNTCA9IHJlbmRlckl0ZW1zKGNhcnQuaXRlbXMpXG4vLyAgICAgICBzdWJ0b3RhbC5pbm5lckhUTUwgPSBmb3JtYXRNb25leShjYXJ0LnRvdGFsX3ByaWNlKVxuLy8gICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgICAgIHNjcmlwdHMubW91bnQoKVxuLy8gICAgICAgfSwgMClcbi8vICAgICB9KVxuLy8gICB9XG4vL1xuLy8gICBmdW5jdGlvbiBvcGVuICgpIHtcbi8vICAgICBvdXRlci5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuLy9cbi8vICAgICBpdGVtc1Jvb3QuaW5uZXJIVE1MID0gbG9hZGluZ1xuLy9cbi8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgICAgIG91dGVyLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKVxuLy8gICAgICAgaXNPcGVuID0gdHJ1ZVxuLy8gICAgICAgc2V0VGltZW91dChyZW5kZXIsIDEwKVxuLy8gICAgIH0sIDUwKVxuLy8gICB9XG4vL1xuLy8gICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4vLyAgICAgb3V0ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpXG4vL1xuLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICAgICAgb3V0ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbi8vICAgICAgIGlzT3BlbiA9IGZhbHNlXG4vLyAgICAgfSwgNDAwKVxuLy8gICB9XG4vL1xuLy8gICBvbigndXBkYXRlZCcsICh7IGNhcnQgfSkgPT4ge1xuLy8gICAgIGlzT3BlbiA/IHJlbmRlcigpIDogb3BlbigpXG4vLyAgIH0pXG4vLyAgIG9uKCdhZGRvbicsICh7IGNhcnQgfSkgPT4ge1xuLy8gICAgIGlzT3BlbiA/IHJlbmRlcigpIDogb3BlbigpXG4vLyAgIH0pXG4vLyAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSlcbi8vICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSlcbi8vXG4vLyAgIHJldHVybiB7XG4vLyAgICAgb3Blbixcbi8vICAgICBjbG9zZTogY2xvc2Vcbi8vICAgfVxuLy8gfSIsImltcG9ydCB7IHJlbW92ZUFkZG9uLCB1cGRhdGVBZGRvbiB9IGZyb20gJy4uL3NsYXRlci9jYXJ0LmpzJztcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gJ3BpY29hcHAnO1xuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50KGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpdGVtID0gX3JlZi5ub2RlLFxuICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICB2YXIgYnV0dG9uID0gaXRlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJylbMF07XG4gIHZhciBkZWNyZWFzZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXJlbW92ZS1zaW5nbGUnKTtcbiAgdmFyIGluY3JlYXNlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtYWRkLXNpbmdsZScpO1xuICB2YXIgY3VycmVudFF0eSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXNpbmdsZS1xdWFudGl0eScpLmlubmVySFRNTDtcbiAgdmFyIGlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmVtb3ZlQWRkb24oaWQpO1xuICB9KTtcbiAgZGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB1cGRhdGVBZGRvbihpZCwgcGFyc2VJbnQoY3VycmVudFF0eSkgLSAxKTtcbiAgfSk7XG4gIGluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdXBkYXRlQWRkb24oaWQsIHBhcnNlSW50KGN1cnJlbnRRdHkpICsgMSk7XG4gIH0pO1xufSk7IiwiLy8gaW1wb3J0IHsgb24sIGZldGNoQ2FydCB9IGZyb20gJy4uL3NsYXRlci9jYXJ0J1xuaW1wb3J0IHsgY29tcG9uZW50IH0gZnJvbSAncGljb2FwcCc7IC8vIGltcG9ydCBDYXJ0IGZyb20gJy4vY2FydC1kcmF3ZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudChmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaGVhZGVyID0gX3JlZi5ub2RlLFxuICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgYWN0aW9ucyA9IF9yZWYuYWN0aW9ucztcbiAgdmFyIGNhcnRDb3VudCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanMtY2FydC1jb3VudCcpO1xuICB2YXIgY2FydFRvZ2dsZXMgPSBoZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnLmpzLWNhcnQtZHJhd2VyLXRvZ2dsZScpO1xuICBjYXJ0Q291bnQuaW5uZXJIVE1MID0gc3RhdGUuY2FydC5pdGVtcy5sZW5ndGggPj0gMSA/IHN0YXRlLmNhcnQuaXRlbV9jb3VudCA6IG51bGw7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNhcnRUb2dnbGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIHRvZ2dsZSA9IF9zdGVwLnZhbHVlO1xuICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3lvIGNsaWNrJywgc3RhdGUpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFjdGlvbnMudG9nZ2xlQ2FydCh0cnVlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3lvIGNsaWNrJywgc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuICE9IG51bGwpIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKHN0YXRlKSB7XG4gICAgICBjYXJ0Q291bnQuaW5uZXJIVE1MID0gc3RhdGUuY2FydC5pdGVtX2NvdW50O1xuICAgIH1cbiAgfTsgLy8gICBjb25zdCBjYXJ0Q291bnQgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmpzLWNhcnQtY291bnQnKVxuICAvLyAgIGNvbnN0IGNhcnQgPSBmZXRjaENhcnQoKVxuICAvLyAgIGNhcnQudGhlbihyZXMgPT4ge1xuICAvLyAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gIC8vICAgICByZXMgPyBjYXJ0Q291bnQuaW5uZXJIVE1MID0gcmVzLml0ZW1fY291bnQgOiBudWxsXG4gIC8vICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gIC8vICAgfSlcbiAgLy8gb24oJ3VwZGF0ZWQnLCAoeyBjYXJ0IH0pID0+IHtcbiAgLy8gICBjYXJ0Q291bnQuaW5uZXJIVE1MID0gY2FydC5pdGVtX2NvdW50XG4gIC8vIH0pXG4gIC8vIG9uKCdhZGRvbicsICh7IGNhcnQgfSkgPT4ge1xuICAvLyAgIGNhcnRDb3VudC5pbm5lckhUTUwgPSBjYXJ0Lml0ZW1fY291bnRcbiAgLy8gfSlcbiAgLy8gICAvKipcbiAgLy8gIC8vICogQ2FydCBvcGVuaW5nXG4gIC8vICAvLyAqL1xuICAvLyAgIGNvbnN0IGNhcnRUb2dnbGVzID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jYXJ0LWRyYXdlci10b2dnbGUnKVxuICAvLyAgIGZvciAobGV0IHRvZ2dsZSBvZiBjYXJ0VG9nZ2xlcykge1xuICAvLyAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIC8vICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkPycpXG4gIC8vICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyAgICAgICBDYXJ0Lm9wZW4oKVxuICAvLyAgICAgICAvLyBjb25zdCBjYXJ0RHJhd2VyID0gc2NyaXB0cy5jYWNoZS5nZXQoJ2NhcnQtZHJhd2VyJylcbiAgLy8gICAgICAgLy8gY2FydERyYXdlci5vcGVuKClcbiAgLy8gICAgIH0pXG4gIC8vICAgfVxufSk7IiwiaW1wb3J0IHsgYWRkVmFyaWFudCB9IGZyb20gJy4uL3NsYXRlci9jYXJ0LmpzJztcbmltcG9ydCB7IGNvbXBvbmVudCB9IGZyb20gJ3BpY29hcHAnO1xuaW1wb3J0IHdhaXQgZnJvbSAndzJ0JztcbmltcG9ydCByYWRpbyBmcm9tICcuLi9zbGF0ZXIvcmFkaW8uanMnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vc2xhdGVyL29wdGlvbnMuanMnO1xuaW1wb3J0IGdldFByb2R1Y3RKc29uIGZyb20gJy4uL3NsYXRlci9nZXRQcm9kdWN0SnNvbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIG5vZGUgPSBfcmVmLm5vZGU7XG4gIHZhciBvcHRzID0gb3B0aW9ucyhub2RlKTsgLy8gY2FjaGVcblxuICBnZXRQcm9kdWN0SnNvbigpO1xuICBvcHRzLm9uVXBkYXRlKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIGdldFByb2R1Y3RKc29uKCkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgdmFyIHZhcmlhbnQgPSBqc29uLnZhcmlhbnRzLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdi5pZCA9PSBzdGF0ZS5pZDtcbiAgICAgIH0pWzBdO1xuICAgIH0pO1xuICB9KTtcbn0pOyIsImltcG9ydCB7IGFkZFZhcmlhbnQgfSBmcm9tICcuLi9zbGF0ZXIvY2FydC5qcyc7XG5pbXBvcnQgeyBjb21wb25lbnQgfSBmcm9tICdwaWNvYXBwJztcbmltcG9ydCB3YWl0IGZyb20gJ3cydCc7XG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQoZnVuY3Rpb24gKF9yZWYpIHsvLyBjb25zdCB7IHNlbGVjdGVkT3JGaXJzdEF2YWlsYWJsZVZhcmlhbnQsIHByb2R1Y3QgfSA9IEpTT04ucGFyc2UoZWwucXVlcnlTZWxlY3RvcignLmpzLXByb2R1Y3QtanNvbicpLmlubmVySFRNTClcbiAgLy8gbGV0IGN1cnJlbnRWYXJpYW50ID0gcHJvZHVjdC52YXJpYW50cy5maWx0ZXIodiA9PiB2LmlkID09PSBzZWxlY3RlZE9yRmlyc3RBdmFpbGFibGVWYXJpYW50KVswXVxuICAvLyBjb25zdCBmb3JtID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKVswXVxuICAvLyBjb25zdCBzdWJtaXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5qcy1zdWJtaXQtY2FydCcpXG4gIC8vIGNvbnN0IHF1YW50aXR5ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuanMtcXVhbnRpdHknKS52YWx1ZVxuICAvLyBjb25zb2xlLmxvZygnc3ViYnknLCBmb3JtKVxuICAvLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyAgIHN1Ym1pdC5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnQWRkaW5nLi4nXG4gIC8vICAgd2FpdCgxMDAwLCBbXG4gIC8vICAgICBhZGRWYXJpYW50KGN1cnJlbnRWYXJpYW50LCBxdWFudGl0eSkudGhlbigoeyBpdGVtLCBjYXJ0IH0pID0+IHtcbiAgLy8gICAgICAgc3VibWl0LmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdBZGQgdG8gQ2FydCdcbiAgLy8gICAgIH0pLmNhdGNoKGUgPT4ge1xuICAvLyAgICAgICBhbGVydChlKVxuICAvLyAgICAgfSlcbiAgLy8gICBdKVxuICAvLyB9KVxuXG4gIHZhciBlbCA9IF9yZWYubm9kZSxcbiAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcbn0pOyAvL1xuLy8gZXhwb3J0IGRlZmF1bHQgZWwgPT4ge1xuLy8gICBjb25zdCB7IHNlbGVjdGVkT3JGaXJzdEF2YWlsYWJsZVZhcmlhbnQsIHByb2R1Y3QgfSA9IEpTT04ucGFyc2UoZWwucXVlcnlTZWxlY3RvcignLmpzLXByb2R1Y3QtanNvbicpLmlubmVySFRNTClcbi8vXG4vLyAgIGxldCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QudmFyaWFudHMuZmlsdGVyKHYgPT4gdi5pZCA9PT0gc2VsZWN0ZWRPckZpcnN0QXZhaWxhYmxlVmFyaWFudClbMF1cbi8vXG4vLyAgIC8qKlxuLy8gICAgKiBBZGRpbmcgcHJvZHVjdHMgdG8gY2FydFxuLy8gICAgKi9cbi8vICAgY29uc3QgZm9ybSA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJylbMF1cbi8vICAgY29uc3Qgc3VibWl0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuanMtc3VibWl0LWNhcnQnKVxuLy8gICBjb25zdCBxdWFudGl0eSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5JykudmFsdWVcbi8vXG4vLyAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4vLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4vLyAgICAgY29uc29sZS5sb2coJ2FkZCB0byBjYXJ0Jylcbi8vXG4vLyAgICAgc3VibWl0LmRpc2FibGVkID0gdHJ1ZVxuLy8gICAgIGFkZFZhcmlhbnQoY3VycmVudFZhcmlhbnQsIHF1YW50aXR5KS50aGVuKCh7IGl0ZW0sIGNhcnQgfSkgPT4ge1xuLy8gICAgICAgc3VibWl0LmRpc2FibGVkID0gZmFsc2Vcbi8vICAgICB9KS5jYXRjaChlID0+IHtcbi8vICAgICAgIHN1Ym1pdC5kaXNhYmxlZCA9IGZhbHNlXG4vLyAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gICAgICAgYWxlcnQoZSlcbi8vICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbi8vICAgICB9KVxuLy8gICB9KVxuLy8gfSIsImZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5pbXBvcnQgb3BlcmF0b3IgZnJvbSAnb3BlcmF0b3InO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcC5qcyc7XG5pbXBvcnQgeyBmZXRjaENhcnQgfSBmcm9tICcuL3NsYXRlci9jYXJ0JztcbmltcG9ydCAnLi9zbGF0ZXIvdXRpbC9zZWxlY3QuanMnO1xuaW1wb3J0ICcuLi9zdHlsZXMvbWFpbi5jc3MnO1xuXG5mdW5jdGlvbiB0cmFuc2l0aW9uKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlcykge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtdHJhbnNpdGlvbmluZycpO1xuICAgIHNldFRpbWVvdXQocmVzLCA2MDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdHJhbnNpdGlvbmluZycpO1xuICAgIH0sIDgwMCk7XG4gIH0pO1xufVxuXG52YXIgcm91dGVyID0gb3BlcmF0b3IoJyNyb290JywgW3RyYW5zaXRpb25dKTtcbnJvdXRlci5vbignYmVmb3JlJywgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChbYXBwLnVubW91bnQoKV0pO1xufSk7XG5yb3V0ZXIub24oJ2FmdGVyJywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHRpdGxlID0gX3JlZi50aXRsZSxcbiAgICAgIHBhdGhuYW1lID0gX3JlZi5wYXRobmFtZTtcbiAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgcGF0aG5hbWUpO1xufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGUpIHtcbiAgUHJvbWlzZS5hbGwoW2ZldGNoQ2FydCgpXSkudGhlbihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgX3JlZjMgPSBfc2xpY2VkVG9BcnJheShfcmVmMiwgMSksXG4gICAgICAgIGNhcnQgPSBfcmVmM1swXTtcblxuICAgIGFwcC5oeWRyYXRlKHtcbiAgICAgIGNhcnQ6IGNhcnRcbiAgICB9KTtcbiAgICBhcHAubW91bnQoKTtcbiAgfSk7XG59KTtcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoJ1NsYXRlciBjcmVkaXRzIPCfjZ0gIHRhY28nKTtcbmNvbnNvbGUubG9nKCdEZXZlbG9wbWVudCBieSBUaGUgQ291Y2ggaHR0cHM6Ly90aGVjb3VjaC5ueWMnKTtcbmNvbnNvbGUuZ3JvdXBFbmQoKTsiLCJpbXBvcnQgZmV0Y2ggZnJvbSAndW5mZXRjaCc7XG5pbXBvcnQgbWl0dCBmcm9tICdtaXR0JztcbmltcG9ydCBhcHAgZnJvbSAnLi4vYXBwLmpzJztcbnZhciBldiA9IG1pdHQoKTtcbmV4cG9ydCB2YXIgb24gPSBldi5vbjtcbmV4cG9ydCBmdW5jdGlvbiBhZGRWYXJpYW50KHZhcmlhbnQsIHF1YW50aXR5KSB7XG4gIHZhciBudW1BdmFpbGFibGUgPSB2YXJpYW50LmludmVudG9yeV9wb2xpY3kgPT09ICdkZW55JyAmJiB2YXJpYW50LmludmVudG9yeV9tYW5hZ2VtZW50ID09PSAnc2hvcGlmeScgPyB2YXJpYW50LmludmVudG9yeV9xdWFudGl0eSA6IG51bGw7IC8vIG51bGwgbWVhbnMgdGhleSBjYW4gYWRkIGFzIG1hbnkgYXMgdGhleSB3YW50XG5cbiAgcmV0dXJuIGZldGNoQ2FydCgpLnRoZW4oZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgaXRlbXMgPSBfcmVmLml0ZW1zO1xuICAgIHZhciBleGlzdGluZyA9IGl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IHZhcmlhbnQuaWQ7XG4gICAgfSlbMF0gfHwge307XG4gICAgdmFyIG51bVJlcXVlc3RlZCA9IChleGlzdGluZy5xdWFudGl0eSB8fCAwKSArIHF1YW50aXR5O1xuXG4gICAgaWYgKG51bUF2YWlsYWJsZSAhPT0gbnVsbCAmJiBudW1SZXF1ZXN0ZWQgPiBudW1BdmFpbGFibGUpIHtcbiAgICAgIHZhciBlcnIgPSBcIlRoZXJlIGFyZSBvbmx5IFwiLmNvbmNhdChudW1BdmFpbGFibGUsIFwiIG9mIHRoYXQgcHJvZHVjdCBhdmFpbGFibGUsIHJlcXVlc3RlZCBcIikuY29uY2F0KG51bVJlcXVlc3RlZCwgXCIuXCIpO1xuICAgICAgZXYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGRJdGVtQnlJZCh2YXJpYW50LmlkLCBxdWFudGl0eSk7XG4gICAgfVxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBZGRvbihpZCwgcXVhbnRpdHkpIHtcbiAgcmV0dXJuIGZldGNoQ2FydCgpLnRoZW4oZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIGl0ZW1zID0gX3JlZjIuaXRlbXM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXRlbXNbaV0udmFyaWFudF9pZCA9PT0gcGFyc2VJbnQoaWQpKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VBZGRvbihpICsgMSwgcXVhbnRpdHkpOyAvLyBzaG9waWZ5IGNhcnQgaXMgYSAxLWJhc2VkIGluZGV4XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBZGRvbihpZCkge1xuICByZXR1cm4gdXBkYXRlQWRkb24oaWQsIDApO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VBZGRvbihsaW5lLCBxdWFudGl0eSkge1xuICBldi5lbWl0KCd1cGRhdGluZycpO1xuICByZXR1cm4gZmV0Y2goJy9jYXJ0L2NoYW5nZS5qcycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGxpbmU6IGxpbmUsXG4gICAgICBxdWFudGl0eTogcXVhbnRpdHlcbiAgICB9KVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoY2FydCkge1xuICAgIGV2LmVtaXQoJ2FkZG9uJywge1xuICAgICAgaXRlbTogbnVsbCxcbiAgICAgIGNhcnQ6IGNhcnRcbiAgICB9KTtcbiAgICBhcHAuaHlkcmF0ZSh7XG4gICAgICBjYXJ0OiBjYXJ0XG4gICAgfSkoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCd1cGRhdGVkJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhcnQ7XG4gIH0pO1xufVxuLyoqXG4gKiBXYXJuaW5nOiB0aGlzIGRvZXMgbm90IGNoZWNrIGF2YWlsYWJsZSBwcm9kdWN0cyBmaXJzdFxuICovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW1CeUlkKGlkLCBxdWFudGl0eSkge1xuICBldi5lbWl0KCd1cGRhdGluZycpO1xuICBjb25zb2xlLmxvZygneW8gYWRkZHknKTtcbiAgcmV0dXJuIGZldGNoKCcvY2FydC9hZGQuanMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpZDogaWQsXG4gICAgICBxdWFudGl0eTogcXVhbnRpdHlcbiAgICB9KVxuICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIHIuanNvbigpO1xuICB9KS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGZldGNoQ2FydCgpLnRoZW4oZnVuY3Rpb24gKGNhcnQpIHtcbiAgICAgIGFwcC5oeWRyYXRlKHtcbiAgICAgICAgY2FydDogY2FydFxuICAgICAgfSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ3VwZGF0ZWQnKTtcbiAgICAgIH0pO1xuICAgICAgYXBwLmFjdGlvbnMudG9nZ2xlQ2FydCgpOyAvLyBldi5lbWl0KCd1cGRhdGVkJywgeyBpdGVtLCBjYXJ0IH0pXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgIGNhcnQ6IGNhcnRcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoQ2FydCgpIHtcbiAgcmV0dXJuIGZldGNoKCcvY2FydC5qcycsIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH0pO1xufSIsImltcG9ydCB7IGRlZmF1bHRUbyB9IGZyb20gJy4vdXRpbHMuanMnO1xuLyoqXG4gKiBDdXJyZW5jeSBIZWxwZXJzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQSBjb2xsZWN0aW9uIG9mIHVzZWZ1bCBmdW5jdGlvbnMgdGhhdCBoZWxwIHdpdGggY3VycmVuY3kgZm9ybWF0dGluZ1xuICpcbiAqIEN1cnJlbnQgY29udGVudHNcbiAqIC0gZm9ybWF0TW9uZXkgLSBUYWtlcyBhbiBhbW91bnQgaW4gY2VudHMgYW5kIHJldHVybnMgaXQgYXMgYSBmb3JtYXR0ZWQgZG9sbGFyIHZhbHVlLlxuICpcbiAqL1xuXG4vKipcbiAqIEZvcm1hdCBtb25leSB2YWx1ZXMgYmFzZWQgb24geW91ciBzaG9wIGN1cnJlbmN5IHNldHRpbmdzXG4gKiBAcGFyYW0gIHtOdW1iZXJ8c3RyaW5nfSBjZW50cyAtIHZhbHVlIGluIGNlbnRzIG9yIGRvbGxhciBhbW91bnQgZS5nLiAzMDAgY2VudHNcbiAqIG9yIDMuMDAgZG9sbGFyc1xuICogQHBhcmFtICB7U3RyaW5nfSBmb3JtYXQgLSBzaG9wIG1vbmV5X2Zvcm1hdCBzZXR0aW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHZhbHVlIC0gZm9ybWF0dGVkIHZhbHVlXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1vbmV5KGNlbnRzKSB7XG4gIHZhciBmb3JtYXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcke3thbW91bnR9fSc7XG5cbiAgaWYgKHR5cGVvZiBjZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICBjZW50cyA9IGNlbnRzLnJlcGxhY2UoJy4nLCAnJyk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSAnJztcbiAgdmFyIHBsYWNlaG9sZGVyUmVnZXggPSAvXFx7XFx7XFxzKihcXHcrKVxccypcXH1cXH0vO1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFdpdGhEZWxpbWl0ZXJzKG51bWJlciwgcHJlY2lzaW9uLCB0aG91c2FuZHMsIGRlY2ltYWwpIHtcbiAgICBwcmVjaXNpb24gPSBkZWZhdWx0VG8ocHJlY2lzaW9uLCAyKTtcbiAgICB0aG91c2FuZHMgPSBkZWZhdWx0VG8odGhvdXNhbmRzLCAnLCcpO1xuICAgIGRlY2ltYWwgPSBkZWZhdWx0VG8oZGVjaW1hbCwgJy4nKTtcblxuICAgIGlmIChpc05hTihudW1iZXIpIHx8IG51bWJlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBudW1iZXIgPSAobnVtYmVyIC8gMTAwLjApLnRvRml4ZWQocHJlY2lzaW9uKTtcbiAgICB2YXIgcGFydHMgPSBudW1iZXIuc3BsaXQoJy4nKTtcbiAgICB2YXIgZG9sbGFyc0Ftb3VudCA9IHBhcnRzWzBdLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZFxcZCkrKD8hXFxkKSkvZywgJyQxJyArIHRob3VzYW5kcyk7XG4gICAgdmFyIGNlbnRzQW1vdW50ID0gcGFydHNbMV0gPyBkZWNpbWFsICsgcGFydHNbMV0gOiAnJztcbiAgICByZXR1cm4gZG9sbGFyc0Ftb3VudCArIGNlbnRzQW1vdW50O1xuICB9XG5cbiAgc3dpdGNoIChmb3JtYXQubWF0Y2gocGxhY2Vob2xkZXJSZWdleClbMV0pIHtcbiAgICBjYXNlICdhbW91bnQnOlxuICAgICAgdmFsdWUgPSBmb3JtYXRXaXRoRGVsaW1pdGVycyhjZW50cywgMik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2Ftb3VudF9ub19kZWNpbWFscyc6XG4gICAgICB2YWx1ZSA9IGZvcm1hdFdpdGhEZWxpbWl0ZXJzKGNlbnRzLCAwKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYW1vdW50X3dpdGhfc3BhY2Vfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDIsICcgJywgJy4nKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYW1vdW50X25vX2RlY2ltYWxzX3dpdGhfY29tbWFfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDAsICcsJywgJy4nKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYW1vdW50X25vX2RlY2ltYWxzX3dpdGhfc3BhY2Vfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDAsICcgJyk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBmb3JtYXQucmVwbGFjZShwbGFjZWhvbGRlclJlZ2V4LCB2YWx1ZSk7XG59IiwidmFyIGNhY2hlID0ge307XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQcm9kdWN0SnNvbigpIHtcbiAgdmFyIHNsdWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJldmVyc2UoKVswXTtcbiAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBpZiAoY2FjaGVbc2x1Z10gJiYgIW9wdHMucmVmZXRjaCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZVtzbHVnXSk7XG4gIHJldHVybiBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9wcm9kdWN0cy8nICsgc2x1ZyArICcuanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9KS50aGVuKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHByb2R1Y3QgPSBfcmVmLnByb2R1Y3Q7XG4gICAgY2FjaGVbc2x1Z10gPSBwcm9kdWN0O1xuICAgIHJldHVybiBwcm9kdWN0O1xuICB9KTtcbn0iLCIvKipcbiAqIEltYWdlIEhlbHBlciBGdW5jdGlvbnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBIGNvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIHRoYXQgaGVscCB3aXRoIGJhc2ljIGltYWdlIG9wZXJhdGlvbnMuXG4gKlxuICovXG5cbi8qKlxuICogUHJlbG9hZHMgYW4gaW1hZ2UgaW4gbWVtb3J5IGFuZCB1c2VzIHRoZSBicm93c2VycyBjYWNoZSB0byBzdG9yZSBpdCB1bnRpbCBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gaW1hZ2VzIC0gQSBsaXN0IG9mIGltYWdlIHVybHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gQSBzaG9waWZ5IGltYWdlIHNpemUgYXR0cmlidXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKGltYWdlcywgc2l6ZSkge1xuICBpZiAodHlwZW9mIGltYWdlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBpbWFnZXMgPSBbaW1hZ2VzXTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGltYWdlID0gaW1hZ2VzW2ldO1xuICAgIGxvYWRJbWFnZShnZXRTaXplZEltYWdlVXJsKGltYWdlLCBzaXplKSk7XG4gIH1cbn1cbi8qKlxuICogTG9hZHMgYW5kIGNhY2hlcyBhbiBpbWFnZSBpbiB0aGUgYnJvd3NlcnMgY2FjaGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIEFuIGltYWdlIHVybFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2UocGF0aCkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICBuZXcgSW1hZ2UoKS5zcmMgPSBwYXRoO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG4vKipcbiAqIEZpbmQgdGhlIFNob3BpZnkgaW1hZ2UgYXR0cmlidXRlIHNpemVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gKiBAcmV0dXJucyB7bnVsbH1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTaXplKHNyYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICB2YXIgbWF0Y2ggPSBzcmMubWF0Y2goLy4rXygoPzpwaWNvfGljb258dGh1bWJ8c21hbGx8Y29tcGFjdHxtZWRpdW18bGFyZ2V8Z3JhbmRlKXxcXGR7MSw0fXhcXGR7MCw0fXx4XFxkezEsNH0pW19cXC5AXS8pO1xuICAvKiBlc2xpbmctZW5hYmxlICovXG5cbiAgaWYgKG1hdGNoKSB7XG4gICAgcmV0dXJuIG1hdGNoWzFdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4vKipcbiAqIEFkZHMgYSBTaG9waWZ5IHNpemUgYXR0cmlidXRlIHRvIGEgVVJMXG4gKlxuICogQHBhcmFtIHNyY1xuICogQHBhcmFtIHNpemVcbiAqIEByZXR1cm5zIHsqfVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaXplZEltYWdlVXJsKHNyYywgc2l6ZSkge1xuICBpZiAoc2l6ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBzcmM7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gJ21hc3RlcicpIHtcbiAgICByZXR1cm4gcmVtb3ZlUHJvdG9jb2woc3JjKTtcbiAgfVxuXG4gIHZhciBtYXRjaCA9IHNyYy5tYXRjaCgvXFwuKGpwZ3xqcGVnfGdpZnxwbmd8Ym1wfGJpdG1hcHx0aWZmfHRpZikoXFw/dj1cXGQrKT8kL2kpO1xuXG4gIGlmIChtYXRjaCkge1xuICAgIHZhciBwcmVmaXggPSBzcmMuc3BsaXQobWF0Y2hbMF0pO1xuICAgIHZhciBzdWZmaXggPSBtYXRjaFswXTtcbiAgICByZXR1cm4gcmVtb3ZlUHJvdG9jb2wocHJlZml4WzBdICsgJ18nICsgc2l6ZSArIHN1ZmZpeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQcm90b2NvbChwYXRoKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL2h0dHAocyk/Oi8sICcnKTtcbn0iLCJpbXBvcnQgcmFkaW8gZnJvbSAnLi4vc2xhdGVyL3JhZGlvLmpzJztcbmltcG9ydCAnLi91dGlsL3NlbGVjdC5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9kdWN0U2VsZWN0aW9uKG5vZGUsIG9wdHMpIHtcbiAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHNlbGVjdDogJ1tkYXRhLW9wdGlvbi1zZWxlY3RdJyxcbiAgICByYWRpbzogJ1tkYXRhLW9wdGlvbi1yYWRpb10nLFxuICAgIG1haW46ICdbZGF0YS1vcHRpb24tbWFpbl0nXG4gIH0sIG9wdHMpO1xuICB2YXIgbGlzdGVuZXJzID0gW107XG4gIHZhciBzdGF0ZSA9IHtcbiAgICBpZDogbnVsbCxcbiAgICBvcHRpb25zOiBbXVxuICB9O1xuICB2YXIgc2VsZWN0cyA9IHNsYXRlci5xc2Eob3B0cy5zZWxlY3QpO1xuICB2YXIgcmFkaW9zID0gc2xhdGVyLnFzYShvcHRzLnJhZGlvKTtcbiAgdmFyIG1haW4gPSBzbGF0ZXIucXMob3B0cy5tYWluKTtcbiAgaWYgKCFtYWluIHx8ICFtYWluLmxlbmd0aCkgdGhyb3cgJ2RhdGEtb3B0aW9uLW1haW4gaXMgbWlzc2luZyc7XG4gIGlmIChyYWRpb3MubGVuZ3RoID4gMykgdGhyb3cgJ3lvdSBoYXZlIG1vcmUgdGhhbiB0aHJlZSByYWRpbyBncm91cHMnO1xuICBpZiAoc2VsZWN0cy5sZW5ndGggPiAzKSB0aHJvdyAneW91IGhhdmUgbW9yZSB0aGFuIHRocmVlIHNlbGVjdCBpbnB1dHMnO1xuICB2YXIgdmFyaWFudHMgPSBbXS5zbGljZS5jYWxsKG1haW4uY2hpbGRyZW4pLnJlZHVjZShmdW5jdGlvbiAodmFyaWFudHMsIGNoaWxkKSB7XG4gICAgdmFyaWFudHNbY2hpbGQuaW5uZXJIVE1MXSA9IGNoaWxkLnZhbHVlO1xuICAgIHJldHVybiB2YXJpYW50cztcbiAgfSwge30pO1xuICBzZWxlY3RzLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3Qubm9kZU5hbWUgIT09ICdTRUxFQ1QnKSB0aHJvdyAnZGF0YS1vcHRpb24tc2VsZWN0IHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBpbmRpdmlkdWFsIG9wdGlvbiBzZWxlY3RvcnMnO1xuICAgIHZhciBpbmRleCA9IHBhcnNlSW50KHNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7IC8vIHNldCBpbml0aWFsIHZhbHVlXG5cbiAgICBzdGF0ZS5vcHRpb25zW2luZGV4XSA9IHNlbGVjdC52YWx1ZTtcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHN0YXRlLm9wdGlvbnNbaW5kZXhdID0gZS50YXJnZXQudmFsdWU7XG4gICAgICB1cGRhdGVTZWxlY3Rpb24oKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJhZGlvcy5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgaWYgKHIubm9kZU5hbWUgPT09ICdJTlBVVCcpIHRocm93ICdkYXRhLW9wdGlvbi1yYWRpbyBzaG91bGQgYmUgZGVmaW5lZCBvbiBhIHBhcmVudCBvZiB0aGUgcmFkaW8gZ3JvdXAsIG5vdCB0aGUgaW5wdXRzIHRoZW1zZWx2ZXMnO1xuICAgIHZhciBpbmRleCA9IHBhcnNlSW50KHIuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xuICAgIHZhciBpbnB1dHMgPSBbXS5zbGljZS5jYWxsKHIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykpOyAvLyBzZXQgaW5pdGlhbCB2YWx1ZVxuXG4gICAgaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKHIpIHtcbiAgICAgIGlmIChyLmNoZWNrZWQpIHN0YXRlLm9wdGlvbnNbaW5kZXhdID0gci52YWx1ZTtcbiAgICB9KTtcbiAgICByYWRpbyhpbnB1dHMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgc3RhdGUub3B0aW9uc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgIHVwZGF0ZVNlbGVjdGlvbigpO1xuICAgIH0pO1xuICB9KTtcbiAgdXBkYXRlU2VsZWN0aW9uKCk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIHN0YXRlLmlkID0gdmFyaWFudHNbc3RhdGUub3B0aW9ucy5qb2luKCcgLyAnKV07XG4gICAgbWFpbi52YWx1ZSA9IHN0YXRlLmlkO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxpc3RlbmVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBmbiA9IGxpc3RlbmVyc1tfaV07XG4gICAgICBmbihzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShmbikge1xuICAgICAgbGlzdGVuZXJzLmluZGV4T2YoZm4pIDwgMCAmJiBsaXN0ZW5lcnMucHVzaChmbik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcnMuaW5kZXhPZihmbiksIDEpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFkaW8ocmFkaW9zLCBjYikge1xuICByYWRpb3MubWFwKGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIHIub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gY2IoZS50YXJnZXQudmFsdWUpO1xuICAgIH07XG4gIH0pO1xufSIsImltcG9ydCBzbGljZWQgZnJvbSAnc2xpY2VkJztcbndpbmRvdy5zbGF0ZXIgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5zbGF0ZXIgfHwge30sIHtcbiAgcXM6IGZ1bmN0aW9uIHFzKHEsIGN0eCkge1xuICAgIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHEpO1xuICB9LFxuICBxc2E6IGZ1bmN0aW9uIHFzYShxLCBjdHgpIHtcbiAgICByZXR1cm4gc2xpY2VkKChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocSkpO1xuICB9LFxuICBnZWJ0bjogZnVuY3Rpb24gZ2VidG4ocSwgY3R4KSB7XG4gICAgcmV0dXJuIHNsaWNlZCgoY3R4IHx8IGRvY3VtZW50KS5nZXRFbGVtZW50c0J5VGFnTmFtZShxKSk7XG4gIH0sXG4gIGdlYmk6IGZ1bmN0aW9uIGdlYmkocSkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChxKTtcbiAgfVxufSk7IiwiLyoqXG4gKiBVdGlsaXR5IGhlbHBlcnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBIGNvbGxlY3Rpb24gb2YgdXNlZnVsIGZ1bmN0aW9ucyBmb3IgZGVhbGluZyB3aXRoIGFycmF5cyBhbmQgb2JqZWN0c1xuICpcbiAqIEBuYW1lc3BhY2UgdXRpbHNcbiAqL1xuXG4vKipcbiAqIFJldHVybiBhbiBvYmplY3QgZnJvbSBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgbWF0Y2hlcyB0aGUgcHJvdmlkZWQga2V5IGFuZCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gQXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIEtleSB0byBtYXRjaCB0aGUgdmFsdWUgYWdhaW5zdFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVmFsdWUgdG8gZ2V0IG1hdGNoIG9mXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5zdGFuY2UoYXJyYXksIGtleSwgdmFsdWUpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJheVtpXVtrZXldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGFycmF5W2ldO1xuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBSZW1vdmUgYW4gb2JqZWN0IGZyb20gYW4gYXJyYXkgb2Ygb2JqZWN0cyBieSBtYXRjaGluZyB0aGUgcHJvdmlkZWQga2V5IGFuZCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gQXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIEtleSB0byBtYXRjaCB0aGUgdmFsdWUgYWdhaW5zdFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVmFsdWUgdG8gZ2V0IG1hdGNoIG9mXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUluc3RhbmNlKGFycmF5LCBrZXksIHZhbHVlKSB7XG4gIHZhciBpID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAoYXJyYXlbaV1ba2V5XSA9PT0gdmFsdWUpIHtcbiAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cbi8qKlxuICogXy5jb21wYWN0IGZyb20gbG9kYXNoXG4gKiBSZW1vdmUgZW1wdHkvZmFsc2UgaXRlbXMgZnJvbSBhcnJheVxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iL21hc3Rlci9jb21wYWN0LmpzXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFjdChhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgdmFyIHJlc0luZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJlc3VsdFtyZXNJbmRleCsrXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIF8uZGVmYXVsdFRvIGZyb20gbG9kYXNoXG4gKiBDaGVja3MgYHZhbHVlYCB0byBkZXRlcm1pbmUgd2hldGhlciBhIGRlZmF1bHQgdmFsdWUgc2hvdWxkIGJlIHJldHVybmVkIGluXG4gKiBpdHMgcGxhY2UuIFRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBgbnVsbGAsXG4gKiBvciBgdW5kZWZpbmVkYC5cbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi9tYXN0ZXIvZGVmYXVsdFRvLmpzXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIERlZmF1bHQgdmFsdWVcbiAqIEByZXR1cm5zIHsqfSAtIFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRUbyh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqSEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNySUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3R0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEZBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=