module.exports = {
  Type: 'Integer',
  generate(Key, NextRule) {
    return {
      value: ` ${Key}:[0-9]+`,
      toString() {
        return this.value + " _"
      }
    };
  }
}