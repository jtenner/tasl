module.exports = (expressions, ...context) => {
  let value;
  for(const expression of expressions) {
    value = expression.evaluate(...context);
  }
  return value;
};