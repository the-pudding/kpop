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

},{}],"aoZK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBoundingClientRect;

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}
},{}],"NZeX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}
},{}],"Mvmr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScroll;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWindowScroll(node) {
  var win = (0, _getWindow.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
},{"./getWindow.js":"NZeX"}],"DU9q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElement = isElement;
exports.isHTMLElement = isHTMLElement;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */
function isElement(node) {
  var OwnElement = (0, _getWindow.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = (0, _getWindow.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
},{"./getWindow.js":"NZeX"}],"DDDM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTMLElementScroll;

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
},{}],"NvPV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeScroll;

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _instanceOf = require("./instanceOf.js");

var _getHTMLElementScroll = _interopRequireDefault(require("./getHTMLElementScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNodeScroll(node) {
  if (node === (0, _getWindow.default)(node) || !(0, _instanceOf.isHTMLElement)(node)) {
    return (0, _getWindowScroll.default)(node);
  } else {
    return (0, _getHTMLElementScroll.default)(node);
  }
}
},{"./getWindowScroll.js":"Mvmr","./getWindow.js":"NZeX","./instanceOf.js":"DU9q","./getHTMLElementScroll.js":"DDDM"}],"D3rx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeName;

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
},{}],"kmV4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentElement;

var _instanceOf = require("./instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return ((0, _instanceOf.isElement)(element) ? element.ownerDocument : element.document).documentElement;
}
},{"./instanceOf.js":"DU9q"}],"kPg3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindowScrollBarX;

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0, _getBoundingClientRect.default)((0, _getDocumentElement.default)(element)).left + (0, _getWindowScroll.default)(element).scrollLeft;
}
},{"./getBoundingClientRect.js":"aoZK","./getDocumentElement.js":"kmV4","./getWindowScroll.js":"Mvmr"}],"PKLN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComputedStyle;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComputedStyle(element) {
  return (0, _getWindow.default)(element).getComputedStyle(element);
}
},{"./getWindow.js":"NZeX"}],"nxDq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isScrollParent;

var _getComputedStyle2 = _interopRequireDefault(require("./getComputedStyle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0, _getComputedStyle2.default)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
},{"./getComputedStyle.js":"PKLN"}],"dFVF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCompositeRect;

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getNodeScroll = _interopRequireDefault(require("./getNodeScroll.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _instanceOf = require("./instanceOf.js");

var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = (0, _getDocumentElement.default)(offsetParent);
  var rect = (0, _getBoundingClientRect.default)(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (!isFixed) {
    if ((0, _getNodeName.default)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0, _isScrollParent.default)(documentElement)) {
      scroll = (0, _getNodeScroll.default)(offsetParent);
    }

    if ((0, _instanceOf.isHTMLElement)(offsetParent)) {
      offsets = (0, _getBoundingClientRect.default)(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0, _getWindowScrollBarX.default)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
},{"./getBoundingClientRect.js":"aoZK","./getNodeScroll.js":"NvPV","./getNodeName.js":"D3rx","./instanceOf.js":"DU9q","./getWindowScrollBarX.js":"kPg3","./getDocumentElement.js":"kmV4","./isScrollParent.js":"nxDq"}],"gCqr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLayoutRect;

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}
},{}],"zc3n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParentNode;

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParentNode(element) {
  if ((0, _getNodeName.default)(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    (0, _getDocumentElement.default)(element) // fallback

  );
}
},{"./getNodeName.js":"D3rx","./getDocumentElement.js":"kmV4"}],"aaSh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollParent;

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _instanceOf = require("./instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0, _getNodeName.default)(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0, _instanceOf.isHTMLElement)(node) && (0, _isScrollParent.default)(node)) {
    return node;
  }

  return getScrollParent((0, _getParentNode.default)(node));
}
},{"./getParentNode.js":"zc3n","./isScrollParent.js":"nxDq","./getNodeName.js":"D3rx","./instanceOf.js":"DU9q"}],"nG6U":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listScrollParents;

var _getScrollParent = _interopRequireDefault(require("./getScrollParent.js"));

var _getParentNode = _interopRequireDefault(require("./getParentNode.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _isScrollParent = _interopRequireDefault(require("./isScrollParent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0, _getScrollParent.default)(element);
  var isBody = (0, _getNodeName.default)(scrollParent) === 'body';
  var win = (0, _getWindow.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0, _isScrollParent.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0, _getParentNode.default)(target)));
}
},{"./getScrollParent.js":"aaSh","./getParentNode.js":"zc3n","./getNodeName.js":"D3rx","./getWindow.js":"NZeX","./isScrollParent.js":"nxDq"}],"li3E":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTableElement;

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0, _getNodeName.default)(element)) >= 0;
}
},{"./getNodeName.js":"D3rx"}],"Q3nv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetParent;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _instanceOf = require("./instanceOf.js");

var _isTableElement = _interopRequireDefault(require("./isTableElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTrueOffsetParent(element) {
  if (!(0, _instanceOf.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0, _getComputedStyle.default)(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
}

function getOffsetParent(element) {
  var window = (0, _getWindow.default)(element);
  var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

  while (offsetParent && (0, _isTableElement.default)(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (0, _getNodeName.default)(offsetParent) === 'body' && (0, _getComputedStyle.default)(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || window;
}
},{"./getWindow.js":"NZeX","./getNodeName.js":"D3rx","./getComputedStyle.js":"PKLN","./instanceOf.js":"DU9q","./isTableElement.js":"li3E"}],"s4Y9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifierPhases = exports.afterWrite = exports.write = exports.beforeWrite = exports.afterMain = exports.main = exports.beforeMain = exports.afterRead = exports.read = exports.beforeRead = exports.placements = exports.variationPlacements = exports.reference = exports.popper = exports.viewport = exports.clippingParents = exports.end = exports.start = exports.basePlacements = exports.auto = exports.left = exports.right = exports.bottom = exports.top = void 0;
var top = 'top';
exports.top = top;
var bottom = 'bottom';
exports.bottom = bottom;
var right = 'right';
exports.right = right;
var left = 'left';
exports.left = left;
var auto = 'auto';
exports.auto = auto;
var basePlacements = [top, bottom, right, left];
exports.basePlacements = basePlacements;
var start = 'start';
exports.start = start;
var end = 'end';
exports.end = end;
var clippingParents = 'clippingParents';
exports.clippingParents = clippingParents;
var viewport = 'viewport';
exports.viewport = viewport;
var popper = 'popper';
exports.popper = popper;
var reference = 'reference';
exports.reference = reference;
var variationPlacements =
/*#__PURE__*/
basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
exports.variationPlacements = variationPlacements;
var placements =
/*#__PURE__*/
[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

exports.placements = placements;
var beforeRead = 'beforeRead';
exports.beforeRead = beforeRead;
var read = 'read';
exports.read = read;
var afterRead = 'afterRead'; // pure-logic modifiers

exports.afterRead = afterRead;
var beforeMain = 'beforeMain';
exports.beforeMain = beforeMain;
var main = 'main';
exports.main = main;
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

exports.afterMain = afterMain;
var beforeWrite = 'beforeWrite';
exports.beforeWrite = beforeWrite;
var write = 'write';
exports.write = write;
var afterWrite = 'afterWrite';
exports.afterWrite = afterWrite;
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
exports.modifierPhases = modifierPhases;
},{}],"TH6v":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orderModifiers;

var _enums = require("../enums.js");

// source: https://stackoverflow.com/questions/49875255
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
},{"../enums.js":"s4Y9"}],"PMrg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
},{}],"BQ3J":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}
},{}],"S8Lm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateModifiers;

var _format = _interopRequireDefault(require("./format.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];

function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0, _format.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0, _format.default)(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
},{"./format.js":"BQ3J","../enums.js":"s4Y9"}],"LjkP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueBy;

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
},{}],"NQbX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBasePlacement;

var _enums = require("../enums.js");

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
},{"../enums.js":"s4Y9"}],"GQWX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeByName;

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
      options: Object.assign({}, existing.options, {}, current.options),
      data: Object.assign({}, existing.data, {}, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
},{}],"aw71":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  popperGenerator: true,
  createPopper: true
};
exports.popperGenerator = popperGenerator;
exports.createPopper = void 0;

var _getCompositeRect = _interopRequireDefault(require("./dom-utils/getCompositeRect.js"));

var _getLayoutRect = _interopRequireDefault(require("./dom-utils/getLayoutRect.js"));

var _listScrollParents = _interopRequireDefault(require("./dom-utils/listScrollParents.js"));

var _getOffsetParent = _interopRequireDefault(require("./dom-utils/getOffsetParent.js"));

var _getComputedStyle2 = _interopRequireDefault(require("./dom-utils/getComputedStyle.js"));

var _orderModifiers = _interopRequireDefault(require("./utils/orderModifiers.js"));

var _debounce = _interopRequireDefault(require("./utils/debounce.js"));

var _validateModifiers = _interopRequireDefault(require("./utils/validateModifiers.js"));

var _uniqueBy = _interopRequireDefault(require("./utils/uniqueBy.js"));

var _getBasePlacement = _interopRequireDefault(require("./utils/getBasePlacement.js"));

var _mergeByName = _interopRequireDefault(require("./utils/mergeByName.js"));

var _instanceOf = require("./dom-utils/instanceOf.js");

var _enums = require("./enums.js");

Object.keys(_enums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enums[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
        state.scrollParents = {
          reference: (0, _instanceOf.isElement)(reference) ? (0, _listScrollParents.default)(reference) : reference.contextElement ? (0, _listScrollParents.default)(reference.contextElement) : [],
          popper: (0, _listScrollParents.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0, _orderModifiers.default)((0, _mergeByName.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if ("dev" !== "production") {
          var modifiers = (0, _uniqueBy.default)([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0, _validateModifiers.default)(modifiers);

          if ((0, _getBasePlacement.default)(state.options.placement) === _enums.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0, _getComputedStyle2.default)(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if ("dev" !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0, _getCompositeRect.default)(reference, (0, _getOffsetParent.default)(popper), state.options.strategy === 'fixed'),
          popper: (0, _getLayoutRect.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if ("dev" !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0, _debounce.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if ("dev" !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var createPopper =
/*#__PURE__*/
popperGenerator();
exports.createPopper = createPopper;
},{"./dom-utils/getCompositeRect.js":"dFVF","./dom-utils/getLayoutRect.js":"gCqr","./dom-utils/listScrollParents.js":"nG6U","./dom-utils/getOffsetParent.js":"Q3nv","./dom-utils/getComputedStyle.js":"PKLN","./utils/orderModifiers.js":"TH6v","./utils/debounce.js":"PMrg","./utils/validateModifiers.js":"S8Lm","./utils/uniqueBy.js":"LjkP","./utils/getBasePlacement.js":"NQbX","./utils/mergeByName.js":"GQWX","./dom-utils/instanceOf.js":"DU9q","./enums.js":"s4Y9"}],"RKZT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0, _getWindow.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};
exports.default = _default;
},{"../dom-utils/getWindow.js":"NZeX"}],"CCwb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVariation;

function getVariation(placement) {
  return placement.split('-')[1];
}
},{}],"MMWW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMainAxisFromPlacement;

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
},{}],"HXkO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeOffsets;

var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));

var _getVariation = _interopRequireDefault(require("./getVariation.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("./getMainAxisFromPlacement.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0, _getBasePlacement.default)(placement) : null;
  var variation = placement ? (0, _getVariation.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0, _getMainAxisFromPlacement.default)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums.start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case _enums.end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
},{"./getBasePlacement.js":"NQbX","./getVariation.js":"CCwb","./getMainAxisFromPlacement.js":"MMWW","../enums.js":"s4Y9"}],"zN9b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _computeOffsets = _interopRequireDefault(require("../utils/computeOffsets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = (0, _computeOffsets.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};
exports.default = _default;
},{"../utils/computeOffsets.js":"HXkO"}],"nvJu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToStyles = mapToStyles;
exports.default = void 0;

var _enums = require("../enums.js");

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _getWindow = _interopRequireDefault(require("../dom-utils/getWindow.js"));

var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));

var _getComputedStyle = _interopRequireDefault(require("../dom-utils/getComputedStyle.js"));

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums.left;
  var sideY = _enums.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0, _getOffsetParent.default)(popper);

    if (offsetParent === (0, _getWindow.default)(popper)) {
      offsetParent = (0, _getDocumentElement.default)(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === _enums.top) {
      sideY = _enums.bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums.left) {
      sideX = _enums.right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if ("dev" !== "production") {
    var transitionProperty = (0, _getComputedStyle.default)(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0, _getBasePlacement.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};
exports.default = _default;
},{"../enums.js":"s4Y9","../dom-utils/getOffsetParent.js":"Q3nv","../dom-utils/getWindow.js":"NZeX","../dom-utils/getDocumentElement.js":"kmV4","../dom-utils/getComputedStyle.js":"PKLN","../utils/getBasePlacement.js":"NQbX"}],"oeS1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getNodeName = _interopRequireDefault(require("../dom-utils/getNodeName.js"));

var _instanceOf = require("../dom-utils/instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0, _instanceOf.isHTMLElement)(element) || !(0, _getNodeName.default)(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
};
exports.default = _default;
},{"../dom-utils/getNodeName.js":"D3rx","../dom-utils/instanceOf.js":"DU9q"}],"WMRh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distanceAndSkiddingToXY = distanceAndSkiddingToXY;
exports.default = void 0;

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _enums = require("../enums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0, _getBasePlacement.default)(placement);
  var invertDistance = [_enums.left, _enums.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums.left, _enums.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;

  var data = _enums.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});

  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};
exports.default = _default;
},{"../utils/getBasePlacement.js":"NQbX","../enums.js":"s4Y9"}],"ppS9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositePlacement;
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};

function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
},{}],"ZZAx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOppositeVariationPlacement;
var hash = {
  start: 'end',
  end: 'start'
};

function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}
},{}],"Kxef":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getViewportRect;

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getViewportRect(element) {
  var win = (0, _getWindow.default)(element);
  var visualViewport = win.visualViewport;
  var width = win.innerWidth;
  var height = win.innerHeight; // We don't know which browsers have buggy or odd implementations of this, so
  // for now we're only applying it to iOS to fix the keyboard issue.
  // Investigation required

  if (visualViewport && /iPhone|iPod|iPad/.test(navigator.platform)) {
    width = visualViewport.width;
    height = visualViewport.height;
  }

  return {
    width: width,
    height: height,
    x: 0,
    y: 0
  };
}
},{"./getWindow.js":"NZeX"}],"j4i0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocumentRect;

var _getCompositeRect = _interopRequireDefault(require("./getCompositeRect.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getWindowScroll = _interopRequireDefault(require("./getWindowScroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDocumentRect(element) {
  var win = (0, _getWindow.default)(element);
  var winScroll = (0, _getWindowScroll.default)(element);
  var documentRect = (0, _getCompositeRect.default)((0, _getDocumentElement.default)(element), win);
  documentRect.height = Math.max(documentRect.height, win.innerHeight);
  documentRect.width = Math.max(documentRect.width, win.innerWidth);
  documentRect.x = -winScroll.scrollLeft;
  documentRect.y = -winScroll.scrollTop;
  return documentRect;
}
},{"./getCompositeRect.js":"dFVF","./getWindow.js":"NZeX","./getDocumentElement.js":"kmV4","./getWindowScroll.js":"Mvmr"}],"X6Vc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBorders;

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _instanceOf = require("./instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toNumber(cssValue) {
  return parseFloat(cssValue) || 0;
}

function getBorders(element) {
  var computedStyle = (0, _instanceOf.isHTMLElement)(element) ? (0, _getComputedStyle.default)(element) : {};
  return {
    top: toNumber(computedStyle.borderTopWidth),
    right: toNumber(computedStyle.borderRightWidth),
    bottom: toNumber(computedStyle.borderBottomWidth),
    left: toNumber(computedStyle.borderLeftWidth)
  };
}
},{"./getComputedStyle.js":"PKLN","./instanceOf.js":"DU9q"}],"Rmzp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDecorations;

var _getBorders = _interopRequireDefault(require("./getBorders.js"));

var _getNodeName = _interopRequireDefault(require("./getNodeName.js"));

var _getWindow = _interopRequireDefault(require("./getWindow.js"));

var _getWindowScrollBarX = _interopRequireDefault(require("./getWindowScrollBarX.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Borders + scrollbars
function getDecorations(element) {
  var win = (0, _getWindow.default)(element);
  var borders = (0, _getBorders.default)(element);
  var isHTML = (0, _getNodeName.default)(element) === 'html';
  var winScrollBarX = (0, _getWindowScrollBarX.default)(element);
  var x = element.clientWidth + borders.right;
  var y = element.clientHeight + borders.bottom; // HACK:
  // document.documentElement.clientHeight on iOS reports the height of the
  // viewport including the bottom bar, even if the bottom bar isn't visible.
  // If the difference between window innerHeight and html clientHeight is more
  // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
  // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
  //   is about 17px)
  // * The mobile bar is 114px tall

  if (isHTML && win.innerHeight - element.clientHeight > 50) {
    y = win.innerHeight - borders.bottom;
  }

  return {
    top: isHTML ? 0 : element.clientTop,
    right: // RTL scrollbar (scrolling containers only)
    element.clientLeft > borders.left ? borders.right : // LTR scrollbar
    isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
    bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
    left: isHTML ? winScrollBarX : element.clientLeft
  };
}
},{"./getBorders.js":"X6Vc","./getNodeName.js":"D3rx","./getWindow.js":"NZeX","./getWindowScrollBarX.js":"kPg3"}],"SK5r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
},{}],"pcxa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rectToClientRect;

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
},{}],"ulHH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClippingRect;

var _enums = require("../enums.js");

var _getViewportRect = _interopRequireDefault(require("./getViewportRect.js"));

var _getDocumentRect = _interopRequireDefault(require("./getDocumentRect.js"));

var _listScrollParents = _interopRequireDefault(require("./listScrollParents.js"));

var _getOffsetParent = _interopRequireDefault(require("./getOffsetParent.js"));

var _getDocumentElement = _interopRequireDefault(require("./getDocumentElement.js"));

var _getComputedStyle = _interopRequireDefault(require("./getComputedStyle.js"));

var _instanceOf = require("./instanceOf.js");

var _getBoundingClientRect = _interopRequireDefault(require("./getBoundingClientRect.js"));

var _getDecorations = _interopRequireDefault(require("./getDecorations.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _rectToClientRect = _interopRequireDefault(require("../utils/rectToClientRect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums.viewport ? (0, _rectToClientRect.default)((0, _getViewportRect.default)(element)) : (0, _instanceOf.isHTMLElement)(clippingParent) ? (0, _getBoundingClientRect.default)(clippingParent) : (0, _rectToClientRect.default)((0, _getDocumentRect.default)((0, _getDocumentElement.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0, _listScrollParents.default)(element);
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0, _getComputedStyle.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0, _instanceOf.isHTMLElement)(element) ? (0, _getOffsetParent.default)(element) : element;

  if (!(0, _instanceOf.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0, _instanceOf.isElement)(clippingParent) && (0, _contains.default)(clippingParent, clipperElement);
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    var decorations = (0, _getDecorations.default)((0, _instanceOf.isHTMLElement)(clippingParent) ? clippingParent : (0, _getDocumentElement.default)(element));
    accRect.top = Math.max(rect.top + decorations.top, accRect.top);
    accRect.right = Math.min(rect.right - decorations.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left + decorations.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
},{"../enums.js":"s4Y9","./getViewportRect.js":"Kxef","./getDocumentRect.js":"j4i0","./listScrollParents.js":"nG6U","./getOffsetParent.js":"Q3nv","./getDocumentElement.js":"kmV4","./getComputedStyle.js":"PKLN","./instanceOf.js":"DU9q","./getBoundingClientRect.js":"aoZK","./getDecorations.js":"Rmzp","./contains.js":"SK5r","../utils/rectToClientRect.js":"pcxa"}],"yxJo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFreshSideObject;

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
},{}],"jK8Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergePaddingObject;

var _getFreshSideObject = _interopRequireDefault(require("./getFreshSideObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0, _getFreshSideObject.default)(), {}, paddingObject);
}
},{"./getFreshSideObject.js":"yxJo"}],"Y8c7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expandToHashMap;

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
},{}],"eCM7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectOverflow;

var _getBoundingClientRect = _interopRequireDefault(require("../dom-utils/getBoundingClientRect.js"));

var _getClippingRect = _interopRequireDefault(require("../dom-utils/getClippingRect.js"));

var _getDocumentElement = _interopRequireDefault(require("../dom-utils/getDocumentElement.js"));

var _computeOffsets = _interopRequireDefault(require("./computeOffsets.js"));

var _rectToClientRect = _interopRequireDefault(require("./rectToClientRect.js"));

var _enums = require("../enums.js");

var _instanceOf = require("../dom-utils/instanceOf.js");

var _mergePaddingObject = _interopRequireDefault(require("./mergePaddingObject.js"));

var _expandToHashMap = _interopRequireDefault(require("./expandToHashMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements));
  var altContext = elementContext === _enums.popper ? _enums.reference : _enums.popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0, _getClippingRect.default)((0, _instanceOf.isElement)(element) ? element : element.contextElement || (0, _getDocumentElement.default)(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0, _getBoundingClientRect.default)(referenceElement);
  var popperOffsets = (0, _computeOffsets.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0, _rectToClientRect.default)(Object.assign({}, popperRect, {}, popperOffsets));
  var elementClientRect = elementContext === _enums.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums.right, _enums.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums.top, _enums.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
},{"../dom-utils/getBoundingClientRect.js":"aoZK","../dom-utils/getClippingRect.js":"ulHH","../dom-utils/getDocumentElement.js":"kmV4","./computeOffsets.js":"HXkO","./rectToClientRect.js":"pcxa","../enums.js":"s4Y9","../dom-utils/instanceOf.js":"DU9q","./mergePaddingObject.js":"jK8Q","./expandToHashMap.js":"Y8c7"}],"bFxx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeAutoPlacement;

var _getVariation = _interopRequireDefault(require("./getVariation.js"));

var _enums = require("../enums.js");

var _detectOverflow = _interopRequireDefault(require("./detectOverflow.js"));

var _getBasePlacement = _interopRequireDefault(require("./getBasePlacement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums.placements : _options$allowedAutoP;
  var variation = (0, _getVariation.default)(placement);
  var placements = (variation ? flipVariations ? _enums.variationPlacements : _enums.variationPlacements.filter(function (placement) {
    return (0, _getVariation.default)(placement) === variation;
  }) : _enums.basePlacements).filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  }); // $FlowFixMe: Flow seems to have problems with two array unions...

  var overflows = placements.reduce(function (acc, placement) {
    acc[placement] = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0, _getBasePlacement.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
},{"./getVariation.js":"CCwb","../enums.js":"s4Y9","./detectOverflow.js":"eCM7","./getBasePlacement.js":"NQbX"}],"mjM9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getOppositePlacement = _interopRequireDefault(require("../utils/getOppositePlacement.js"));

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getOppositeVariationPlacement = _interopRequireDefault(require("../utils/getOppositeVariationPlacement.js"));

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

var _computeAutoPlacement = _interopRequireDefault(require("../utils/computeAutoPlacement.js"));

var _enums = require("../enums.js");

var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function getExpandedFallbackPlacements(placement) {
  if ((0, _getBasePlacement.default)(placement) === _enums.auto) {
    return [];
  }

  var oppositePlacement = (0, _getOppositePlacement.default)(placement);
  return [(0, _getOppositeVariationPlacement.default)(placement), oppositePlacement, (0, _getOppositeVariationPlacement.default)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0, _getBasePlacement.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0, _getOppositePlacement.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0, _getBasePlacement.default)(placement) === _enums.auto ? (0, _computeAutoPlacement.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0, _getBasePlacement.default)(placement);

    var isStartVariation = (0, _getVariation.default)(placement) === _enums.start;

    var isVertical = [_enums.top, _enums.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0, _detectOverflow.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums.right : _enums.left : isStartVariation ? _enums.bottom : _enums.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    }

    var altVariationSide = (0, _getOppositePlacement.default)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};
exports.default = _default;
},{"../utils/getOppositePlacement.js":"ppS9","../utils/getBasePlacement.js":"NQbX","../utils/getOppositeVariationPlacement.js":"ZZAx","../utils/detectOverflow.js":"eCM7","../utils/computeAutoPlacement.js":"bFxx","../enums.js":"s4Y9","../utils/getVariation.js":"CCwb"}],"YbJK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAltAxis;

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
},{}],"C49z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = within;

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
},{}],"YLS9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("../enums.js");

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));

var _getAltAxis = _interopRequireDefault(require("../utils/getAltAxis.js"));

var _within = _interopRequireDefault(require("../utils/within.js"));

var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

var _getVariation = _interopRequireDefault(require("../utils/getVariation.js"));

var _getFreshSideObject = _interopRequireDefault(require("../utils/getFreshSideObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0, _detectOverflow.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var variation = (0, _getVariation.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var altAxis = (0, _getAltAxis.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? _enums.top : _enums.left;
    var altSide = mainAxis === 'y' ? _enums.bottom : _enums.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0, _getLayoutRect.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0, _getFreshSideObject.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0, _within.default)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && (0, _getOffsetParent.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = (0, _within.default)(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? _enums.top : _enums.left;

    var _altSide = mainAxis === 'x' ? _enums.bottom : _enums.right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = (0, _within.default)(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};
exports.default = _default;
},{"../enums.js":"s4Y9","../utils/getBasePlacement.js":"NQbX","../utils/getMainAxisFromPlacement.js":"MMWW","../utils/getAltAxis.js":"YbJK","../utils/within.js":"C49z","../dom-utils/getLayoutRect.js":"gCqr","../dom-utils/getOffsetParent.js":"Q3nv","../utils/detectOverflow.js":"eCM7","../utils/getVariation.js":"CCwb","../utils/getFreshSideObject.js":"yxJo"}],"oK3a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getBasePlacement = _interopRequireDefault(require("../utils/getBasePlacement.js"));

var _getLayoutRect = _interopRequireDefault(require("../dom-utils/getLayoutRect.js"));

var _contains = _interopRequireDefault(require("../dom-utils/contains.js"));

var _getOffsetParent = _interopRequireDefault(require("../dom-utils/getOffsetParent.js"));

var _getMainAxisFromPlacement = _interopRequireDefault(require("../utils/getMainAxisFromPlacement.js"));

var _within = _interopRequireDefault(require("../utils/within.js"));

var _mergePaddingObject = _interopRequireDefault(require("../utils/mergePaddingObject.js"));

var _expandToHashMap = _interopRequireDefault(require("../utils/expandToHashMap.js"));

var _enums = require("../enums.js");

var _instanceOf = require("../dom-utils/instanceOf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unused-modules
function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0, _getBasePlacement.default)(state.placement);
  var axis = (0, _getMainAxisFromPlacement.default)(basePlacement);
  var isVertical = [_enums.left, _enums.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = (0, _getLayoutRect.default)(arrowElement);
  var minProp = axis === 'y' ? _enums.top : _enums.left;
  var maxProp = axis === 'y' ? _enums.bottom : _enums.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0, _getOffsetParent.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0, _within.default)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if ("dev" !== "production") {
    if (!(0, _instanceOf.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0, _contains.default)(state.elements.popper, arrowElement)) {
    if ("dev" !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: (0, _mergePaddingObject.default)(typeof padding !== 'number' ? padding : (0, _expandToHashMap.default)(padding, _enums.basePlacements))
  };
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};
exports.default = _default;
},{"../utils/getBasePlacement.js":"NQbX","../dom-utils/getLayoutRect.js":"gCqr","../dom-utils/contains.js":"SK5r","../dom-utils/getOffsetParent.js":"Q3nv","../utils/getMainAxisFromPlacement.js":"MMWW","../utils/within.js":"C49z","../utils/mergePaddingObject.js":"jK8Q","../utils/expandToHashMap.js":"Y8c7","../enums.js":"s4Y9","../dom-utils/instanceOf.js":"DU9q"}],"apD2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("../enums.js");

var _detectOverflow = _interopRequireDefault(require("../utils/detectOverflow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums.top, _enums.right, _enums.bottom, _enums.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0, _detectOverflow.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0, _detectOverflow.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var _default = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};
exports.default = _default;
},{"../enums.js":"s4Y9","../utils/detectOverflow.js":"eCM7"}],"jI1K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "popperGenerator", {
  enumerable: true,
  get: function () {
    return _index.popperGenerator;
  }
});
Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () {
    return _detectOverflow.default;
  }
});
exports.defaultModifiers = exports.createPopper = void 0;

var _index = require("./index.js");

var _eventListeners = _interopRequireDefault(require("./modifiers/eventListeners.js"));

var _popperOffsets = _interopRequireDefault(require("./modifiers/popperOffsets.js"));

var _computeStyles = _interopRequireDefault(require("./modifiers/computeStyles.js"));

var _applyStyles = _interopRequireDefault(require("./modifiers/applyStyles.js"));

var _offset = _interopRequireDefault(require("./modifiers/offset.js"));

var _flip = _interopRequireDefault(require("./modifiers/flip.js"));

var _preventOverflow = _interopRequireDefault(require("./modifiers/preventOverflow.js"));

var _arrow = _interopRequireDefault(require("./modifiers/arrow.js"));

var _hide = _interopRequireDefault(require("./modifiers/hide.js"));

var _detectOverflow = _interopRequireDefault(require("./utils/detectOverflow.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultModifiers = [_eventListeners.default, _popperOffsets.default, _computeStyles.default, _applyStyles.default, _offset.default, _flip.default, _preventOverflow.default, _arrow.default, _hide.default];
exports.defaultModifiers = defaultModifiers;
var createPopper =
/*#__PURE__*/
(0, _index.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

exports.createPopper = createPopper;
},{"./index.js":"aw71","./modifiers/eventListeners.js":"RKZT","./modifiers/popperOffsets.js":"zN9b","./modifiers/computeStyles.js":"nvJu","./modifiers/applyStyles.js":"oeS1","./modifiers/offset.js":"WMRh","./modifiers/flip.js":"mjM9","./modifiers/preventOverflow.js":"YLS9","./modifiers/arrow.js":"oK3a","./modifiers/hide.js":"apD2","./utils/detectOverflow.js":"eCM7"}],"DpGZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delegate = delegate;
exports.sticky = exports.roundArrow = exports.inlinePositioning = exports.hideAll = exports.followCursor = exports.createSingleton = exports.animateFill = exports.default = void 0;

var _core = require("@popperjs/core");

/**!
* tippy.js v6.2.3
* (c) 2017-2020 atomiks
* MIT License
*/
var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
exports.roundArrow = ROUND_ARROW;
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}

function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}

function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}

function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}

function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}

function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}

function normalizeToArray(value) {
  return [].concat(value);
}

function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}

function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function arrayFrom(value) {
  return [].slice.call(value);
}

function div() {
  return document.createElement('div');
}

function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}

function isNodeList(value) {
  return isType(value, 'NodeList');
}

function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}

function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}

function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}

function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}

function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}

function getOwnerDocument(elementOrElements) {
  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0];

  return element ? element.ownerDocument || document : document;
}

function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}

function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */


function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */


function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}

function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var ua = isBrowser ? navigator.userAgent : '';
var isIE = /MSIE |Trident\//.test(ua);

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}

function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message


var visitedMessages;

if ("dev" !== "production") {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}

function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}

function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}

function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: function appendTo() {
    return document.body;
  },
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, {}, renderProps);
var defaultKeys = Object.keys(defaultProps);

var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if ("dev" !== "production") {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};

function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, {}, pluginProps);
}

function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}

function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}

function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}

function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}

function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away


render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];

function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(passedProps))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget;
  var doc = getOwnerDocument(props.triggerTarget || reference); // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if ("dev" !== "production") {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function (event) {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      doc.addEventListener('mousemove', debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende; // @ts-ignore


    return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles() {
    popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(void 0, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    doc.body.removeEventListener('mouseleave', scheduleHide);
    doc.removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    } // Clicked on interactive popper


    if (instance.props.interactive && popper.contains(event.target)) {
      return;
    } // Clicked on the event listeners target


    if (getCurrentTarget().contains(event.target)) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      isVisibleFromClick = false;
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = reference.contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = (0, _core.createPopper)(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    createPopperInstance();
    /* istanbul ignore else */

    if ("dev" !== "production") {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance);
      instance.state.isMounted = true;
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles();

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    doc.body.addEventListener('mouseleave', scheduleHide);
    doc.addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if ("dev" !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if ("dev" !== "production") {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if ("dev" !== "production") {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;

var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

exports.hideAll = hideAll;

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }
  /* istanbul ignore else */


  if ("dev" !== "production") {
    errorWhen(!Array.isArray(tippyInstances), ['The first argument passed to createSingleton() must be an array of', 'tippy instances. The passed value was', String(tippyInstances)].join(' '));
  }

  var mutTippyInstances = tippyInstances;
  var references = [];
  var currentTarget;
  var overrides = optionalProps.overrides;

  function setReferences() {
    references = mutTippyInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    mutTippyInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  enableInstances(false);
  setReferences();
  var singleton = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onTrigger: function onTrigger(instance, event) {
          var target = event.currentTarget;
          var index = references.indexOf(target); // bail-out

          if (target === currentTarget) {
            return;
          }

          currentTarget = target;
          var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
            acc[prop] = mutTippyInstances[index].props[prop];
            return acc;
          }, {});
          instance.setProps(Object.assign({}, overrideProps, {
            getReferenceClientRect: function getReferenceClientRect() {
              return target.getBoundingClientRect();
            }
          }));
        }
      };
    }
  };
  var instance = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [singleton].concat(optionalProps.plugins || []),
    triggerTarget: references
  }));
  var originalSetProps = instance.setProps;

  instance.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  instance.setInstances = function (nextInstances) {
    enableInstances(true);
    mutTippyInstances = nextInstances;
    enableInstances(false);
    setReferences();
    instance.setProps({
      triggerTarget: references
    });
  };

  return instance;
};

exports.createSingleton = createSingleton;
var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if ("dev" !== "production") {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({}, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type])) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende; // @ts-ignore


    if (!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy)) {
      if ("dev" !== "production") {
        errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
      }

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};
exports.animateFill = animateFill;

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var initialMouseCoords = null;

    function getIsManual() {
      return instance.props.trigger.trim() === 'manual';
    }

    function getIsEnabled() {
      // #597
      var isValidMouseEvent = getIsManual() ? true : // Check if a keyboard "click"
      initialMouseCoords !== null && !(initialMouseCoords.clientX === 0 && initialMouseCoords.clientY === 0);
      return instance.props.followCursor && isValidMouseEvent;
    }

    function getIsInitialBehavior() {
      return currentInput.isTouch || instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function unsetReferenceClientRect(shouldUnset) {
      if (shouldUnset) {
        instance.setProps({
          getReferenceClientRect: null
        });
      }
    }

    function handleMouseMoveListener() {
      if (getIsEnabled()) {
        addListener();
      } else {
        unsetReferenceClientRect(instance.props.followCursor);
      }
    }

    function triggerLastMouseMove() {
      if (getIsEnabled()) {
        onMouseMove(initialMouseCoords);
      }
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event) {
      initialMouseCoords = {
        clientX: event.clientX,
        clientY: event.clientY
      }; // If the instance is interactive, avoid updating the position unless it's
      // over the reference element

      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }

      if (getIsInitialBehavior()) {
        removeListener();
      }
    }

    return {
      onAfterUpdate: function onAfterUpdate(_, _ref) {
        var followCursor = _ref.followCursor;

        if (followCursor !== undefined && !followCursor) {
          unsetReferenceClientRect(true);
        }
      },
      onMount: function onMount() {
        triggerLastMouseMove();
      },
      onShow: function onShow() {
        if (getIsManual()) {
          // Since there's no trigger event to use, we have to use these as
          // baseline coords
          initialMouseCoords = {
            clientX: 0,
            clientY: 0
          };
          handleMouseMoveListener();
        }
      },
      onTrigger: function onTrigger(_, event) {
        // Tapping on touch devices can trigger `mouseenter` then `focus`
        if (initialMouseCoords) {
          return;
        }

        if (isMouseEvent(event)) {
          initialMouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        handleMouseMoveListener();
      },
      onUntrigger: function onUntrigger() {
        // If untriggered before showing (`onHidden` will never be invoked)
        if (!instance.state.isVisible) {
          removeListener();
          initialMouseCoords = null;
        }
      },
      onHidden: function onHidden() {
        removeListener();
        initialMouseCoords = null;
      }
    };
  }
};
exports.followCursor = followCursor;

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (placement !== state.placement) {
            instance.setProps({
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          cursorRectIndex = rects.indexOf(cursorRect);
        }
      },
      onUntrigger: function onUntrigger() {
        cursorRectIndex = -1;
      }
    };
  }
};
exports.inlinePositioning = inlinePositioning;

function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};
exports.sticky = sticky;

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});
var _default = tippy;
exports.default = _default;
},{"@popperjs/core":"jI1K"}],"d4Ux":[function(require,module,exports) {

},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _linkFix = _interopRequireDefault(require("./utils/link-fix"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

require("intersection-observer");

var _scrollama = _interopRequireDefault(require("scrollama"));

var _tippy2 = _interopRequireWildcard(require("tippy.js"));

require("tippy.js/dist/backdrop.css");

require("tippy.js/animations/shift-away.css");

require("tippy.js/animations/scale-extreme.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var _tippy;

  var tippyImages = {
    "bts": "<img src='https://media.giphy.com/media/3ofT5IUGY3FNyi5MAg/giphy.gif'>",
    "seo": "<img src='https://media.giphy.com/media/YRKlg4ZYNZrhtFGyd8/giphy.gif'>",
    "super": "<img src='https://media.giphy.com/media/l0ErUBWwX9KaSoWnC/giphy.gif'>",
    "girls": "<img src='https://media.giphy.com/media/xTiIzA9hZNM9Ake81i/giphy.gif'>",
    "nct": "<img src='https://media.giphy.com/media/3ohuPG6tSoiaE7m0nK/giphy.gif'>",
    "blackpink": "<img src='https://media.giphy.com/media/fx5Eq1QkybZBYmfq7M/giphy.gif'>",
    "djdoc": "<img src='https://media.giphy.com/media/TKYOjhcoMYUNl6SiE8/giphy.gif'>",
    "yoona": "<img src='https://media.giphy.com/media/3otPoBv5xqC4Za574k/giphy.gif'>",
    "exo": "<img src='https://media.giphy.com/media/3orif6LTloyNnUv8oE/giphy.gif'>",
    "seventeen": "<img src='https://media.giphy.com/media/3o6wr86sMOUaOOHXRS/giphy.gif'>",
    "jayz": "<img src='https://media.giphy.com/media/C0CLctoErM7WE/giphy.gif'>",
    "jungkook": "<img src='https://media.giphy.com/media/SqBnf9Go5I4MhhGU9t/giphy.gif'>",
    "exp": "<img src='https://media.giphy.com/media/PlV6Y75V8b0Bd2krC6/giphy.gif'>"
  };
  d3.selectAll(".tooltip-highlight-gif").attr("data-tippy-content", function (d) {
    var tippyValue = d3.select(this).attr("data-tippy-content");
    return tippyImages[tippyValue];
  }); //set up tooltips

  (0, _tippy2.default)('[data-tippy-content]', (_tippy = {
    allowHTML: true,
    content: 'Global content',
    trigger: 'mouseenter focus',
    duration: [1000, 1000],
    theme: 'vaporwave',
    animation: 'scale-extreme',
    inertia: true,
    animateFill: true,
    plugins: [_tippy2.animateFill],
    maxWidth: 400,
    placement: 'auto'
  }, _defineProperty(_tippy, "placement", 'auto-start'), _defineProperty(_tippy, "placement", 'auto-end'), _defineProperty(_tippy, "touch", ['hold', 500]), _tippy)); //set up legend

  var legend = d3.select('.legend').classed('legend-1', true);
  var legendLabel = legend.append('div').attr('position', 'absolute').attr('stroke', '#333333').attr('height', '100').classed('legend-1', true).classed('legend-label', true);
  var iframe = d3.select('#bars').select('iframe').node(); // var iframe1 = d3.select('#topten').select('iframe').node();

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

    console.log(test);
    console.log(window.innerWidth);

    if (test == 0) {
      legend.classed('legend-2', false);
      legend.classed('legend-3', false);
      legend.classed('legend-1', true);
      legendLabel.classed('legend-2', false);
      legendLabel.classed('legend-3', false);
      legendLabel.classed('legend-1', true);
    }

    if (test == 1) {
      legend.classed('legend-2', true);
      legend.classed('legend-3', false);
      legend.classed('legend-1', false);
      legendLabel.classed('legend-1', false);
      legendLabel.classed('legend-3', false);
      legendLabel.classed('legend-2', true);
    }

    if (test >= 2) {
      legend.classed('legend-2', false);
      legend.classed('legend-1', false);
      legend.classed('legend-3', true);
      legendLabel.classed('legend-2', false);
      legendLabel.classed('legend-1', false);
      legendLabel.classed('legend-3', true);
    }
  }).onStepExit(function (response) {// { element, index, direction }
  }); // const scroller1 = scrollama();
  // // setup the instance, pass callback functions
  // scroller1
  //   .setup({
  //     step: "#topten-text .step",
  //     offset: 0.4,
  //     debug: false
  //   })
  //   .onStepEnter(response => {
  //     var test = response.index
  //     iframe1.src = iframe1.src.replace(/#slide-.*/, "") + "#slide-" + test;
  //     // { element , index , direction }
  //   })
  //   .onStepExit(response => {
  //     console.log(response)
  //     // { element, index, direction }
  //   }); 

  var scroller2 = (0, _scrollama.default)(); // setup the instance, pass callback functions

  scroller2.setup({
    step: "#rankings-text .step",
    offset: 0.5,
    debug: false
  }).onStepEnter(function (response) {
    var test = response.index;
    iframe2.src = iframe2.src.replace(/#slide-.*/, "") + "#slide-" + test; // { element , index , direction }
  }).onStepExit(function (response) {// { element, index, direction }
  }); // load footer stories

  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./utils/link-fix":"U9xJ","./graphic":"TAPd","./footer":"v9Q8","intersection-observer":"CRRU","scrollama":"vL5c","tippy.js":"DpGZ","tippy.js/dist/backdrop.css":"d4Ux","tippy.js/animations/shift-away.css":"d4Ux","tippy.js/animations/scale-extreme.css":"d4Ux"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map