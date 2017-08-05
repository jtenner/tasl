module.exports = {
  type: 'Current',
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:${CurrentRule}`,
      toString() {
        return this.value + " _";
      }
    };
  }
}