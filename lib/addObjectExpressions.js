const Rule = require('./Rule');
const Or = require('./Or');
const Literal = require('./Literal');
const Expression = require('./Expression');
const Identifier = require('./Identifier');

module.exports = (grammar) => grammar.addList({
  Alias: 'ObjectExpressionItemList',
  Rule: 'ObjectExpressionItem',
  Terminator: ',',
})
.addCustom({
  Alias: 'ObjectExpressionItem',
  Tokens: {
    "value": Or(Rule('ObjectSpread'), Rule('KeyValuePair'))
  },
  Handler: ({ value }, context) => value.evaluate(context)
})
.addCustom({
  Alias: 'ObjectSpread',
  Tokens: {
    'spreadOperator': '...',
    'value': Expression
  },
  Handler: ({ value }, context) => ({ [Symbol.for('type')]: 'spread', value: value.evaluate(context) })
})
.addCustom({
  Alias: 'KeyValuePair',
  Tokens: {
    "key": Identifier,
    "seperator": ":",
    "expression": Expression,
  },
  Handler: ({ key, expression }, context) => ({ [Symbol.for('type')]: 'keypair', key, value: expression.evaluate(context) })
})
.addExpression({
  Alias: 'ObjectExpression',
  Tokens: {
    "openBrace": "{",
    "expressionList": Rule('ObjectExpressionItemList'),
    "closeBrace": "}"
  },
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