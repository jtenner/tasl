# TASL

## PEG Application Grammar Generator

Welcome to TASL, the PEG Application Grammar Generator. This module is used for generating interpreted languages that run inside node.js and the browser. It parses `ExpressionStatement`s out of the box, and allows for optional whitespace between each token unless specified.

Example:

```javascript
const { Grammar, Rule, Literal } = require('tasl');
const g = new Grammar;

g.addBinaryExpression({
  Alias: `Assignment`,
  Left: Rule(`Identifier`),
  Operator: Literal(`=`),
  //Right: defaults to the current rule (assignment)
  Handler: ({ left, right }, context) => {
    //set something to the context and evaluate the right expression relative to the provided context
    return context[left.value] = right.evaluate(context);
  }
});

const i = g.generate();
let context = {};

console.log(i.evaluate(`a = 1`, context), context);
```