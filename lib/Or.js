module.exports = (...Tokens) => ({
  type: 'Or',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:(${Tokens.map((x, i) => x.generate(Key + i, NextRule, CurrentRule).value).join(' / ')})`,
      toString() {
        return this.value + " _";
      }
    };
  }
})