const ExpressionList = require('./ExpressionList');
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