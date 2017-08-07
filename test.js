const { Grammar, Rule, Expression,
  Literal, Or, Identifier,
  Optional, StatementList, Statement,
  Current, Next, ExpressionList,
  addArrayExpressions, addObjectExpressions, addArrowFunctionExpressions,
  addMemberExpressions, addMathExpressions, addBooleanExpressions,
addGroupingExpressions, addIfStatements, addAssignmentExpression } = require('./dist/plg');
let g = new Grammar;

g.addUnaryExpression({
    Alias: "Not",
    Operator: '!',
    Handler: async ({ expression }, context) => ! await expression.evaluate(context)
  })
  .addExpression({
    Alias: 'Boolean',
    Tokens: {
      'value': Or(Literal('true'), Literal('false'))
    },
    Handler: ({ value }) => value === 'true'
  })
  .reserve('true', 'false');
const i = g.generate();
const log = x => console.log(x);
i.evaluateAsync('!false', {}).then(log);

