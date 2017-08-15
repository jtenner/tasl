
const { Grammar, Rule, Identifier } = require('./dist/plg');
let g = new Grammar;
g.addExpression({
  Alias: 'Addition',
  Tokens: [
    ['left', Rule('Member')],
    ['operator', '+'],
    ['right', Rule('Member')]
  ],
  Handler({ left, right }, context) {
    return left.evaluate(context) + right.evaluate(context);
  }
})
.addExpression({
  Alias: 'Member',
  Tokens: [
    ['id', Identifier]
  ],
  Handler({ id }, context) {
    console.log("getting", id);
    return context[id.value];
  }
})

const log = (x) => console.log(x);
const tasl = g.generate();
tasl.evaluateAsync('a + b', { a: 1, b: 2 }).then(log);

