module.exports = {
  Type: 'Next',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:${NextRule}`,
      toString() {
        return this.value + " _";
      }
    };
  }
};