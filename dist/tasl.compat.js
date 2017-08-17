(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pegjs"));
	else if(typeof define === 'function' && define.amd)
		define(["pegjs"], factory);
	else if(typeof exports === 'object')
		exports["tasl"] = factory(require("pegjs"));
	else
		root["tasl"] = factory(root["pegjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (Name) {
  return {
    Type: 'Rule',
    Name: Name,
    generate: function generate(Key, NextName) {
      return {
        value: " " + Key + ":" + this.Name,
        toString: function toString() {
          return this.value + " _";
        }
      };
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  type: 'Current',
  generate: function generate(Key, NextRule, CurrentRule) {
    return {
      value: " " + Key + ":" + CurrentRule,
      toString: function toString() {
        return this.value + " _";
      }
    };
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Type: 'Next',
  generate: function generate(Key, NextRule, CurrentRule) {
    return {
      value: " " + Key + ":" + NextRule,
      toString: function toString() {
        return this.value + " _";
      }
    };
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (Value) {
  var Insensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    Type: 'Literal',
    Value: Value,
    Insensitive: Insensitive,
    generate: function generate(Key, NextRule, CurrentRule) {
      return {
        value: ' ' + Key + ':"' + this.Value.replace(/"/g, '\\"') + '"' + (this.Insensitive ? "i" : ""),
        toString: function toString() {
          return this.value + " _";
        }
      };
    }
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PEG = __webpack_require__(13);
module.exports = function () {
  function Interpreter(grammar, handler) {
    _classCallCheck(this, Interpreter);

    this.grammar = grammar;
    this.parser = PEG.generate(grammar);
    this.parser.handler = handler;
  }

  _createClass(Interpreter, [{
    key: 'evaluate',
    value: function evaluate(text) {
      for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        context[_key - 1] = arguments[_key];
      }

      return this.evaluateStatements.apply(this, [this.parser.parse(text)].concat(context));
    }
  }, {
    key: 'evaluateStatements',
    value: function evaluateStatements(statements) {
      var result = void 0,
          value = void 0;

      for (var _len2 = arguments.length, context = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        context[_key2 - 1] = arguments[_key2];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var statement = _step.value;

          var _statement$evaluate = statement.evaluate.apply(statement, context);

          var _statement$evaluate2 = _slicedToArray(_statement$evaluate, 2);

          result = _statement$evaluate2[0];
          value = _statement$evaluate2[1];

          if (result === 'return') {
            return value;
          }
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

      return value;
    }
  }, {
    key: 'evaluateAsync',
    value: async function evaluateAsync(text) {
      for (var _len3 = arguments.length, context = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        context[_key3 - 1] = arguments[_key3];
      }

      return this.evaluateStatementsAsync.apply(this, [this.parser.parse(text)].concat(context));
    }
  }, {
    key: 'evaluateStatementsAsync',
    value: async function evaluateStatementsAsync(statements) {
      var result = void 0,
          value = void 0;

      for (var _len4 = arguments.length, context = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        context[_key4 - 1] = arguments[_key4];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = statements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var statement = _step2.value;

          var _ref = await statement.evaluate.apply(statement, context);

          var _ref2 = _slicedToArray(_ref, 2);

          result = _ref2[0];
          value = _ref2[1];

          if (result === 'return') {
            return value;
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

      return value;
    }
  }]);

  return Interpreter;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Current: __webpack_require__(1),
  evaluateExpressions: __webpack_require__(6),
  evaluateExpressionsAsync: __webpack_require__(7),
  evaluateStatements: __webpack_require__(8),
  evaluateStatementsAsync: __webpack_require__(9),
  Expression: __webpack_require__(10),
  ExpressionList: __webpack_require__(11),
  Grammar: __webpack_require__(12),
  Identifier: __webpack_require__(15),
  IdentifierList: __webpack_require__(16),
  Integer: __webpack_require__(17),
  Interpreter: __webpack_require__(4),
  Literal: __webpack_require__(3),
  Next: __webpack_require__(2),
  Optional: __webpack_require__(18),
  Or: __webpack_require__(19),
  RequiredWhitespace: __webpack_require__(20),
  Rule: __webpack_require__(0),
  Statement: __webpack_require__(21),
  StatementList: __webpack_require__(22)
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (expressions) {
  for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    context[_key - 1] = arguments[_key];
  }

  var value = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var expression = _step.value;

      value = expression.evaluate.apply(expression, context);
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

  return value;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = async function (expressions) {
  for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    context[_key - 1] = arguments[_key];
  }

  var result = null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var expression = _step.value;

      result = await expression.evaluate.apply(expression, context);
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

  return result;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function (statements) {
  for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    context[_key - 1] = arguments[_key];
  }

  var result = void 0,
      value = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var statement = _step.value;

      var _statement$evaluate = statement.evaluate.apply(statement, context);

      var _statement$evaluate2 = _slicedToArray(_statement$evaluate, 2);

      result = _statement$evaluate2[0];
      value = _statement$evaluate2[1];

      if (result === 'return') {
        return [result, value];
      }
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

  return [null, value];
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = async function (statements) {
  for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    context[_key - 1] = arguments[_key];
  }

  var result = void 0,
      value = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var statement = _step.value;

      var _ref = await statement.evaluate.apply(statement, context);

      var _ref2 = _slicedToArray(_ref, 2);

      result = _ref2[0];
      value = _ref2[1];

      if (result === 'return') {
        return [result, value];
      }
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

  return [null, value];
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Expression');

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('ExpressionList');

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rule = __webpack_require__(0);
var Next = __webpack_require__(2);
var Current = __webpack_require__(1);
var Literal = __webpack_require__(3);
var Interpreter = __webpack_require__(4);
var range = function range(fr, to) {
  var result = [];
  for (var i = fr; i <= to; i++) {
    result.push(i);
  }
  return result;
};
module.exports = function () {
  function Grammar() {
    _classCallCheck(this, Grammar);

    this.counts = {
      E: -1,
      S: -1,
      C: -1,
      L: -1
    };
    this.handler = {
      E: {},
      S: {},
      C: {}
    };
    this.keywords = [];
    this.terminator = ";";
    this.grammar = __webpack_require__(14);
  }

  _createClass(Grammar, [{
    key: 'setTerminator',
    value: function setTerminator(value) {
      this.terminator = value;
      return this;
    }
  }, {
    key: 'addBinaryExpression',
    value: function addBinaryExpression(options) {
      return this.addRule({
        Alias: options.Alias,
        Tokens: [["left", options.Left || Next], ["operator", Literal(options.Operator)], ["right", options.Right || Current]],
        Type: 'E',
        Handler: options.Handler
      });
    }
  }, {
    key: 'addUnaryExpression',
    value: function addUnaryExpression(options) {
      return this.addRule({
        Alias: options.Alias,
        Tokens: options.Type === 'right' ? [["expression", options.Expression || Next], ["operator", Literal(options.Operator)]] : [["operator", Literal(options.Operator)], ["expression", options.Expression || Current]],
        Type: 'E',
        Handler: options.Handler
      });
    }
  }, {
    key: 'addExpression',
    value: function addExpression(options) {
      var Alias = options.Alias,
          Tokens = options.Tokens,
          Handler = options.Handler;

      return this.addRule({
        Alias: Alias,
        Tokens: Tokens,
        Type: 'E',
        Handler: Handler
      });
    }
  }, {
    key: 'addStatement',
    value: function addStatement(options) {
      var Alias = options.Alias,
          Tokens = options.Tokens,
          Handler = options.Handler;

      return this.addRule({
        Alias: Alias,
        Tokens: Tokens,
        Type: 'S',
        Handler: Handler
      });
    }
  }, {
    key: 'addCustom',
    value: function addCustom(options) {
      var Alias = options.Alias,
          Tokens = options.Tokens,
          Handler = options.Handler;

      return this.addRule({
        Alias: Alias,
        Tokens: Tokens,
        Type: 'C',
        Handler: Handler
      });
    }
  }, {
    key: 'addRule',
    value: function addRule(options) {
      var Alias = options.Alias,
          Tokens = options.Tokens,
          Type = options.Type,
          Handler = options.Handler;

      this.counts[Type] += 1;
      var Name = '' + Type + this.counts[Type];
      this.handler[Type][Name] = Handler;
      var NextName = '' + Type + (this.counts[Type] + 1);
      this.grammar += '\n' + (Alias ? Alias + ' = ' + Name + '\n' : '') + Name + ' = ' + this.spliceTokens(Tokens, NextName, Name) + ' {\n  return {\n    alias: "' + Alias + '",\n    nodeType: "' + Type + '",\n    type: "' + Name + '",\n    evaluate,\n    props: { ' + Tokens.map(function (x) {
        return x[0];
      }).join(', ') + ' },\n    text: text(),\n    location: location()\n  };\n} ' + (Type === 'S' || Type === 'E' ? '/ ' + NextName : '') + '\n';
      return this;
    }
  }, {
    key: 'addList',
    value: function addList(options) {
      this.counts.L += 1;
      var ListItemType = 'L' + this.counts.L;
      var TerminatorString = options.Terminator ? '_ "' + options.Terminator.replace(/"/g, '\\"') + '" ' : '';
      this.grammar += '\n' + ListItemType + ' = ' + options.Rule + '\n' + options.Alias + ' = first:' + ListItemType + ' last:(' + TerminatorString + ' _ ' + ListItemType + ')* ' + (options.Terminator ? TerminatorString + "?" : '') + ' {\n  return [first, ...last.map(x => x[' + (options.Terminator ? 3 : 1) + '])];\n}\n';
      return this;
    }
  }, {
    key: 'spliceTokens',
    value: function spliceTokens(Tokens, NextName, CurrentName) {
      var result = '';

      for (var i = 0; i < Tokens.length; i++) {
        var _Tokens$i = _slicedToArray(Tokens[i], 2),
            Key = _Tokens$i[0],
            Token = _Tokens$i[1];

        result += (Token.constructor === String ? Literal(Token) : Token).generate(Key, NextName, CurrentName).toString();
      }
      return result;
    }
  }, {
    key: 'reserve',
    value: function reserve() {
      var _keywords;

      (_keywords = this.keywords).push.apply(_keywords, arguments);
      return this;
    }
  }, {
    key: 'generate',
    value: function generate() {
      this.grammar += '\n\nE' + (this.counts.E + 1) + ' = ExpressionExit\nS' + (this.counts.S + 1) + ' = StatementExit\n\n' + (this.keywords.length ? 'Keyword = (' + this.keywords.map(function (x) {
        return '"' + x.replace(/"/g, '\\"') + '"';
      }).join(' / ') + ')' : 'Keyword = "1"') + ' \nTerminator = "' + this.terminator + '"\n';

      return new Interpreter(this.grammar, this.handler);
    }
  }]);

  return Grammar;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "{\r\n  const { handler } = this;\r\n\r\n  function evaluate(...context) {\r\n    return handler[this.nodeType][this.type](this.props, ...context);\r\n  }\r\n  handler.S.SExpressionStatement = function SExpressionStatement({ expressions }, ...context) {\r\n    let value;\r\n    for(const expression of expressions) {\r\n      value = expression.evaluate(...context);\r\n    }\r\n    return [null, value];\r\n  };\r\n  handler.E.EReturnValue = function EReturnValue({ value }) { return value; }\r\n}\r\n\r\nProgram = _ statements:StatementList _ {\r\n  return statements;\r\n}\r\n\r\nStatementList = first:Statement last:(_ Statement)* {\r\n  return [first, ...last.map(x => x[1])];\r\n}\r\nExpressionList = first:Expression last:(_ ',' _ Expression)* {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\nIdentifier = !Keyword [a-zA-Z$_][a-zA-Z$_0-9]* {\r\n  return {\r\n    nodeType: 'I',\r\n    type: 'Identifier',\r\n    value: text(),\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\nIdentifierList = first:Identifier last:(_ \",\" _ Identifier)* {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\n\r\nStatement = S0\r\nExpression = E0\r\n\r\nExpressionExit = Float\r\n\r\nFloat = [0-9]+ \".\" [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseFloat(text()),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Integer\r\n\r\nInteger = [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseInt(text(), 10),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Null\r\n\r\nNull = \"null\" {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: null,\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\nStatementExit = ExpressionStatement\r\n\r\nExpressionStatement = expressions:ExpressionList _ Terminator? {\r\n  return {\r\n    alias: 'ExpressionStatement',\r\n    nodeType: \"S\",\r\n    type: 'SExpressionStatement',\r\n    evaluate,\r\n    props: { expressions },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\n_ = [\\t\\r\\n ]*\r\n__ = [\\t\\r\\n ]+"

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Identifier');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Rule = __webpack_require__(0);
module.exports = Rule('IdentifierList');

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Type: 'Integer',
  generate: function generate(Key, NextRule) {
    return {
      value: " " + Key + ":[0-9]+",
      toString: function toString() {
        return this.value + " _";
      }
    };
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (Rule) {
  return {
    Type: 'Optional',
    generate: function generate(Key, NextRule, CurrentRule) {
      return {
        value: " " + Key + ":(" + Rule.generate(Key + "_", NextRule, CurrentRule).value + ")?",
        toString: function toString() {
          return this.value + " _";
        }
      };
    }
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  for (var _len = arguments.length, Tokens = Array(_len), _key = 0; _key < _len; _key++) {
    Tokens[_key] = arguments[_key];
  }

  return {
    type: 'Or',
    generate: function generate(Key, NextRule, CurrentRule) {
      return {
        value: ' ' + Key + ':(' + Tokens.map(function (x, i) {
          return x.generate(Key + i, NextRule, CurrentRule).value;
        }).join(' / ') + ')',
        toString: function toString() {
          return this.value + " _";
        }
      };
    }
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Type: 'RequiredWhitespace',
  generate: function generate() {
    return {
      toString: function toString() {
        return '_';
      }
    };
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Statement');

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('StatementList');

/***/ })
/******/ ]);
});