
const { Grammar, Rule, Identifier } = require('./dist/tasl');
let g = new Grammar;
g.addExpression({
  Alias: 'Addition',
  Tokens: [
    ['left', Rule('Member')],
    ['operator', '+'],
    ['right', Rule('Member')]
  ],
  Handler({ left, right }, ...context) {
    console.log(context[1]);
    return left.evaluate(...context) + right.evaluate(...context);
  }
})
.addExpression({
  Alias: 'Member',
  Tokens: [
    ['id', Identifier]
  ],
  Handler({ id }, ...context) {
    console.log("getting", id);
    return context[0][id.value];
  }
})

const log = (x) => console.log(x);
const tasl = g.generate();
console.log("running");
tasl.evaluateAsync('a + b', { a: 1, b: 2 }, { test: 'test' }).then(log);

