{
  const { handler } = this;

  function evaluate(context) {
    return handler[this.nodeType][this.type](this.props, context);
  }
  handler.S.SExpressionStatement = function SExpressionStatement({ expressions }, context) {
    let value;
    for(const expression of expressions) {
      value = expression.evaluate(context);
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
IdentifierList = first:Identifier last:(_ "," _ Identifier) {
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
IfStatement = S0
S0 =  ifKeyword:"if" _ open:"(" _ conditional:Expression _ close:")" _ block:( block0:Statement /  block1:IfCodeBlock) _ elseBlock:( elseBlock_:ElseIfBlock)? _ {
  return {
    alias: "IfStatement",
    nodeType: "S",
    type: "S0",
    evaluate,
    props: { ifKeyword, open, conditional, close, block, elseBlock },
    text: text(),
    location: location()
  };
} / S1

IfCodeBlock = C0
C0 =  open:"{" _ statements:StatementList _ close:"}" _ {
  return {
    alias: "IfCodeBlock",
    nodeType: "C",
    type: "C0",
    evaluate,
    props: { open, statements, close },
    text: text(),
    location: location()
  };
} 

ElseIfBlock = C1
C1 =  elseKeyword:"else" _ block:( block0:IfStatement /  block1:IfCodeBlock) _ {
  return {
    alias: "ElseIfBlock",
    nodeType: "C",
    type: "C1",
    evaluate,
    props: { elseKeyword, block },
    text: text(),
    location: location()
  };
} 

SwitchStatement = S1
S1 =  switchKeyword:"switch" _ open:"(" _ conditional:Expression _ close:")" _ openBrace:"{" _ cases:( cases_:CaseList)? _ closeBrace:"}" _ {
  return {
    alias: "SwitchStatement",
    nodeType: "S",
    type: "S1",
    evaluate,
    props: { switchKeyword, open, conditional, close, openBrace, cases, closeBrace },
    text: text(),
    location: location()
  };
} / S2

L0 = Case
CaseList = first:L0 last:( _ L0)*  {
  return [first, ...last.map(x => x[1])];
}

Case = C2
C2 =  caseKeyword:"case" _ caseExpression:Expression _ colonSymbol:":" _ statements:CaseStatementList _ {
  return {
    alias: "Case",
    nodeType: "C",
    type: "C2",
    evaluate,
    props: { caseKeyword, caseExpression, colonSymbol, statements },
    text: text(),
    location: location()
  };
} 

L1 = CaseStatement
CaseStatementList = first:L1 last:( _ L1)*  {
  return [first, ...last.map(x => x[1])];
}

CaseStatement = C3
C3 =  statement:( statement0:BreakStatement /  statement1:Statement) _ {
  return {
    alias: "CaseStatement",
    nodeType: "C",
    type: "C3",
    evaluate,
    props: { statement },
    text: text(),
    location: location()
  };
} 

BreakStatement = C4
C4 =  breakKeyword:"break" _ optionalTerminator:( optionalTerminator_:";")? _ {
  return {
    alias: "BreakStatement",
    nodeType: "C",
    type: "C4",
    evaluate,
    props: { breakKeyword, optionalTerminator },
    text: text(),
    location: location()
  };
} 

DynamicAssignment = E0
E0 =  root:Identifier _ open:"[" _ expression:ExpressionList _ close:"]" _ operator:"=" _ value:E0 _ {
  return {
    alias: "DynamicAssignment",
    nodeType: "E",
    type: "E0",
    evaluate,
    props: { root, open, expression, close, operator, value },
    text: text(),
    location: location()
  };
} / E1

PropertyAssignment = E1
E1 =  root:Identifier _ open:"." _ path:Identifier _ operator:"=" _ value:E1 _ {
  return {
    alias: "PropertyAssignment",
    nodeType: "E",
    type: "E1",
    evaluate,
    props: { root, open, path, operator, value },
    text: text(),
    location: location()
  };
} / E2

Assignment = E2
E2 =  left:Identifier _ operator:"=" _ right:E2 _ {
  return {
    alias: "Assignment",
    nodeType: "E",
    type: "E2",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E3

Ternary = E3
E3 =  conditional:E4 _ questionOperator:"?" _ truthy:E3 _ colonOperator:":" _ falsy:E3 _ {
  return {
    alias: "Ternary",
    nodeType: "E",
    type: "E3",
    evaluate,
    props: { conditional, questionOperator, truthy, colonOperator, falsy },
    text: text(),
    location: location()
  };
} / E4

Addition = E4
E4 =  left:E5 _ operator:( operator0:"+" /  operator1:"-") _ right:E4 _ {
  return {
    alias: "Addition",
    nodeType: "E",
    type: "E4",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E5

Negative = E5
E5 =  operator:"-" _ expression:E5 _ {
  return {
    alias: "Negative",
    nodeType: "E",
    type: "E5",
    evaluate,
    props: { operator, expression },
    text: text(),
    location: location()
  };
} / E6

Multiplication = E6
E6 =  left:E7 _ operator:( operator0:"*" /  operator1:"/") _ right:E6 _ {
  return {
    alias: "Multiplication",
    nodeType: "E",
    type: "E6",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E7

Exponent = E7
E7 =  left:E8 _ operator:"**" _ right:E7 _ {
  return {
    alias: "Exponent",
    nodeType: "E",
    type: "E7",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E8

Transform = E8
E8 =  left:E9 _ operator:"|" _ right:Identifier _ parameters:( parameters_:TransformParameters)? _ {
  return {
    alias: "Transform",
    nodeType: "E",
    type: "E8",
    evaluate,
    props: { left, operator, right, parameters },
    text: text(),
    location: location()
  };
} / E9

TransformParameters = C5
C5 =  open:"(" _ expressions:( expressions_:ExpressionList)? _ close:")" _ {
  return {
    alias: "TransformParameters",
    nodeType: "C",
    type: "C5",
    evaluate,
    props: { open, expressions, close },
    text: text(),
    location: location()
  };
} 

Comparison = E9
E9 =  left:E10 _ operator:( operator0:">=" /  operator1:"==" /  operator2:"<=" /  operator3:"!=" /  operator4:">" /  operator5:"<") _ right:E9 _ {
  return {
    alias: "Comparison",
    nodeType: "E",
    type: "E9",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E10

Not = E10
E10 =  operator:"!" _ expression:E10 _ {
  return {
    alias: "Not",
    nodeType: "E",
    type: "E10",
    evaluate,
    props: { operator, expression },
    text: text(),
    location: location()
  };
} / E11

Boolean = E11
E11 =  value:( value0:"true" /  value1:"false") _ {
  return {
    alias: "Boolean",
    nodeType: "E",
    type: "E11",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} / E12

L2 = ArrayItem
ArrayItemList = first:L2 last:(_ ","  _ L2)* _ "," ? {
  return [first, ...last.map(x => x[3])];
}

ArrayItem = C6
C6 =  value:( value0:ArraySpread /  value1:ArrayRange /  value2:ArrayItemExpression) _ {
  return {
    alias: "ArrayItem",
    nodeType: "C",
    type: "C6",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} 

ArraySpread = C7
C7 =  spreadOperator:"..." _ value:Expression _ {
  return {
    alias: "ArraySpread",
    nodeType: "C",
    type: "C7",
    evaluate,
    props: { spreadOperator, value },
    text: text(),
    location: location()
  };
} 

ArrayRange = C8
C8 =  start:Expression _ spread:"..." _ end:Expression _ {
  return {
    alias: "ArrayRange",
    nodeType: "C",
    type: "C8",
    evaluate,
    props: { start, spread, end },
    text: text(),
    location: location()
  };
} 

ArrayItemExpression = C9
C9 =  expression:Expression _ {
  return {
    alias: "ArrayItemExpression",
    nodeType: "C",
    type: "C9",
    evaluate,
    props: { expression },
    text: text(),
    location: location()
  };
} 

ArrayExpression = E12
E12 =  openBrace:"[" _ expressionList:ArrayItemList _ closeBrace:"]" _ {
  return {
    alias: "ArrayExpression",
    nodeType: "E",
    type: "E12",
    evaluate,
    props: { openBrace, expressionList, closeBrace },
    text: text(),
    location: location()
  };
} / E13

Member = E13
E13 =  root:Identifier _ path:( path_:( path_0:IdentifierProperty /  path_1:DynamicProperty))? _ {
  return {
    alias: "Member",
    nodeType: "E",
    type: "E13",
    evaluate,
    props: { root, path },
    text: text(),
    location: location()
  };
} / E14

IdentifierProperty = C10
C10 =  periodOperator:"." _ value:Identifier _ {
  return {
    alias: "IdentifierProperty",
    nodeType: "C",
    type: "C10",
    evaluate,
    props: { periodOperator, value },
    text: text(),
    location: location()
  };
} 

DynamicProperty = C11
C11 =  open:"[" _ value:Expression _ close:"]" _ {
  return {
    alias: "DynamicProperty",
    nodeType: "C",
    type: "C11",
    evaluate,
    props: { open, value, close },
    text: text(),
    location: location()
  };
} 

Grouping = E14
E14 =  open:"(" _ expressions:ExpressionList _ close:")" _ {
  return {
    alias: "Grouping",
    nodeType: "E",
    type: "E14",
    evaluate,
    props: { open, expressions, close },
    text: text(),
    location: location()
  };
} / E15


E15 = ExpressionExit
S2 = StatementExit

Keyword = ("if" / "else" / "case" / "switch" / "break" / "true" / "false") 
Terminator = ";"
