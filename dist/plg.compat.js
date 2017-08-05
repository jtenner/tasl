(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pegjs"), (function webpackLoadOptionalExternalModule() { try { return require("fs"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["pegjs", "fs"], factory);
	else if(typeof exports === 'object')
		exports["plg"] = factory(require("pegjs"), (function webpackLoadOptionalExternalModule() { try { return require("fs"); } catch(e) {} }()));
	else
		root["plg"] = factory(root["pegjs"], root["fs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Expression');

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Identifier');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('ExpressionList');

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Rule = __webpack_require__(0);
module.exports = Rule('IdentifierList');

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('StatementList');

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function (statements, context) {
  var result = void 0,
      value = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var statement = _step.value;

      var _statement$evaluate = statement.evaluate(context);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (expressions, context) {
  var value = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var expression = _step.value;

      value = expression.evaluate(context);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Identifier = __webpack_require__(3);
var Optional = __webpack_require__(5);
var Rule = __webpack_require__(0);
var Or = __webpack_require__(1);
var ExpressionList = __webpack_require__(4);
module.exports = function (g) {
  return g.addExpression({
    Alias: 'MemberExpression',
    Tokens: {
      root: Identifier,
      path: Optional(Rule('MemberExpressionPathItemList'))
    },
    Handler: function Handler(_ref, context) {
      var root = _ref.root,
          path = _ref.path;

      var target = context[root.value];
      path = path || [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (typeof target === 'undefined') {
            throw new Error('Invalid Access at ' + JSON.stringify(item.location));
          }
          target = target[item.evaluate(context)];
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

      return target;
    }
  }).addList({
    Alias: 'MemberExpressionPathItemList',
    Rule: 'MemberExpressionPathItem'
  }).addCustom({
    Alias: 'MemberExpressionPathItem',
    Tokens: {
      "pathItem": Or(Rule('IdentifierProperty'), Rule('DynamicProperty'))
    },
    Handler: function Handler(_ref2, context) {
      var pathItem = _ref2.pathItem;
      return pathItem.evaluate(context);
    }
  }).addCustom({
    Alias: 'IdentifierProperty',
    Tokens: {
      "dot": '.',
      "pathItem": Identifier
    },
    Handler: function Handler(_ref3) {
      var pathItem = _ref3.pathItem;
      return pathItem.value;
    }
  }).addCustom({
    Alias: 'DynamicProperty',
    Tokens: {
      'openBracket': '[',
      'expressions': ExpressionList,
      'closeBracket': ']'
    },
    Handler: function Handler(_ref4, context) {
      var expressions = _ref4.expressions;

      var value = void 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = expressions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var expression = _step2.value;

          value = expression.evaluate(context);
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
  });
};

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PEG = __webpack_require__(23);
module.exports = function () {
  function Interpreter(grammar, handler) {
    _classCallCheck(this, Interpreter);

    this.grammar = grammar;
    var ex = void 0;
    try {
      __webpack_require__(24).writeFileSync('./grammar.pegjs', this.grammar, 'utf8');
    } catch (ex) {}
    this.parser = PEG.generate(grammar);
    this.parser.handler = handler;
  }

  _createClass(Interpreter, [{
    key: 'evaluate',
    value: function evaluate(text, context) {
      return this.evaluateStatements(this.parser.parse(text), context);
    }
  }, {
    key: 'evaluateStatements',
    value: function evaluateStatements(statements, context) {
      var result = void 0,
          value = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var statement = _step.value;

          var _statement$evaluate = statement.evaluate(context);

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
    value: async function evaluateAsync(text, context) {
      return this.evaluateStatementsAsync(this.parser.parse(text), context);
    }
  }, {
    key: 'evaluateStatementsAsync',
    value: async function evaluateStatementsAsync(statements, context) {
      var result = void 0,
          value = void 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = statements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var statement = _step2.value;

          var _ref = await statement.evaluate(context);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = (_module$exports = {
  addArrayExpressions: __webpack_require__(16),
  addArrowFunctionExpressions: __webpack_require__(17),
  addBooleanExpressions: __webpack_require__(18),
  addGroupingExpressions: __webpack_require__(19),
  addMathExpressions: __webpack_require__(20),
  addMemberExpressions: __webpack_require__(11),
  addObjectExpressions: __webpack_require__(21)
}, _defineProperty(_module$exports, 'addMemberExpressions', __webpack_require__(11)), _defineProperty(_module$exports, 'Current', __webpack_require__(12)), _defineProperty(_module$exports, 'evaluateExpressions', __webpack_require__(10)), _defineProperty(_module$exports, 'evaluateStatements', __webpack_require__(9)), _defineProperty(_module$exports, 'Expression', __webpack_require__(2)), _defineProperty(_module$exports, 'ExpressionList', __webpack_require__(4)), _defineProperty(_module$exports, 'Grammar', __webpack_require__(22)), _defineProperty(_module$exports, 'Identifier', __webpack_require__(3)), _defineProperty(_module$exports, 'IdentifierList', __webpack_require__(7)), _defineProperty(_module$exports, 'Integer', __webpack_require__(26)), _defineProperty(_module$exports, 'Interpreter', __webpack_require__(14)), _defineProperty(_module$exports, 'Literal', __webpack_require__(6)), _defineProperty(_module$exports, 'Next', __webpack_require__(13)), _defineProperty(_module$exports, 'Optional', __webpack_require__(5)), _defineProperty(_module$exports, 'Or', __webpack_require__(1)), _defineProperty(_module$exports, 'RequiredWhitespace', __webpack_require__(27)), _defineProperty(_module$exports, 'Rule', __webpack_require__(0)), _defineProperty(_module$exports, 'Statement', __webpack_require__(28)), _defineProperty(_module$exports, 'StatementList', __webpack_require__(8)), _module$exports);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = __webpack_require__(0);
var Or = __webpack_require__(1);
var Expression = __webpack_require__(2);

module.exports = function (grammar) {
  return grammar.addList({
    Alias: 'ArrayItemList',
    Rule: 'ArrayItem',
    Terminator: ','
  }).addCustom({
    Alias: 'ArrayItem',
    Tokens: {
      "value": Or(Rule('ArraySpread'), Rule('ArrayRange'), Rule('ArrayItemExpression'))
    },
    Handler: function Handler(_ref, context) {
      var value = _ref.value;
      return value.evaluate(context);
    }
  }).addCustom({
    Alias: 'ArraySpread',
    Tokens: {
      'spreadOperator': '...',
      'value': Expression
    },
    Handler: function Handler(_ref2, context) {
      var _ref3;

      var value = _ref2.value;
      return _ref3 = {}, _defineProperty(_ref3, Symbol.for('type'), 'spread'), _defineProperty(_ref3, 'value', value.evaluate(context)), _ref3;
    }
  }).addCustom({
    Alias: 'ArrayRange',
    Tokens: {
      start: Expression,
      'spread': '...',
      end: Expression
    },
    Handler: function Handler(_ref4, context) {
      var _ref5;

      var start = _ref4.start,
          end = _ref4.end;

      start = start.evaluate(context);
      end = end.evaluate(context);
      var result = [];
      for (var i = start; start < end ? i <= end : i >= end; start < end ? i++ : i--) {
        result.push(i);
      }
      return _ref5 = {}, _defineProperty(_ref5, Symbol.for('type'), 'spread'), _defineProperty(_ref5, 'value', result), _ref5;
    }
  }).addCustom({
    Alias: 'ArrayItemExpression',
    Tokens: {
      "expression": Expression
    },
    Handler: function Handler(_ref6, context) {
      var _ref7;

      var expression = _ref6.expression;
      return _ref7 = {}, _defineProperty(_ref7, Symbol.for('type'), 'item'), _defineProperty(_ref7, 'value', expression.evaluate(context)), _ref7;
    }
  }).addExpression({
    Alias: 'ArrayExpression',
    Tokens: {
      "openBrace": "[",
      "expressionList": Rule('ArrayItemList'),
      "closeBrace": "]"
    },
    Handler: function Handler(_ref8, context) {
      var expressionList = _ref8.expressionList;

      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = expressionList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var expression = _step.value;

          var arrayItem = expression.evaluate(context);
          if (arrayItem[Symbol.for('type')] === 'spread') {
            result.push.apply(result, _toConsumableArray(arrayItem.value));
          } else {
            result.push(arrayItem.value);
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

      return result;
    }
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Rule = __webpack_require__(0);
var Or = __webpack_require__(1);
var Identifier = __webpack_require__(3);
var IdentifierList = __webpack_require__(7);
var Optional = __webpack_require__(5);
var StatementList = __webpack_require__(8);
var Expression = __webpack_require__(2);
var evaluateStatements = __webpack_require__(9);
module.exports = function (g) {
  return g.addCustom({
    Alias: 'ArrowFunctionCodeBlock',
    Tokens: {
      "open_brace": "{",
      statements: StatementList,
      "close_brace": "}"
    },
    Handler: function Handler(_ref, context) {
      var statements = _ref.statements;

      return evaluateStatements(statements, context);
    }
  }).addBinaryExpression({
    Alias: 'ArrowFunctionExpression',
    Left: Or(Identifier, Rule("FunctionParameters")),
    Operator: '=>',
    Right: Or(Rule('ArrowFunctionCodeBlock'), Expression),
    Handler: function Handler(_ref2, context) {
      var left = _ref2.left,
          right = _ref2.right;

      var parameterIdentifiers = left ? left.Type === 'Identifier' ? [left] : left : [];
      parameterIdentifiers.map(function (x) {
        return x.value;
      });

      var parentIdentifiers = Object.getOwnPropertyNames(context).filter(function (x) {
        return !parameterIdentifiers.includes(x);
      });
      return function () {
        for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
          parameters[_key] = arguments[_key];
        }

        var newContext = Object.assign({}, context);
        for (var i = 0; i < left.length; i++) {
          newContext[left[i].value] = parameters[i];
        }

        var _right$evaluate = right.evaluate(newContext),
            _right$evaluate2 = _slicedToArray(_right$evaluate, 2),
            result = _right$evaluate2[0],
            value = _right$evaluate2[1];

        parentIdentifiers.forEach(function (x) {
          context[x] = newContext[x];
        });
        return value;
      };
    }
  }).addCustom({
    Alias: 'FunctionParameters',
    Tokens: {
      "open": "(",
      "parameters": Optional(IdentifierList),
      "close": ")"
    },
    Handler: function Handler(_ref3, context) {
      var parameters = _ref3.parameters;

      return parameters;
    }
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (g) {
  return g.addExpression({
    Alias: 'True',
    Tokens: {
      'value': 'true'
    },
    Handler: function Handler() {
      return true;
    }
  }).addExpression({
    Alias: 'False',
    Tokens: {
      'value': 'false'
    },
    Handler: function Handler() {
      return false;
    }
  }).reserve("true", "false");
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ExpressionList = __webpack_require__(4);
module.exports = function (g) {
  return g.addExpression({
    Alias: 'Grouping',
    Tokens: {
      "open": "(",
      "expressions": ExpressionList,
      "close": ")"
    },
    Handler: function Handler(_ref, context) {
      var expressions = _ref.expressions;
      return evaluateExpressions(expressions, context);
    }
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ExpressionList = __webpack_require__(4);
var evaluateExpressions = __webpack_require__(10);
module.exports = function (g) {
  return g.addBinaryExpression({
    Alias: 'Addition',
    Operator: '+',
    Handler: function Handler(_ref, context) {
      var left = _ref.left,
          right = _ref.right;
      return left.evaluate(context) + right.evaluate(context);
    }
  }).addBinaryExpression({
    Alias: 'Subtraction',
    Operator: '-',
    Handler: function Handler(_ref2, context) {
      var left = _ref2.left,
          right = _ref2.right;
      return left.evaluate(context) - right.evaluate(context);
    }
  }).addUnaryExpression({
    Alias: 'Negative',
    Operator: '-',
    Handler: function Handler(_ref3, context) {
      var expression = _ref3.expression;
      return -expression.evaluate(context);
    }
  }).addBinaryExpression({
    Alias: 'Multiplication',
    Operator: '*',
    Handler: function Handler(_ref4) {
      var left = _ref4.left,
          right = _ref4.right;
      return left.evaluate(context) * right.evaluate(context);
    }
  }).addBinaryExpression({
    Alias: 'Division',
    Operator: '/',
    Handler: function Handler(_ref5) {
      var left = _ref5.left,
          right = _ref5.right;
      return left.evaluate(context) / right.evaluate(context);
    }
  }).addBinaryExpression({
    Alias: 'Exponent',
    Operator: '**',
    Handler: function Handler(_ref6) {
      var left = _ref6.left,
          right = _ref6.right;
      return left.evaluate(context) ** right.evaluate(context);
    }
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = __webpack_require__(0);
var Or = __webpack_require__(1);
var Literal = __webpack_require__(6);
var Expression = __webpack_require__(2);
var Identifier = __webpack_require__(3);

module.exports = function (grammar) {
  return grammar.addList({
    Alias: 'ObjectExpressionItemList',
    Rule: 'ObjectExpressionItem',
    Terminator: ','
  }).addCustom({
    Alias: 'ObjectExpressionItem',
    Tokens: {
      "value": Or(Rule('ObjectSpread'), Rule('KeyValuePair'))
    },
    Handler: function Handler(_ref, context) {
      var value = _ref.value;
      return value.evaluate(context);
    }
  }).addCustom({
    Alias: 'ObjectSpread',
    Tokens: {
      'spreadOperator': '...',
      'value': Expression
    },
    Handler: function Handler(_ref2, context) {
      var _ref3;

      var value = _ref2.value;
      return _ref3 = {}, _defineProperty(_ref3, Symbol.for('type'), 'spread'), _defineProperty(_ref3, 'value', value.evaluate(context)), _ref3;
    }
  }).addCustom({
    Alias: 'KeyValuePair',
    Tokens: {
      "key": Identifier,
      "seperator": ":",
      "expression": Expression
    },
    Handler: function Handler(_ref4, context) {
      var _ref5;

      var key = _ref4.key,
          expression = _ref4.expression;
      return _ref5 = {}, _defineProperty(_ref5, Symbol.for('type'), 'keypair'), _defineProperty(_ref5, 'key', key), _defineProperty(_ref5, 'value', expression.evaluate(context)), _ref5;
    }
  }).addExpression({
    Alias: 'ObjectExpression',
    Tokens: {
      "openBrace": "{",
      "expressionList": Rule('ObjectExpressionItemList'),
      "closeBrace": "}"
    },
    Handler: function Handler(_ref6, context) {
      var expressionList = _ref6.expressionList;

      var result = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = expressionList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var expression = _step.value;

          var objectItem = expression.evaluate(context);
          if (objectItem[Symbol.for('type')] === 'spread') {
            Object.assign(result, objectItem.value);
          } else {
            result[objectItem.key.value] = objectItem.value;
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

      return result;
    }
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rule = __webpack_require__(0);
var Next = __webpack_require__(13);
var Current = __webpack_require__(12);
var Literal = __webpack_require__(6);
var Interpreter = __webpack_require__(14);
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
    this.grammar = __webpack_require__(25);
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
        Tokens: {
          "left": options.Left || Next,
          "operator": Literal(options.Operator),
          "right": options.Right || Current
        },
        Type: 'E',
        Handler: options.Handler
      });
    }
  }, {
    key: 'addUnaryExpression',
    value: function addUnaryExpression(options) {
      return this.addRule({
        Alias: options.Alias,
        Tokens: options.Type === 'right' ? { "expression": options.Expression || Next, "operator": Literal(options.Operator) } : { "operator": Literal(options.Operator), "expression": options.Expression || Current },
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

      console.log("adding", Alias);
      this.counts[Type] += 1;
      var Name = '' + Type + this.counts[Type];
      this.handler[Type][Name] = Handler;
      var NextName = '' + Type + (this.counts[Type] + 1);
      this.grammar += '\n' + (Alias ? Alias + ' = ' + Name + '\n' : '') + Name + ' = ' + this.spliceTokens(Tokens, NextName, Name) + ' {\n  return {\n    alias: "' + Alias + '",\n    nodeType: "' + Type + '",\n    type: "' + Name + '",\n    evaluate,\n    props: { ' + Object.getOwnPropertyNames(Tokens).join(', ') + ' },\n    text: text(),\n    location: location()\n  };\n} ' + (Type === 'S' || Type === 'E' ? '/ ' + NextName : '') + '\n';
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
      var entries = Object.entries(Tokens);
      for (var i = 0; i < entries.length; i++) {
        var _entries$i = _slicedToArray(entries[i], 2),
            Key = _entries$i[0],
            Token = _entries$i[1];

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
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_24__ === 'undefined') {var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "{\r\n  const { handler } = this;\r\n\r\n  function evaluate(context) {\r\n    return handler[this.nodeType][this.type](this.props, context);\r\n  }\r\n  handler.S.SExpressionStatement = function SExpressionStatement({ expressions }, context) {\r\n    let value;\r\n    for(const expression of expressions) {\r\n      value = expression.evaluate(context);\r\n    }\r\n    return [null, value];\r\n  };\r\n  handler.E.EReturnValue = function EReturnValue({ value }) { return value; }\r\n}\r\n\r\nProgram = _ statements:StatementList _ {\r\n  return statements;\r\n}\r\n\r\nStatementList = first:Statement last:(_ Statement)* {\r\n  return [first, ...last.map(x => x[1])];\r\n}\r\nExpressionList = first:Expression last:(_ ',' _ Expression)* {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\nIdentifier = !Keyword [a-zA-Z$_][a-zA-Z$_0-9]* {\r\n  return {\r\n    nodeType: 'I',\r\n    type: 'Identifier',\r\n    value: text(),\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\nIdentifierList = first:Identifier last:(_ \",\" _ Identifier) {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\n\r\nStatement = S0\r\nExpression = E0\r\n\r\nExpressionExit = Float\r\n\r\nFloat = [0-9]+ \".\" [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseFloat(text()),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Integer\r\n\r\nInteger = [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseInt(text(), 10),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Null\r\n\r\nNull = \"null\" {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: null,\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\nStatementExit = ExpressionStatement\r\n\r\nExpressionStatement = expressions:ExpressionList _ Terminator? {\r\n  return {\r\n    alias: 'ExpressionStatement',\r\n    nodeType: \"S\",\r\n    type: 'SExpressionStatement',\r\n    evaluate,\r\n    props: { expressions },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\n_ = [\\t\\r\\n ]*\r\n__ = [\\t\\r\\n ]+"

/***/ }),
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)('Statement');

/***/ })
/******/ ]);
});