const Rule = require('./Rule');
const Or = require('./Or');
const Expression = require('./Expression');

module.exports = (grammar) => grammar.addList({
  Alias: 'ArrayItemList',
  Rule: 'ArrayItem',
  Terminator: ',',
})
.addCustom({
  Alias: 'ArrayItem',
  Tokens: {
    "value": Or(Rule('ArraySpread'), Rule('ArrayRange'), Rule('ArrayItemExpression'))
  },
  Handler: ({ value }, context) => value.evaluate(context)
})
.addCustom({
  Alias: 'ArraySpread',
  Tokens: {
    'spreadOperator': '...',
    'value': Expression
  },
  Handler: ({ value }, context) => ({ [Symbol.for('type')]: 'spread', value: value.evaluate(context) })
})
.addCustom({
  Alias: 'ArrayRange',
  Tokens: {
    start: Expression,
    'spread': '...',
    end: Expression
  },
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
  Tokens: {
    "expression": Expression,
  },
  Handler: ({ expression }, context) => ({ [Symbol.for('type')]: 'item', value: expression.evaluate(context) })
})
.addExpression({
  Alias: 'ArrayExpression',
  Tokens: {
    "openBrace": "[",
    "expressionList": Rule('ArrayItemList'),
    "closeBrace": "]"
  },
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