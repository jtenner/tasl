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
/***/ (function(module, exports) {

module.exports = (Name) => ({
  Type: 'Rule',
  Name,
  generate(Key, NextName) {
    return {
      value: ` ${Key}:${this.Name}`,
      toString() {
        return this.value + " _";
      }
    };
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  type: 'Current',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:${CurrentRule}`,
      toString() {
        return this.value + " _";
      }
    };
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  Type: 'Next',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:${NextRule}`,
      toString() {
        return this.value + " _";
      }
    };
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = (Value, Insensitive = false) => ({
  Type: 'Literal',
  Value,
  Insensitive,
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:"${this.Value.replace(/"/g, '\\"')}"${this.Insensitive ? "i" : ""}`,
      toString() {
        return this.value + " _";
      }
    };
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const PEG = __webpack_require__(13);
module.exports = class Interpreter {
  constructor(grammar, handler) {
    this.grammar = grammar;
    this.parser = PEG.generate(grammar);
    this.parser.handler = handler;
  }
  evaluate(text, ...context) {
    return this.evaluateStatements(this.parser.parse(text), ...context);
  }
  evaluateStatements(statements, ...context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = statement.evaluate(...context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
  async evaluateAsync(text, ...context) {
    return this.evaluateStatementsAsync(this.parser.parse(text), ...context);
  }
  async evaluateStatementsAsync(statements, ...context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = await statement.evaluate(...context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
/***/ (function(module, exports) {

module.exports = (expressions, ...context) => {
  let value;
  for(const expression of expressions) {
    value = expression.evaluate(...context);
  }
  return value;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = async (expressions, ...context) => {
  let result = null;
  for (const expression of expressions) {
    result = await expression.evaluate(...context);
  }
  return result;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = (statements, ...context) => {
  let result, value;
  for(const statement of statements) {
    [result, value] = statement.evaluate(...context);
    if (result === 'return') {
      return [result, value];
    }
  }
  return [null, value];
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = async (statements, ...context) => {
  let result, value;
  for(const statement of statements) {
    [result, value] = await statement.evaluate(...context);
    if (result === 'return') {
      return [result, value];
    }
  }
  return [null, value];
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('Expression');

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('ExpressionList');

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Next = __webpack_require__(2);
const Current = __webpack_require__(1);
const Literal = __webpack_require__(3);
const Interpreter = __webpack_require__(4);
const range = (fr, to) => {
  let result = [];
  for (let i = fr; i <= to; i++) {
    result.push(i);
  }
  return result;
}
module.exports = class Grammar {
  constructor() {
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
  setTerminator(value) {
    this.terminator = value;
    return this;
  }
  addBinaryExpression(options) {
    return this.addRule({
      Alias: options.Alias,
      Tokens: [
        ["left", options.Left || Next],
        ["operator", Literal(options.Operator)],
        ["right", options.Right || Current],
      ],
      Type: 'E',
      Handler: options.Handler
    });
  }
  addUnaryExpression(options) {
    return this.addRule({
      Alias: options.Alias,
      Tokens: options.Type === 'right'
        ? [ ["expression", options.Expression || Next], ["operator", Literal(options.Operator)] ]
        : [ [ "operator", Literal(options.Operator)], ["expression", options.Expression || Current] ],
      Type: 'E',
      Handler: options.Handler
    });
  }
  addExpression(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'E',
      Handler
    });
  }
  addStatement(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'S',
      Handler
    });
  }
  addCustom(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'C',
      Handler
    });
  }
  addRule(options) {
    const { Alias, Tokens, Type, Handler } = options;
    this.counts[Type] += 1;
    const Name = `${Type}${this.counts[Type]}`;
    this.handler[Type][Name] = Handler;
    const NextName = `${Type}${this.counts[Type] + 1}`;
    this.grammar += `
${Alias ? `${Alias} = ${Name}
` : ``}${Name} = ${this.spliceTokens(Tokens, NextName, Name)} {
  return {
    alias: "${Alias}",
    nodeType: "${Type}",
    type: "${Name}",
    evaluate,
    props: { ${Tokens.map(x => x[0]).join(', ')} },
    text: text(),
    location: location()
  };
} ${(Type === 'S' || Type === 'E') ?  `/ ${NextName}` : ``}
`;
    return this;
  }
  addList(options) {
    this.counts.L += 1;
    const ListItemType = `L${this.counts.L}`;
    const TerminatorString = options.Terminator ? `_ "${options.Terminator.replace(/"/g, '\\"')}" ` : ``;
    this.grammar += `
${ListItemType} = ${options.Rule}
${options.Alias} = first:${ListItemType} last:(${TerminatorString} _ ${ListItemType})* ${options.Terminator ? TerminatorString + "?" : ''} {
  return [first, ...last.map(x => x[${options.Terminator ? 3 : 1}])];
}
`;
    return this;
  }
  spliceTokens(Tokens, NextName, CurrentName) {
    let result = '';
    
    for (let i = 0; i < Tokens.length; i++) {
      let [Key, Token] = Tokens[i];
      result += (Token.constructor === String ? Literal(Token) : Token).generate(Key, NextName, CurrentName).toString();
    }
    return result;
  }

  reserve(...keywords) {
    this.keywords.push(...keywords);
    return this;
  }
  generate() {
    this.grammar += `

E${this.counts.E + 1} = ExpressionExit
S${this.counts.S + 1} = StatementExit

${this.keywords.length ? `Keyword = (${this.keywords.map(x => `"${x.replace(/"/g, '\\"')}"`).join(' / ')})` : 'Keyword = "1"'} 
Terminator = "${this.terminator}"
`;

    return new Interpreter(this.grammar, this.handler);
  }
};

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

module.exports = __webpack_require__(0)('Identifier');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
module.exports = Rule('IdentifierList');

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  Type: 'Integer',
  generate(Key, NextRule) {
    return {
      value: ` ${Key}:[0-9]+`,
      toString() {
        return this.value + " _"
      }
    };
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = (Rule) => ({
  Type: 'Optional',
  generate: (Key, NextRule, CurrentRule) => ({
    value: ` ${Key}:(${Rule.generate(Key + "_", NextRule, CurrentRule).value})?`,
    toString() {
      return this.value + " _";
    }
  })
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = (...Tokens) => ({
  type: 'Or',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:(${Tokens.map((x, i) => x.generate(Key + i, NextRule, CurrentRule).value).join(' / ')})`,
      toString() {
        return this.value + " _";
      }
    };
  }
})

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
  Type: 'RequiredWhitespace',
  generate() {
    return {
      toString: () => '_'
    };
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('Statement');

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('StatementList');

/***/ })
/******/ ]);
});