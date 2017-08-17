module.exports = (statements, ...context) => {
  let result, value;
  for(const statement of statements) {
    [result, value] = statement.evaluate(...context);
    if (result === 'return') {
      return [result, value];
    }
  }
  return [null, value];
};