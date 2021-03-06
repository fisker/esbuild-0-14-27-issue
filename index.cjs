var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.mjs
var esbuild_outdent_exports = {};
__export(esbuild_outdent_exports, {
  default: () => esbuild_outdent_default
});
module.exports = __toCommonJS(esbuild_outdent_exports);

// node_modules/outdent/lib-module/index.js
function noop() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
}
function createWeakMap() {
  if (typeof WeakMap !== "undefined") {
    return /* @__PURE__ */ new WeakMap();
  } else {
    return fakeSetOrMap();
  }
}
function fakeSetOrMap() {
  return {
    add: noop,
    delete: noop,
    get: noop,
    set: noop,
    has: function(k) {
      return false;
    }
  };
}
var hop = Object.prototype.hasOwnProperty;
var has = function(obj, prop) {
  return hop.call(obj, prop);
};
function extend(target, source) {
  for (var prop in source) {
    if (has(source, prop)) {
      target[prop] = source[prop];
    }
  }
  return target;
}
var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
  var indentationLevel = 0;
  var match = strings[0].match(reDetectIndentation);
  if (match) {
    indentationLevel = match[1].length;
  }
  var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
  var reMatchIndent = new RegExp(reSource, "g");
  if (firstInterpolatedValueSetsIndentationLevel) {
    strings = strings.slice(1);
  }
  var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
  var normalizeNewlines = typeof newline === "string";
  var l = strings.length;
  var outdentedStrings = strings.map(function(v, i) {
    v = v.replace(reMatchIndent, "$1");
    if (i === 0 && trimLeadingNewline) {
      v = v.replace(reLeadingNewline, "");
    }
    if (i === l - 1 && trimTrailingNewline) {
      v = v.replace(reTrailingNewline, "");
    }
    if (normalizeNewlines) {
      v = v.replace(/\r\n|\n|\r/g, function(_) {
        return newline;
      });
    }
    return v;
  });
  return outdentedStrings;
}
function concatStringsAndValues(strings, values) {
  var ret = "";
  for (var i = 0, l = strings.length; i < l; i++) {
    ret += strings[i];
    if (i < l - 1) {
      ret += values[i];
    }
  }
  return ret;
}
function isTemplateStringsArray(v) {
  return has(v, "raw") && has(v, "length");
}
function createInstance(options) {
  var arrayAutoIndentCache = createWeakMap();
  var arrayFirstInterpSetsIndentCache = createWeakMap();
  function outdent(stringsOrOptions) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      values[_i - 1] = arguments[_i];
    }
    if (isTemplateStringsArray(stringsOrOptions)) {
      var strings = stringsOrOptions;
      var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);
      var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
      var renderedArray = cache.get(strings);
      if (!renderedArray) {
        renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
        cache.set(strings, renderedArray);
      }
      if (values.length === 0) {
        return renderedArray[0];
      }
      var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
      return rendered;
    } else {
      return createInstance(extend(extend({}, options), stringsOrOptions || {}));
    }
  }
  var fullOutdent = extend(outdent, {
    string: function(str) {
      return _outdentArray([str], false, options)[0];
    }
  });
  return fullOutdent;
}
var defaultOutdent = createInstance({
  trimLeadingNewline: true,
  trimTrailingNewline: true
});
if (typeof module !== "undefined") {
  try {
    module.exports = defaultOutdent;
    Object.defineProperty(defaultOutdent, "__esModule", { value: true });
    defaultOutdent.default = defaultOutdent;
    defaultOutdent.outdent = defaultOutdent;
  } catch (e) {
  }
}

// index.mjs
var esbuild_outdent_default = defaultOutdent`1`;
