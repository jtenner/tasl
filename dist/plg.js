(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pegjs"), (function webpackLoadOptionalExternalModule() { try { return require("fs"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["pegjs", "fs"], factory);
	else if(typeof exports === 'object')
		exports["plg"] = factory(require("pegjs"), (function webpackLoadOptionalExternalModule() { try { return require("fs"); } catch(e) {} }()));
	else
		root["plg"] = factory(root["pegjs"], root["fs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_30__) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('Expression');

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('ExpressionList');

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('Identifier');

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('StatementList');

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = (statements, context) => {
  let result, value;
  for(const statement of statements) {
    [result, value] = statement.evaluate(context);
    if (result === 'return') {
      return [result, value];
    }
  }
  return [null, value];
};

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
module.exports = Rule('IdentifierList');

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0)('Statement');

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = (expressions, context) => {
  let value;
  for(const expression of expressions) {
    value = expression.evaluate(context);
  }
  return value;
}

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const PEG = __webpack_require__(29);
module.exports = class Interpreter {
  constructor(grammar, handler) {
    this.grammar = grammar;
    let ex;
    try {
      __webpack_require__(30).writeFileSync('./grammar.pegjs', this.grammar, 'utf8');
    } catch (ex) {

    }
    this.parser = PEG.generate(grammar);
    this.parser.handler = handler;
  }
  evaluate(text, context) {
    return this.evaluateStatements(this.parser.parse(text), context);
  }
  evaluateStatements(statements, context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = statement.evaluate(context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
  async evaluateAsync(text, context) {
    return this.evaluateStatementsAsync(this.parser.parse(text), context);
  }
  async evaluateStatementsAsync(statements, context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = await statement.evaluate(context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  addArrayExpressions: __webpack_require__(16),
  addArrowFunctionExpressions: __webpack_require__(17),
  addAssignmentExpression: __webpack_require__(18),
  addBooleanExpressions: __webpack_require__(19),
  addGroupingExpressions: __webpack_require__(20),
  addIfStatements: __webpack_require__(21),
  addMathExpressions: __webpack_require__(22),
  addMemberExpressions: __webpack_require__(23),
  addObjectExpressions: __webpack_require__(24),
  addTransformExpressions: __webpack_require__(25),
  Current: __webpack_require__(13),
  evaluateExpressions: __webpack_require__(12),
  evaluateExpressionsAsync: __webpack_require__(26),
  evaluateStatements: __webpack_require__(8),
  evaluateStatementsAsync: __webpack_require__(27),
  Expression: __webpack_require__(2),
  ExpressionList: __webpack_require__(4),
  Grammar: __webpack_require__(28),
  Identifier: __webpack_require__(5),
  IdentifierList: __webpack_require__(10),
  Integer: __webpack_require__(32),
  Interpreter: __webpack_require__(14),
  Literal: __webpack_require__(6),
  Next: __webpack_require__(9),
  Optional: __webpack_require__(3),
  Or: __webpack_require__(1),
  RequiredWhitespace: __webpack_require__(33),
  Rule: __webpack_require__(0),
  Statement: __webpack_require__(11),
  StatementList: __webpack_require__(7)
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Or = __webpack_require__(1);
const Expression = __webpack_require__(2);

module.exports = (grammar) => grammar.addList({
  Alias: 'ArrayItemList',
  Rule: 'ArrayItem',
  Terminator: ',',
})
.addCustom({
  Alias: 'ArrayItem',
  Tokens: [
    ["value", Or(Rule('ArraySpread'), Rule('ArrayRange'), Rule('ArrayItemExpression'))]
  ],
  Handler: ({ value }, context) => value.evaluate(context)
})
.addCustom({
  Alias: 'ArraySpread',
  Tokens: [
    ['spreadOperator', '...'],
    ['value', Expression]
  ],
  Handler: ({ value }, context) => ({ [Symbol.for('type')]: 'spread', value: value.evaluate(context) })
})
.addCustom({
  Alias: 'ArrayRange',
  Tokens: [
    ["start", Expression],
    ['spread', '...'],
    ["end", Expression]
  ],
  Handler: ({ start, end }, context) => {
    start = start.evaluate(context);
    end = end.evaluate(context);
    let result = [];
    for (let i = start; start < end ? i <= end : i >= end; start < end ? i++ : i--) {
       result.push(i);
    }
    return { [Symbol.for('type')]: 'spread', value: result };
  }
})
.addCustom({
  Alias: 'ArrayItemExpression',
  Tokens: [
    ["expression", Expression],
  ],
  Handler: ({ expression }, context) => ({ [Symbol.for('type')]: 'item', value: expression.evaluate(context) })
})
.addExpression({
  Alias: 'ArrayExpression',
  Tokens: [
    ["openBrace", "["],
    ["expressionList", Rule('ArrayItemList')],
    ["closeBrace", "]"]
  ],
  Handler: ({ expressionList }, context) => {
    let result = [];
    for (const expression of expressionList) {
      const arrayItem = expression.evaluate(context);
      if (arrayItem[Symbol.for('type')] === 'spread') {
        result.push(...arrayItem.value);
      } else {
        result.push(arrayItem.value);
      }
    }
    return result;
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Or = __webpack_require__(1);
const Identifier = __webpack_require__(5);
const IdentifierList = __webpack_require__(10);
const Optional = __webpack_require__(3);
const StatementList = __webpack_require__(7);
const Expression = __webpack_require__(2);
const evaluateStatements = __webpack_require__(8);
module.exports = (g) => g
.addCustom({
  Alias: 'ArrowFunctionCodeBlock',
  Tokens: [
    ["open_brace", "{"],
    ["statements", StatementList],
    ["close_brace", "}"]
  ],
  Handler: ({ statements }, context) => {
    return evaluateStatements(statements, context);
  }
})
.addBinaryExpression({
  Alias: 'ArrowFunctionExpression',
  Left: Or(Identifier, Rule("FunctionParameters")),
  Operator: '=>',
  Right: Or(Rule('ArrowFunctionCodeBlock'), Expression),
  Handler: ({ left, right }, context)  => {
    let parameterIdentifiers =  left
      ? (left.Type === 'Identifier' ? [left] : left)
      : [];
    parameterIdentifiers.map(x => x.value);

    let parentIdentifiers = Object.getOwnPropertyNames(context).filter(
      x => !parameterIdentifiers.includes(x)
    );
    return (...parameters) => {
      let newContext = Object.assign({}, context);
      for (let i = 0; i < left.length; i++) {
        newContext[left[i].value] = parameters[i];
      }
      const [result, value] = right.evaluate(newContext);
      parentIdentifiers.forEach(x => { context[x] = newContext[x]; });
      return value;
    };
  }
})
.addCustom({
  Alias: 'FunctionParameters',
  Tokens: [
    ["open", "("],
    ["parameters", Optional(IdentifierList)],
    ["close", ")"]
  ],
  Handler: ({ parameters, }, context) => {
    return parameters;
  }
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
module.exports = (g) => g.addBinaryExpression({
  Alias: 'AssignmentExpression',
  Left: Rule('MemberExpression'),
  Operator: '=',
  Handler: ({ left, right }, context) => {
    let target = context, key;
    const { root, path } = left.props;
    const targetPath = [root, ...(path || [])];
    const InvalidMemberPathError = new Error(`Invalid member path: ${left.text} at ${JSON.stringify(left.location)}`);


    for (let i = 0; i < targetPath.length - 2; i++) {
      key = targetPath[i].type === 'Identifier'
        ? targetPath[i].value
        : targetPath[i].evaluate(context);
      if (target.hasOwnProperty(key)) {
        target = target[key];
      } else {
        throw InvalidMemberPathError;
      }
    }
    const lastPath = targetPath[targetPath.length - 1];
    key = lastPath.type === 'Identifier'
      ? lastPath.value
      : lastPath.evaluate(context);
    if (target.hasOwnProperty(key)) {
      return target[key] = right.evaluate(context);
    }
    throw InvalidMemberPathError;
  }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Or = __webpack_require__(1);
const Literal = __webpack_require__(6);
module.exports = g => g
  .addUnaryExpression({
    Alias: 'Not',
    Operator: '!',
    Handler: ({ expression }, context) => !expression.evaluate(context)
  })
  .addExpression({
    Alias: 'Boolean',
    Tokens: [
      ['value', Or(Literal('true'), Literal('false'))]
    ],
    Handler: ({ value }) => value === "true"
  })
  .reserve("true", "false")

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const ExpressionList = __webpack_require__(4);
module.exports = g => g
  .addExpression({
    Alias: 'Grouping',
    Tokens: [
      ["open", "("],
      ["expressions", ExpressionList],
      ["close", ")"]
    ],
    Handler: ({ expressions }, context) => evaluateExpressions(expressions, context)
  })

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Expression = __webpack_require__(2);
const StatementList = __webpack_require__(7);
const Or = __webpack_require__(1);
const evaluateStatements = __webpack_require__(8);
const Optional = __webpack_require__(3);
const Statement = __webpack_require__(11);
module.exports = (g) =>
  g.addStatement({
    Alias: 'IfStatement',
    Tokens: [
      ["ifKeyword", 'if'],
      ["open", "("],
      ["conditional", Expression],
      ["close", ")"],
      ["block", Or(Statement, Rule('IfCodeBlock'))],
      ["elseBlock", Optional(Rule('ElseIfBlock'))]
    ],
    Handler: ({ conditional, block, elseBlock }, context) => {
      if (conditional.evaluate(context)) {
        return block.evaluate(context);
      } else {
        return elseBlock.evaluate(context);
      }
    }
  })
  .addCustom({
    Alias: 'IfCodeBlock',
    Tokens: [['open', '{'], ['statements', StatementList], ['close', '}']],
    Handler: ({ statements }, context) => evaluateStatements(statements, context)
  })
  .addCustom({
    Alias: 'ElseIfBlock',
    Tokens: [
      ['elseKeyword', 'else'],
      ['block', Or(Rule('IfStatement'), Rule('IfCodeBlock'))]
    ],
    Handler: ({ block }, context) => block.evaluate(context)
  })
  .reserve('if', 'else')


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const ExpressionList = __webpack_require__(4);
const evaluateExpressions = __webpack_require__(12);
module.exports = (g) => g
  .addBinaryExpression({
    Alias: 'Addition',
    Operator: '+',
    Handler: ({left, right}, context) => left.evaluate(context) + right.evaluate(context)
  })
  .addBinaryExpression({
    Alias: 'Subtraction',
    Operator: '-',
    Handler: ({ left, right }, context) => left.evaluate(context) - right.evaluate(context)
  })
  .addUnaryExpression({
    Alias: 'Negative',
    Operator: '-',
    Handler: ({ expression }, context) => -expression.evaluate(context)
  })
  .addBinaryExpression({
    Alias: 'Multiplication',
    Operator: '*',
    Handler: ({ left, right }) => left.evaluate(context) * right.evaluate(context)
  })
  .addBinaryExpression({
    Alias: 'Division',
    Operator: '/',
    Handler: ({ left, right }) => left.evaluate(context) / right.evaluate(context)
  })
  .addBinaryExpression({
    Alias: 'Exponent',
    Operator: '**',
    Handler: ({ left, right }) => left.evaluate(context) ** right.evaluate(context)
  })

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Identifier = __webpack_require__(5);
const Optional = __webpack_require__(3);
const Rule = __webpack_require__(0);
const Or = __webpack_require__(1);
const ExpressionList = __webpack_require__(4);
module.exports = (g) => g
  .addExpression({
    Alias: 'MemberExpression',
    Tokens: [
      ["root", Identifier],
      ["path", Optional(Rule('MemberExpressionPathItemList'))]
    ],
    Handler: ({ root, path }, context) => {
      let target = context[root.value];
      path = path || [];
      for (const item of path) {
        if (typeof target === 'undefined') {
          throw new Error('Invalid Access at ' + JSON.stringify(item.location));
        }
        target = target[item.evaluate(context)];
      }
      return target;
    },
  })
  .addList({
    Alias: 'MemberExpressionPathItemList',
    Rule: 'MemberExpressionPathItem',
  })
  .addCustom({
    Alias: 'MemberExpressionPathItem',
    Tokens: [["pathItem", Or(Rule('IdentifierProperty'), Rule('DynamicProperty'))]],
    Handler: ({ pathItem }, context) => pathItem.evaluate(context)
  })
  .addCustom({
    Alias: 'IdentifierProperty',
    Tokens: [["dot", '.'], ["pathItem", Identifier]],
    Handler: ({ pathItem }) => pathItem.value
  })
  .addCustom({
    Alias: 'DynamicProperty',
    Tokens: [
      ['openBracket', '['],
      ['expressions', ExpressionList],
      ['closeBracket', ']']
    ],
    Handler: ({ expressions }, context) => {
      let value;
      for(const expression of expressions) {
        value = expression.evaluate(context);
      }
      return value;
    }
  })



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Or = __webpack_require__(1);
const Literal = __webpack_require__(6);
const Expression = __webpack_require__(2);
const Identifier = __webpack_require__(5);

module.exports = (grammar) => grammar.addList({
  Alias: 'ObjectExpressionItemList',
  Rule: 'ObjectExpressionItem',
  Terminator: ',',
})
.addCustom({
  Alias: 'ObjectExpressionItem',
  Tokens: [
    ["value", Or(Rule('ObjectSpread'), Rule('KeyValuePair'))]
  ],
  Handler: ({ value }, context) => value.evaluate(context)
})
.addCustom({
  Alias: 'ObjectSpread',
  Tokens: [['spreadOperator', '...'], ['value', Expression]],
  Handler: ({ value }, context) => ({ [Symbol.for('type')]: 'spread', value: value.evaluate(context) })
})
.addCustom({
  Alias: 'KeyValuePair',
  Tokens: [["key", Identifier], ["seperator", ":"], ["expression", Expression]],
  Handler: ({ key, expression }, context) => ({ [Symbol.for('type')]: 'keypair', key, value: expression.evaluate(context) })
})
.addExpression({
  Alias: 'ObjectExpression',
  Tokens: [
    ["openBrace", "{"],
    ["expressionList", Rule('ObjectExpressionItemList')],
    ["closeBrace", "}"]
  ],
  Handler: ({ expressionList }, context) => {
    let result = {};
    for (const expression of expressionList) {
      const objectItem = expression.evaluate(context);
      if (objectItem[Symbol.for('type')] === 'spread') {
        Object.assign(result, objectItem.value);
      } else {
        result[objectItem.key.value] = objectItem.value;
      }
    }
    return result;
  }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Next = __webpack_require__(9);
const Optional = __webpack_require__(3);
const ExpressionList = __webpack_require__(4);

module.exports = (g) => g.addExpression({
  Alias: 'Transform',
  Tokens: [
    ["left", Next],
    ["operator", '|'],
    ["right", Rule('MemberExpression')],
    ["parameters", Optional(Rule('TransformParameters'))]
  ],
  Handler: ({ left, right, parameters }, context) => right.evaluate(context)(left.evaluate(context), ...(parameters ? parameters.evaluate(context) : []))
})
.addCustom({
  Alias: 'TransformParameters',
  Tokens: [["open", "("], ["expressions", Optional(ExpressionList)], ["close", ")"]],
  Handler: ({ expressions, }, context) => {
    const result = [];
    for(const expression of expressions) {
      result.push(
        expression.evaluate(context)
      );
    }
    return result;
  }
})

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = async (expressions, context) => {
  let result = null;
  for (const expression of expressions) {
    result = await expression.evaluate(context);
  }
  return result;
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = async (statements, context) => {
  let result, value;
  for(const statement of statements) {
    [result, value] = await statement.evaluate(context);
    if (result === 'return') {
      return [result, value];
    }
  }
  return [null, value];
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const Rule = __webpack_require__(0);
const Next = __webpack_require__(9);
const Current = __webpack_require__(13);
const Literal = __webpack_require__(6);
const Interpreter = __webpack_require__(14);
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
    this.grammar = __webpack_require__(31);
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
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_30__ === 'undefined') {var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "{\r\n  const { handler } = this;\r\n\r\n  function evaluate(context) {\r\n    return handler[this.nodeType][this.type](this.props, context);\r\n  }\r\n  handler.S.SExpressionStatement = function SExpressionStatement({ expressions }, context) {\r\n    let value;\r\n    for(const expression of expressions) {\r\n      value = expression.evaluate(context);\r\n    }\r\n    return [null, value];\r\n  };\r\n  handler.E.EReturnValue = function EReturnValue({ value }) { return value; }\r\n}\r\n\r\nProgram = _ statements:StatementList _ {\r\n  return statements;\r\n}\r\n\r\nStatementList = first:Statement last:(_ Statement)* {\r\n  return [first, ...last.map(x => x[1])];\r\n}\r\nExpressionList = first:Expression last:(_ ',' _ Expression)* {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\nIdentifier = !Keyword [a-zA-Z$_][a-zA-Z$_0-9]* {\r\n  return {\r\n    nodeType: 'I',\r\n    type: 'Identifier',\r\n    value: text(),\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\nIdentifierList = first:Identifier last:(_ \",\" _ Identifier) {\r\n  return [first, ...last.map(x => x[3])];\r\n}\r\n\r\nStatement = S0\r\nExpression = E0\r\n\r\nExpressionExit = Float\r\n\r\nFloat = [0-9]+ \".\" [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseFloat(text()),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Integer\r\n\r\nInteger = [0-9]+ {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: parseInt(text(), 10),\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n} / Null\r\n\r\nNull = \"null\" {\r\n  return {\r\n    nodeType: 'E',\r\n    type: 'EReturnValue',\r\n    evaluate,\r\n    props: {\r\n      value: null,\r\n    },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\nStatementExit = ExpressionStatement\r\n\r\nExpressionStatement = expressions:ExpressionList _ Terminator? {\r\n  return {\r\n    alias: 'ExpressionStatement',\r\n    nodeType: \"S\",\r\n    type: 'SExpressionStatement',\r\n    evaluate,\r\n    props: { expressions },\r\n    text: text(),\r\n    location: location()\r\n  };\r\n}\r\n\r\n_ = [\\t\\r\\n ]*\r\n__ = [\\t\\r\\n ]+"

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports) {

module.exports = {
  Type: 'RequiredWhitespace',
  generate() {
    return {
      toString: () => '_'
    };
  }
};

/***/ })
/******/ ]);
});