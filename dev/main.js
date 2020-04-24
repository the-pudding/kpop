// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"hZBy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;
exports.selectAll = selectAll;
exports.find = find;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.hasClass = hasClass;
exports.jumpTo = jumpTo;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// DOM helper functions
// public
function select(selector) {
  return document.querySelector(selector);
}

function selectAll(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return _toConsumableArray(parent.querySelectorAll(selector));
}

function find(el, selector) {
  return _toConsumableArray(el.querySelectorAll(selector));
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp("(^|\\b)".concat(className.split(' ').join('|'), "(\\b|$)"), 'gi'), ' ');
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);else el.className = "".concat(el.className, " ").concat(className);
}

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  return new RegExp("(^| )".concat(className, "( |$)"), 'gi').test(el.className);
}

function jumpTo(el, offset) {
  offset = offset || 0;
  var top = el.getBoundingClientRect().top + offset;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var destY = scrollTop + top;
  window.scrollTo(0, destY);
}
},{}],"U9xJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linkFix;

var _dom = require("./dom");

/**
 * Fixes target blanks links
 */
function linkFix() {
  var links = (0, _dom.selectAll)("[target='_blank']");
  links.forEach(function (link) {
    return link.setAttribute("rel", "noopener");
  });
}
},{"./dom":"hZBy"}],"TAPd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* global d3 */
function resize() {}

function init() {
  console.log('Make something awesome!');
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{
  image: "2018_02_stand-up",
  url: "2018/02/stand-up",
  hed: "The Structure of Stand-Up Comedy"
}, {
  image: "2018_04_birthday-paradox",
  url: "2018/04/birthday-paradox",
  hed: "The Birthday Paradox Experiment"
}, {
  image: "2018_11_boy-bands",
  url: "2018/11/boy-bands",
  hed: "Internet Boy Band Database"
}, {
  image: "2018_08_pockets",
  url: "2018/08/pockets",
  hed: "Women’s Pockets are Inferior"
}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName("script")[0];
  var script = document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === "function") {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://pudding.cool/assets/data/stories.json?v=".concat(v);
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  return "\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(d.url, "' target='_blank' rel='noopener'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(d.image, ".jpg' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
}

function recircHTML() {
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join("");
  d3.select(".pudding-footer .footer-recirc__articles").html(html);
}

function init() {
  loadStories(function (data) {
    storyData = data;
    recircHTML();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"CRRU":[function(require,module,exports) {
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());

},{}],"vL5c":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.scrollama = factory());
}(this, (function () { 'use strict';

// DOM helper functions

// public
function selectAll(selector, parent) {
  if ( parent === void 0 ) parent = document;

  if (typeof selector === 'string') {
    return Array.from(parent.querySelectorAll(selector));
  } else if (selector instanceof Element) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return Array.from(selector);
  } else if (selector instanceof Array) {
    return selector;
  }
  return [];
}

function getOffsetId(id) {
  return ("scrollama__debug-offset--" + id);
}

// SETUP
function setupOffset(ref) {
  var id = ref.id;
  var offsetVal = ref.offsetVal;
  var stepClass = ref.stepClass;

  var el = document.createElement("div");
  el.id = getOffsetId(id);
  el.className = "scrollama__debug-offset";
  el.style.position = "fixed";
  el.style.left = "0";
  el.style.width = "100%";
  el.style.height = "0";
  el.style.borderTop = "2px dashed black";
  el.style.zIndex = "9999";

  var p = document.createElement("p");
  p.innerHTML = "\"." + stepClass + "\" trigger: <span>" + offsetVal + "</span>";
  p.style.fontSize = "12px";
  p.style.fontFamily = "monospace";
  p.style.color = "black";
  p.style.margin = "0";
  p.style.padding = "6px";
  el.appendChild(p);
  document.body.appendChild(el);
}

function setup(ref) {
  var id = ref.id;
  var offsetVal = ref.offsetVal;
  var stepEl = ref.stepEl;

  var stepClass = stepEl[0].className;
  setupOffset({ id: id, offsetVal: offsetVal, stepClass: stepClass });
}

// UPDATE
function update(ref) {
  var id = ref.id;
  var offsetMargin = ref.offsetMargin;
  var offsetVal = ref.offsetVal;
  var format = ref.format;

  var post = format === "pixels" ? "px" : "";
  var idVal = getOffsetId(id);
  var el = document.getElementById(idVal);
  el.style.top = offsetMargin + "px";
  el.querySelector("span").innerText = "" + offsetVal + post;
}

function notifyStep(ref) {
  var id = ref.id;
  var index = ref.index;
  var state = ref.state;

  var prefix = "scrollama__debug-step--" + id + "-" + index;
  var elA = document.getElementById((prefix + "_above"));
  var elB = document.getElementById((prefix + "_below"));
  var display = state === "enter" ? "block" : "none";

  if (elA) { elA.style.display = display; }
  if (elB) { elB.style.display = display; }
}

function scrollama() {
  var OBSERVER_NAMES = [
    "stepAbove",
    "stepBelow",
    "stepProgress",
    "viewportAbove",
    "viewportBelow"
  ];

  var cb = {};
  var io = {};

  var id = null;
  var stepEl = [];
  var stepOffsetHeight = [];
  var stepOffsetTop = [];
  var stepStates = [];

  var offsetVal = 0;
  var offsetMargin = 0;
  var viewH = 0;
  var pageH = 0;
  var previousYOffset = 0;
  var progressThreshold = 0;

  var isReady = false;
  var isEnabled = false;
  var isDebug = false;

  var progressMode = false;
  var preserveOrder = false;
  var triggerOnce = false;

  var direction = "down";
  var format = "percent";

  var exclude = [];

  /* HELPERS */
  function err(msg) {
    console.error(("scrollama error: " + msg));
  }

  function reset() {
    cb = {
      stepEnter: function () {},
      stepExit: function () {},
      stepProgress: function () {}
    };
    io = {};
  }

  function generateInstanceID() {
    var a = "abcdefghijklmnopqrstuv";
    var l = a.length;
    var t = Date.now();
    var r = [0, 0, 0].map(function (d) { return a[Math.floor(Math.random() * l)]; }).join("");
    return ("" + r + t);
  }

  function getOffsetTop(el) {
    var ref = el.getBoundingClientRect();
    var top = ref.top;
    var scrollTop = window.pageYOffset;
    var clientTop = document.body.clientTop || 0;
    return top + scrollTop - clientTop;
  }

  function getPageHeight() {
    var body = document.body;
    var html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  function getIndex(element) {
    return +element.getAttribute("data-scrollama-index");
  }

  function updateDirection() {
    if (window.pageYOffset > previousYOffset) { direction = "down"; }
    else if (window.pageYOffset < previousYOffset) { direction = "up"; }
    previousYOffset = window.pageYOffset;
  }

  function disconnectObserver(name) {
    if (io[name]) { io[name].forEach(function (d) { return d.disconnect(); }); }
  }

  function handleResize() {
    viewH = window.innerHeight;
    pageH = getPageHeight();

    var mult = format === "pixels" ? 1 : viewH;
    offsetMargin = offsetVal * mult;

    if (isReady) {
      stepOffsetHeight = stepEl.map(function (el) { return el.getBoundingClientRect().height; });
      stepOffsetTop = stepEl.map(getOffsetTop);
      if (isEnabled) { updateIO(); }
    }

    if (isDebug) { update({ id: id, offsetMargin: offsetMargin, offsetVal: offsetVal, format: format }); }
  }

  function handleEnable(enable) {
    if (enable && !isEnabled) {
      // enable a disabled scroller
      if (isReady) {
        // enable a ready scroller
        updateIO();
      } else {
        // can't enable an unready scroller
        err("scrollama error: enable() called before scroller was ready");
        isEnabled = false;
        return; // all is not well, don't set the requested state
      }
    }
    if (!enable && isEnabled) {
      // disable an enabled scroller
      OBSERVER_NAMES.forEach(disconnectObserver);
    }
    isEnabled = enable; // all is well, set requested state
  }

  function createThreshold(height) {
    var count = Math.ceil(height / progressThreshold);
    var t = [];
    var ratio = 1 / count;
    for (var i = 0; i < count; i += 1) {
      t.push(i * ratio);
    }
    return t;
  }

  /* NOTIFY CALLBACKS */
  function notifyStepProgress(element, progress) {
    var index = getIndex(element);
    if (progress !== undefined) { stepStates[index].progress = progress; }
    var resp = { element: element, index: index, progress: stepStates[index].progress };

    if (stepStates[index].state === "enter") { cb.stepProgress(resp); }
  }

  function notifyOthers(index, location) {
    if (location === "above") {
      // check if steps above/below were skipped and should be notified first
      for (var i = 0; i < index; i += 1) {
        var ss = stepStates[i];
        if (ss.state !== "enter" && ss.direction !== "down") {
          notifyStepEnter(stepEl[i], "down", false);
          notifyStepExit(stepEl[i], "down");
        } else if (ss.state === "enter") { notifyStepExit(stepEl[i], "down"); }
        // else if (ss.direction === 'up') {
        //   notifyStepEnter(stepEl[i], 'down', false);
        //   notifyStepExit(stepEl[i], 'down');
        // }
      }
    } else if (location === "below") {
      for (var i$1 = stepStates.length - 1; i$1 > index; i$1 -= 1) {
        var ss$1 = stepStates[i$1];
        if (ss$1.state === "enter") {
          notifyStepExit(stepEl[i$1], "up");
        }
        if (ss$1.direction === "down") {
          notifyStepEnter(stepEl[i$1], "up", false);
          notifyStepExit(stepEl[i$1], "up");
        }
      }
    }
  }

  function notifyStepEnter(element, dir, check) {
    if ( check === void 0 ) check = true;

    var index = getIndex(element);
    var resp = { element: element, index: index, direction: dir };

    // store most recent trigger
    stepStates[index].direction = dir;
    stepStates[index].state = "enter";
    if (preserveOrder && check && dir === "down") { notifyOthers(index, "above"); }

    if (preserveOrder && check && dir === "up") { notifyOthers(index, "below"); }

    if (cb.stepEnter && !exclude[index]) {
      cb.stepEnter(resp, stepStates);
      if (isDebug) { notifyStep({ id: id, index: index, state: "enter" }); }
      if (triggerOnce) { exclude[index] = true; }
    }

    if (progressMode) { notifyStepProgress(element); }
  }

  function notifyStepExit(element, dir) {
    var index = getIndex(element);
    var resp = { element: element, index: index, direction: dir };

    if (progressMode) {
      if (dir === "down" && stepStates[index].progress < 1)
        { notifyStepProgress(element, 1); }
      else if (dir === "up" && stepStates[index].progress > 0)
        { notifyStepProgress(element, 0); }
    }

    // store most recent trigger
    stepStates[index].direction = dir;
    stepStates[index].state = "exit";

    cb.stepExit(resp, stepStates);
    if (isDebug) { notifyStep({ id: id, index: index, state: "exit" }); }
  }

  /* OBSERVER - INTERSECT HANDLING */
  // this is good for entering while scrolling down + leaving while scrolling up
  function intersectStepAbove(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;

    // bottom = bottom edge of element from top of viewport
    // bottomAdjusted = bottom edge of element from trigger
    var top = boundingClientRect.top;
    var bottom = boundingClientRect.bottom;
    var topAdjusted = top - offsetMargin;
    var bottomAdjusted = bottom - offsetMargin;
    var index = getIndex(target);
    var ss = stepStates[index];

    // entering above is only when topAdjusted is negative
    // and bottomAdjusted is positive
    if (
      isIntersecting &&
      topAdjusted <= 0 &&
      bottomAdjusted >= 0 &&
      direction === "down" &&
      ss.state !== "enter"
    )
      { notifyStepEnter(target, direction); }

    // exiting from above is when topAdjusted is positive and not intersecting
    if (
      !isIntersecting &&
      topAdjusted > 0 &&
      direction === "up" &&
      ss.state === "enter"
    )
      { notifyStepExit(target, direction); }
  }

  // this is good for entering while scrolling up + leaving while scrolling down
  function intersectStepBelow(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;

    // bottom = bottom edge of element from top of viewport
    // bottomAdjusted = bottom edge of element from trigger
    var top = boundingClientRect.top;
    var bottom = boundingClientRect.bottom;
    var topAdjusted = top - offsetMargin;
    var bottomAdjusted = bottom - offsetMargin;
    var index = getIndex(target);
    var ss = stepStates[index];

    // entering below is only when bottomAdjusted is positive
    // and topAdjusted is negative
    if (
      isIntersecting &&
      topAdjusted <= 0 &&
      bottomAdjusted >= 0 &&
      direction === "up" &&
      ss.state !== "enter"
    )
      { notifyStepEnter(target, direction); }

    // exiting from above is when bottomAdjusted is negative and not intersecting
    if (
      !isIntersecting &&
      bottomAdjusted < 0 &&
      direction === "down" &&
      ss.state === "enter"
    )
      { notifyStepExit(target, direction); }
  }

  /*
	if there is a scroll event where a step never intersects (therefore
	skipping an enter/exit trigger), use this fallback to detect if it is
	in view
	*/
  function intersectViewportAbove(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var target = entry.target;
    var index = getIndex(target);
    var ss = stepStates[index];

    if (
      isIntersecting &&
      direction === "down" &&
      ss.direction !== "down" &&
      ss.state !== "enter"
    ) {
      notifyStepEnter(target, "down");
      notifyStepExit(target, "down");
    }
  }

  function intersectViewportBelow(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var target = entry.target;
    var index = getIndex(target);
    var ss = stepStates[index];
    if (
      isIntersecting &&
      direction === "up" &&
      ss.direction === "down" &&
      ss.state !== "enter"
    ) {
      notifyStepEnter(target, "up");
      notifyStepExit(target, "up");
    }
  }

  function intersectStepProgress(ref) {
    var entry = ref[0];

    updateDirection();
    var isIntersecting = entry.isIntersecting;
    var intersectionRatio = entry.intersectionRatio;
    var boundingClientRect = entry.boundingClientRect;
    var target = entry.target;
    var bottom = boundingClientRect.bottom;
    var bottomAdjusted = bottom - offsetMargin;
    if (isIntersecting && bottomAdjusted >= 0) {
      notifyStepProgress(target, +intersectionRatio);
    }
  }

  /*  OBSERVER - CREATION */
  // jump into viewport
  function updateViewportAboveIO() {
    io.viewportAbove = stepEl.map(function (el, i) {
      var marginTop = pageH - stepOffsetTop[i];
      var marginBottom = offsetMargin - viewH - stepOffsetHeight[i];
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectViewportAbove, options);
      obs.observe(el);
      return obs;
    });
  }

  function updateViewportBelowIO() {
    io.viewportBelow = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin - stepOffsetHeight[i];
      var marginBottom = offsetMargin - viewH + stepOffsetHeight[i] + pageH;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectViewportBelow, options);
      obs.observe(el);
      return obs;
    });
  }

  // look above for intersection
  function updateStepAboveIO() {
    io.stepAbove = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin + stepOffsetHeight[i];
      var marginBottom = offsetMargin - viewH;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepAbove, options);
      obs.observe(el);
      return obs;
    });
  }

  // look below for intersection
  function updateStepBelowIO() {
    io.stepBelow = stepEl.map(function (el, i) {
      var marginTop = -offsetMargin;
      var marginBottom = offsetMargin - viewH + stepOffsetHeight[i];
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var options = { rootMargin: rootMargin };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepBelow, options);
      obs.observe(el);
      return obs;
    });
  }

  // progress progress tracker
  function updateStepProgressIO() {
    io.stepProgress = stepEl.map(function (el, i) {
      var marginTop = stepOffsetHeight[i] - offsetMargin;
      var marginBottom = -viewH + offsetMargin;
      var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
      var threshold = createThreshold(stepOffsetHeight[i]);
      var options = { rootMargin: rootMargin, threshold: threshold };
      // console.log(options);
      var obs = new IntersectionObserver(intersectStepProgress, options);
      obs.observe(el);
      return obs;
    });
  }

  function updateIO() {
    OBSERVER_NAMES.forEach(disconnectObserver);

    updateViewportAboveIO();
    updateViewportBelowIO();
    updateStepAboveIO();
    updateStepBelowIO();

    if (progressMode) { updateStepProgressIO(); }
  }

  /* SETUP FUNCTIONS */

  function indexSteps() {
    stepEl.forEach(function (el, i) { return el.setAttribute("data-scrollama-index", i); });
  }

  function setupStates() {
    stepStates = stepEl.map(function () { return ({
      direction: null,
      state: null,
      progress: 0
    }); });
  }

  function addDebug() {
    if (isDebug) { setup({ id: id, stepEl: stepEl, offsetVal: offsetVal }); }
  }

  function isYScrollable(element) {
    var style = window.getComputedStyle(element);
    return (
      (style.overflowY === "scroll" || style.overflowY === "auto") &&
      element.scrollHeight > element.clientHeight
    );
  }

  // recursively search the DOM for a parent container with overflowY: scroll and fixed height
  // ends at document
  function anyScrollableParent(element) {
    if (element && element.nodeType === 1) {
      // check dom elements only, stop at document
      // if a scrollable element is found return the element
      // if not continue to next parent
      return isYScrollable(element)
        ? element
        : anyScrollableParent(element.parentNode);
    }
    return false; // didn't find a scrollable parent
  }

  var S = {};

  S.setup = function (ref) {
    var step = ref.step;
    var offset = ref.offset; if ( offset === void 0 ) offset = 0.5;
    var progress = ref.progress; if ( progress === void 0 ) progress = false;
    var threshold = ref.threshold; if ( threshold === void 0 ) threshold = 4;
    var debug = ref.debug; if ( debug === void 0 ) debug = false;
    var order = ref.order; if ( order === void 0 ) order = true;
    var once = ref.once; if ( once === void 0 ) once = false;

    reset();
    // create id unique to this scrollama instance
    id = generateInstanceID();

    stepEl = selectAll(step);

    if (!stepEl.length) {
      err("no step elements");
      return S;
    }

    // ensure that no step has a scrollable parent element in the dom tree
    // check current step for scrollable parent
    // assume no scrollable parents to start
    var scrollableParent = stepEl.reduce(
      function (foundScrollable, s) { return foundScrollable || anyScrollableParent(s.parentNode); },
      false
    );
    if (scrollableParent) {
      console.error(
        "scrollama error: step elements cannot be children of a scrollable element. Remove any css on the parent element with overflow: scroll; or overflow: auto; on elements with fixed height.",
        scrollableParent
      );
    }

    // options
    isDebug = debug;
    progressMode = progress;
    preserveOrder = order;
    triggerOnce = once;

    S.offsetTrigger(offset);
    progressThreshold = Math.max(1, +threshold);

    isReady = true;

    // customize
    addDebug();
    indexSteps();
    setupStates();
    handleResize();
    S.enable();
    return S;
  };

  S.resize = function () {
    handleResize();
    return S;
  };

  S.enable = function () {
    handleEnable(true);
    return S;
  };

  S.disable = function () {
    handleEnable(false);
    return S;
  };

  S.destroy = function () {
    handleEnable(false);
    reset();
  };

  S.offsetTrigger = function (x) {
    if (x === null) { return offsetVal; }

    if (typeof x === "number") {
      format = "percent";
      if (x > 1) { err("offset value is greater than 1. Fallback to 1."); }
      if (x < 0) { err("offset value is lower than 0. Fallback to 0."); }
      offsetVal = Math.min(Math.max(0, x), 1);
    } else if (typeof x === "string" && x.indexOf("px") > 0) {
      var v = +x.replace("px", "");
      if (!isNaN(v)) {
        format = "pixels";
        offsetVal = v;
      } else {
        err("offset value must be in 'px' format. Fallback to 0.5.");
        offsetVal = 0.5;
      }
    } else {
      err("offset value does not include 'px'. Fallback to 0.5.");
      offsetVal = 0.5;
    }
    return S;
  };

  S.onStepEnter = function (f) {
    if (typeof f === "function") { cb.stepEnter = f; }
    else { err("onStepEnter requires a function"); }
    return S;
  };

  S.onStepExit = function (f) {
    if (typeof f === "function") { cb.stepExit = f; }
    else { err("onStepExit requires a function"); }
    return S;
  };

  S.onStepProgress = function (f) {
    if (typeof f === "function") { cb.stepProgress = f; }
    else { err("onStepProgress requires a function"); }
    return S;
  };

  return S;
}

return scrollama;

})));

},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _linkFix = _interopRequireDefault(require("./utils/link-fix"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

require("intersection-observer");

var _scrollama = _interopRequireDefault(require("scrollama"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select("body");
var previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStickyHeader() {
  var $header = $body.select("header");

  if ($header.classed("is-sticky")) {
    var $menu = $body.select(".header__menu");
    var $toggle = $body.select(".header__toggle");
    $toggle.on("click", function () {
      var visible = $menu.classed("is-visible");
      $menu.classed("is-visible", !visible);
      $toggle.classed("is-visible", !visible);
    });
  }
}

function init() {
  var iframe = d3.select('#bars').select('iframe').node();
  var iframe1 = d3.select('#topten').select('iframe').node();
  var iframe2 = d3.select('#rankings').select('iframe').node(); // var input = document.querySelector("#my-input");
  // input.addEventListener("change", function(e) {
  // var iframe = document.querySelector("#my-story iframe");
  // adds rel="noopener" to all target="_blank" links

  (0, _linkFix.default)(); // add mobile class to body tag

  $body.classed("is-mobile", _isMobile.default.any()); // setup resize event

  window.addEventListener("resize", (0, _lodash.default)(resize, 150)); // setup sticky header menu

  setupStickyHeader(); // instantiate the scrollama

  var scroller = (0, _scrollama.default)(); // setup the instance, pass callback functions

  scroller.setup({
    step: "#bars-text .step",
    offset: 0.4,
    debug: false
  }).onStepEnter(function (response) {
    var test = response.index;
    iframe.src = iframe.src.replace(/#slide-.*/, "") + "#slide-" + test; // { element , index , direction }
  }).onStepExit(function (response) {// { element, index, direction }
  });
  var scroller1 = (0, _scrollama.default)(); // setup the instance, pass callback functions

  scroller1.setup({
    step: "#topten-text .step",
    offset: 0.4,
    debug: false
  }).onStepEnter(function (response) {
    var test = response.index;
    iframe1.src = iframe1.src.replace(/#slide-.*/, "") + "#slide-" + test; // { element , index , direction }
  }).onStepExit(function (response) {
    console.log(response); // { element, index, direction }
  });
  var scroller2 = (0, _scrollama.default)(); // setup the instance, pass callback functions

  scroller2.setup({
    step: "#rankings-text .step",
    offset: 0.4,
    debug: false
  }).onStepEnter(function (response) {
    var test = response.index;
    iframe2.src = iframe2.src.replace(/#slide-.*/, "") + "#slide-" + test; // { element , index , direction }
  }).onStepExit(function (response) {// { element, index, direction }
  }); // load footer stories

  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./utils/link-fix":"U9xJ","./graphic":"TAPd","./footer":"v9Q8","intersection-observer":"CRRU","scrollama":"vL5c"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map