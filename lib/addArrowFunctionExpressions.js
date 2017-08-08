const Rule = require('./Rule');
const Or = require('./Or');
const Identifier = require('./Identifier');
const IdentifierList = require('./IdentifierList');
const Optional = require('./Optional');
const StatementList = require('./StatementList');
const Expression = require('./Expression');
const evaluateStatements = require('./evaluateStatements');
module.exports = (g) => g
.addCustom({
  Alias: 'ArrowFunctionCodeBlock',
  Tokens: [
    ["open_brace", "{"],
    ["statements", StatementList],
    ["close_brace", "}"]
  ],
  Handler: ({ statements }, context) => {
    return evaluateStatements(statements, context);
  }
})
.addBinaryExpression({
  Alias: 'ArrowFunctionExpression',
  Left: Or(Identifier, Rule("FunctionParameters")),
  Operator: '=>',
  Right: Or(Rule('ArrowFunctionCodeBlock'), Expression),
  Handler: ({ left, right }, context)  => {
    let parameterIdentifiers =  left
      ? (left.Type === 'Identifier' ? [left] : left)
      : [];
    parameterIdentifiers.map(x => x.value);

    let parentIdentifiers = Object.getOwnPropertyNames(context).filter(
      x => !parameterIdentifiers.includes(x)
    );
    return (...parameters) => {
      let newContext = Object.assign({}, context);
      for (let i = 0; i < left.length; i++) {
        newContext[left[i].value] = parameters[i];
      }
      const [result, value] = right.evaluate(newContext);
      parentIdentifiers.forEach(x => { context[x] = newContext[x]; });
      return value;
    };
  }
})
.addCustom({
  Alias: 'FunctionParameters',
  Tokens: [
    ["open", "("],
    ["parameters", Optional(IdentifierList)],
    ["close", ")"]
  ],
  Handler: ({ parameters, }, context) => {
    return parameters;
  }
});