module.exports = async (expressions, ...context) => {
  let result = null;
  for (const expression of expressions) {
    result = await expression.evaluate(...context);
  }
  return result;
};