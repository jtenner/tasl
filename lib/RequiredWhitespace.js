module.exports = {
  Type: 'RequiredWhitespace',
  generate() {
    return {
      toString: () => '_'
    };
  }
};