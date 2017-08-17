const PEG = require('pegjs');
module.exports = class Interpreter {
  constructor(grammar, handler) {
    this.grammar = grammar;
    this.parser = PEG.generate(grammar);
    this.parser.handler = handler;
  }
  evaluate(text, ...context) {
    return this.evaluateStatements(this.parser.parse(text), ...context);
  }
  evaluateStatements(statements, ...context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = statement.evaluate(...context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
  async evaluateAsync(text, ...context) {
    return this.evaluateStatementsAsync(this.parser.parse(text), ...context);
  }
  async evaluateStatementsAsync(statements, ...context) {
    let result, value;
    for (let statement of statements) {
      [result, value] = await statement.evaluate(...context);
      if (result === 'return') {
        return value;
      }
    }
    return value;
  }
};