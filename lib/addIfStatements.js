const Rule = require('./Rule');
const Expression = require('./Expression');
const StatementList = require('./StatementList');
const Or = require('./Or');
const evaluateStatements = require('./evaluateStatements');
const Optional = require('./Optional');
const Statement = require('./Statement');
module.exports = (g) =>
  g.addStatement({
    Alias: 'IfStatement',
    Tokens: {
      "ifKeyword": 'if',
      "open": "(",
      "conditional": Expression,
      "close": ")",
      "block": Or(Statement, Rule('IfCodeBlock')),
      "elseBlock": Optional(Rule('ElseIfBlock'))
    },
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
    Tokens: {
      'open': '{',
      'statements': StatementList,
      'close': '}'
    },
    Handler: ({ statements }, context) => evaluateStatements(statements, context)
  })
  .addCustom({
    Alias: 'ElseIfBlock',
    Tokens: {
      'elseKeyword': 'else',
      'block': Or(Rule('IfStatement'), Rule('IfCodeBlock'))
    },
    Handler: ({ block }, context) => block.evaluate(context)
  })
  .reserve('if', 'else')
