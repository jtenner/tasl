const Rule = require('./Rule');
module.exports = (g) => g.addBinaryExpression({
  Alias: 'AssignmentExpression',
  Left: Rule('MemberExpression'),
  Operator: '=',
  Handler: ({ left, right }, context) => {
    let target = context, key;
    const { root, path } = left.props;
    const targetPath = [root, ...(path || [])];
    const InvalidMemberPathError = new Error(`Invalid member path: ${left.text} at ${JSON.stringify(left.location)}`);


    for (let i = 0; i < targetPath.length - 2; i++) {
      key = targetPath[i].type === 'Identifier'
        ? targetPath[i].value
        : targetPath[i].evaluate(context);
      if (target.hasOwnProperty(key)) {
        target = target[key];
      } else {
        throw InvalidMemberPathError;
      }
    }
    const lastPath = targetPath[targetPath.length - 1];
    key = lastPath.type === 'Identifier'
      ? lastPath.value
      : lastPath.evaluate(context);
    if (target.hasOwnProperty(key)) {
      return target[key] = right.evaluate(context);
    }
    throw InvalidMemberPathError;
  }
});