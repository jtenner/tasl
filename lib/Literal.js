module.exports = (Value, Insensitive = false) => ({
  Type: 'Literal',
  Value,
  Insensitive,
  generate(Key, NextRule, CurrentRule) {
    return {
      value: ` ${Key}:"${this.Value.replace(/"/g, '\\"')}"${this.Insensitive ? "i" : ""}`,
      toString() {
        return this.value + " _";
      }
    };
  }
});