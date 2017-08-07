const Rule = require('./Rule');
const Next = require('./Next');
const Optional = require('./Optional');
const ExpressionList = require('./ExpressionList');

module.exports = (g) => g.addExpression({
  Alias: 'Transform',
  Tokens: {
    left: Next,
    operator: '|',
    right: Rule('MemberExpression'),
    parameters: Optional(Rule('TransformParameters'))
  },
  Handler: ({ left, right, parameters }, context) => right.evaluate(context)(left.evaluate(context), ...(parameters ? parameters.evaluate(context) : []))
})
.addCustom({
  Alias: 'TransformParameters',
  Tokens: {
    "open": "(",
    "expressions": Optional(ExpressionList),
    "close": ")"
  },
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