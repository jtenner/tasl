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
AssignmentExpression = E0
E0 =  left:MemberExpression _ operator:"=" _ right:E0 _ {
  return {
    alias: "AssignmentExpression",
    nodeType: "E",
    type: "E0",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E1

ArrowFunctionCodeBlock = C0
C0 =  open_brace:"{" _ statements:StatementList _ close_brace:"}" _ {
  return {
    alias: "ArrowFunctionCodeBlock",
    nodeType: "C",
    type: "C0",
    evaluate,
    props: { open_brace, statements, close_brace },
    text: text(),
    location: location()
  };
} 

ArrowFunctionExpression = E1
E1 =  left:( left0:Identifier /  left1:FunctionParameters) _ operator:"=>" _ right:( right0:ArrowFunctionCodeBlock /  right1:Expression) _ {
  return {
    alias: "ArrowFunctionExpression",
    nodeType: "E",
    type: "E1",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E2

FunctionParameters = C1
C1 =  open:"(" _ parameters:( parameters_:IdentifierList)? _ close:")" _ {
  return {
    alias: "FunctionParameters",
    nodeType: "C",
    type: "C1",
    evaluate,
    props: { open, parameters, close },
    text: text(),
    location: location()
  };
} 

Addition = E2
E2 =  left:E3 _ operator:"+" _ right:E2 _ {
  return {
    alias: "Addition",
    nodeType: "E",
    type: "E2",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E3

Subtraction = E3
E3 =  left:E4 _ operator:"-" _ right:E3 _ {
  return {
    alias: "Subtraction",
    nodeType: "E",
    type: "E3",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E4

Negative = E4
E4 =  operator:"-" _ expression:E4 _ {
  return {
    alias: "Negative",
    nodeType: "E",
    type: "E4",
    evaluate,
    props: { operator, expression },
    text: text(),
    location: location()
  };
} / E5

Multiplication = E5
E5 =  left:E6 _ operator:"*" _ right:E5 _ {
  return {
    alias: "Multiplication",
    nodeType: "E",
    type: "E5",
    evaluate,
    props: { left, operator, right },
    text: text(),
    location: location()
  };
} / E6

Division = E6
E6 =  left:E7 _ operator:"/" _ right:E6 _ {
  return {
    alias: "Division",
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

Not = E8
E8 =  operator:"!" _ expression:E8 _ {
  return {
    alias: "Not",
    nodeType: "E",
    type: "E8",
    evaluate,
    props: { operator, expression },
    text: text(),
    location: location()
  };
} / E9

True = E9
E9 =  value:"true" _ {
  return {
    alias: "True",
    nodeType: "E",
    type: "E9",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} / E10

False = E10
E10 =  value:"false" _ {
  return {
    alias: "False",
    nodeType: "E",
    type: "E10",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} / E11

Grouping = E11
E11 =  open:"(" _ expressions:ExpressionList _ close:")" _ {
  return {
    alias: "Grouping",
    nodeType: "E",
    type: "E11",
    evaluate,
    props: { open, expressions, close },
    text: text(),
    location: location()
  };
} / E12

L0 = ArrayItem
ArrayItemList = first:L0 last:(_ ","  _ L0)* _ "," ? {
  return [first, ...last.map(x => x[3])];
}

ArrayItem = C2
C2 =  value:( value0:ArraySpread /  value1:ArrayRange /  value2:ArrayItemExpression) _ {
  return {
    alias: "ArrayItem",
    nodeType: "C",
    type: "C2",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} 

ArraySpread = C3
C3 =  spreadOperator:"..." _ value:Expression _ {
  return {
    alias: "ArraySpread",
    nodeType: "C",
    type: "C3",
    evaluate,
    props: { spreadOperator, value },
    text: text(),
    location: location()
  };
} 

ArrayRange = C4
C4 =  start:Expression _ spread:"..." _ end:Expression _ {
  return {
    alias: "ArrayRange",
    nodeType: "C",
    type: "C4",
    evaluate,
    props: { start, spread, end },
    text: text(),
    location: location()
  };
} 

ArrayItemExpression = C5
C5 =  expression:Expression _ {
  return {
    alias: "ArrayItemExpression",
    nodeType: "C",
    type: "C5",
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

L1 = ObjectExpressionItem
ObjectExpressionItemList = first:L1 last:(_ ","  _ L1)* _ "," ? {
  return [first, ...last.map(x => x[3])];
}

ObjectExpressionItem = C6
C6 =  value:( value0:ObjectSpread /  value1:KeyValuePair) _ {
  return {
    alias: "ObjectExpressionItem",
    nodeType: "C",
    type: "C6",
    evaluate,
    props: { value },
    text: text(),
    location: location()
  };
} 

ObjectSpread = C7
C7 =  spreadOperator:"..." _ value:Expression _ {
  return {
    alias: "ObjectSpread",
    nodeType: "C",
    type: "C7",
    evaluate,
    props: { spreadOperator, value },
    text: text(),
    location: location()
  };
} 

KeyValuePair = C8
C8 =  key:Identifier _ seperator:":" _ expression:Expression _ {
  return {
    alias: "KeyValuePair",
    nodeType: "C",
    type: "C8",
    evaluate,
    props: { key, seperator, expression },
    text: text(),
    location: location()
  };
} 

ObjectExpression = E13
E13 =  openBrace:"{" _ expressionList:ObjectExpressionItemList _ closeBrace:"}" _ {
  return {
    alias: "ObjectExpression",
    nodeType: "E",
    type: "E13",
    evaluate,
    props: { openBrace, expressionList, closeBrace },
    text: text(),
    location: location()
  };
} / E14

MemberExpression = E14
E14 =  root:Identifier _ path:( path_:MemberExpressionPathItemList)? _ {
  return {
    alias: "MemberExpression",
    nodeType: "E",
    type: "E14",
    evaluate,
    props: { root, path },
    text: text(),
    location: location()
  };
} / E15

L2 = MemberExpressionPathItem
MemberExpressionPathItemList = first:L2 last:( _ L2)*  {
  return [first, ...last.map(x => x[1])];
}

MemberExpressionPathItem = C9
C9 =  pathItem:( pathItem0:IdentifierProperty /  pathItem1:DynamicProperty) _ {
  return {
    alias: "MemberExpressionPathItem",
    nodeType: "C",
    type: "C9",
    evaluate,
    props: { pathItem },
    text: text(),
    location: location()
  };
} 

IdentifierProperty = C10
C10 =  dot:"." _ pathItem:Identifier _ {
  return {
    alias: "IdentifierProperty",
    nodeType: "C",
    type: "C10",
    evaluate,
    props: { dot, pathItem },
    text: text(),
    location: location()
  };
} 

DynamicProperty = C11
C11 =  openBracket:"[" _ expressions:ExpressionList _ closeBracket:"]" _ {
  return {
    alias: "DynamicProperty",
    nodeType: "C",
    type: "C11",
    evaluate,
    props: { openBracket, expressions, closeBracket },
    text: text(),
    location: location()
  };
} 

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

IfCodeBlock = C12
C12 =  open:"{" _ statements:StatementList _ close:"}" _ {
  return {
    alias: "IfCodeBlock",
    nodeType: "C",
    type: "C12",
    evaluate,
    props: { open, statements, close },
    text: text(),
    location: location()
  };
} 

ElseIfBlock = C13
C13 =  elseKeyword:"else" _ block:( block0:IfStatement /  block1:IfCodeBlock) _ {
  return {
    alias: "ElseIfBlock",
    nodeType: "C",
    type: "C13",
    evaluate,
    props: { elseKeyword, block },
    text: text(),
    location: location()
  };
} 


E15 = ExpressionExit
S1 = StatementExit

Keyword = ("true" / "false" / "if" / "else") 
Terminator = ";"
