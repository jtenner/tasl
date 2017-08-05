module.exports = (Rule) => ({
  Type: 'Optional',
  generate: (Key, NextRule, CurrentRule) => ({
    value: ` ${Key}:(${Rule.generate(Key + "_", NextRule, CurrentRule).value})?`,
    toString() {
      return this.value + " _";
    }
  })
});