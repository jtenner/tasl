const Identifier = require('./Identifier');
const Optional = require('./Optional');
const Rule = require('./Rule');
const Or = require('./Or');
const ExpressionList = require('./ExpressionList');
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

