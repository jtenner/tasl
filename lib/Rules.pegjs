{
  const { handler } = this;

  function evaluate(...context) {
    return handler[this.nodeType][this.type](this.props, ...context);
  }
  handler.S.SExpressionStatement = function SExpressionStatement({ expressions }, ...context) {
    let value;
    for(const expression of expressions) {
      value = expression.evaluate(...context);
    }
    return [null, value];
  };
  handler.E.EReturnValue = function EReturnValue({ value }) { return value; }
}

Program = _ statements:StatementList _ {
  return statements;
}

StatementList = first:Statement last:(_ Statement)* {
  return [first, ...last.map(x => x[1])];
}
ExpressionList = first:Expression last:(_ ',' _ Expression)* {
  return [first, ...last.map(x => x[3])];
}
Identifier = !Keyword [a-zA-Z$_][a-zA-Z$_0-9]* {
  return {
    nodeType: 'I',
    type: 'Identifier',
    value: text(),
    text: text(),
    location: location()
  };
}
IdentifierList = first:Identifier last:(_ "," _ Identifier)* {
  return [first, ...last.map(x => x[3])];
}

Statement = S0
Expression = E0

ExpressionExit = Float

Float = [0-9]+ "." [0-9]+ {
  return {
    nodeType: 'E',
    type: 'EReturnValue',
    evaluate,
    props: {
      value: parseFloat(text()),
    },
    text: text(),
    location: location()
  };
} / Integer

Integer = [0-9]+ {
  return {
    nodeType: 'E',
    type: 'EReturnValue',
    evaluate,
    props: {
      value: parseInt(text(), 10),
    },
    text: text(),
    location: location()
  };
} / Null

Null = "null" {
  return {
    nodeType: 'E',
    type: 'EReturnValue',
    evaluate,
    props: {
      value: null,
    },
    text: text(),
    location: location()
  };
}

StatementExit = ExpressionStatement

ExpressionStatement = expressions:ExpressionList _ Terminator? {
  return {
    alias: 'ExpressionStatement',
    nodeType: "S",
    type: 'SExpressionStatement',
    evaluate,
    props: { expressions },
    text: text(),
    location: location()
  };
}

_ = [\t\r\n ]*
__ = [\t\r\n ]+