const { Grammar, Rule, Expression,
  Literal, Or, Identifier,
  addArrayExpressions, addObjectExpressions, addArrowFunctionExpressions,
  addMemberExpressions, addMathExpressions, addBooleanExpressions,
addGroupingExpressions, addIfStatements, addAssignmentExpression } = require('./dist/plg');
let g = new
 Grammar;

addAssignmentExpression(g);
addArrowFunctionExpressions(g);
addMathExpressions(g);
addTransformExpressions(g);
addBooleanExpressions(g);
addGroupingExpressions(g);
addArrayExpressions(g);
addObjectExpressions(g);
addMemberExpressions(g);
addIfStatements(g);

const i = g.generate();
let context = {
  a: false,
  c: 0
};
console.log(i.evaluate(`
a = true;
if (a) 
  c = 1;
 else if(false)
   1;
 else {
  c = 2;
}
`, context));
console.log(context);