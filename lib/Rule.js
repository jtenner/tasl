module.exports = (Name) => ({
  Type: 'Rule',
  Name,
  generate(Key, NextName) {
    return {
      value: ` ${Key}:${this.Name}`,
      toString() {
        return this.value + " _";
      }
    };
  }
});