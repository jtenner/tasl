module.exports = g => g
  .addUnaryExpression({
    Alias: 'Not',
    Operator: '!',
    Handler: ({ expression }, context) => !expression.evaluate(context)
  })
  .addExpression({
    Alias: 'True',
    Tokens: {
     'value': 'true',
    },
    Handler: () => true
  })
  .addExpression({
    Alias: 'False',
    Tokens: {
      'value': 'false',
    },
    Handler: () => false
  })
  .reserve("true", "false")