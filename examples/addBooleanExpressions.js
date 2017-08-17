const Or = require('./Or');
const Literal = require('./Literal');
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