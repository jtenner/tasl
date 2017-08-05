const { Grammar, Rule, Expression,
  Literal, Or, Identifier,
  addArrayExpressions, addObjectExpressions, addArrowFunctionExpressions,
  addMemberExpressions, addMathExpressions, addBooleanExpressions,
addGroupingExpressions } = require('./dist/plg');
let g = new
 Grammar;
g.addBinaryExpression({
  Left: Identifier,
  Operator: '=',
  Handler: ({ left, right }, context) => context[left.value] = right.evaluate(context)
});
addArrowFunctionExpressions(g);
addMathExpressions(g);

addBooleanExpressions(g);

addGroupingExpressions(g);
addArrayExpressions(g);
addObjectExpressions(g);
addMemberExpressions(g);

const i = g.generate();
let context = {};
console.log(i.evaluate(`
a = { a: 1, b: 2, c: 3 };
b = [1...10];
c = { ...a, d: 4, e: 5, f: 6 };
d = [...b, 5,4,3,2,1];
`, context));
console.log(context);