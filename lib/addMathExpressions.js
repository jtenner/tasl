const ExpressionList = require('./ExpressionList');
const evaluateExpressions = require('./evaluateExpressions');
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