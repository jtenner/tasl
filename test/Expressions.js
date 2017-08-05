const { Grammar, Rule, Literal, Integer, Identifier, Expression, Statement, StatementList, ExpressionList, Or, Optional  } = require('../dist/plg');
const { expect } = require('chai');

describe('Expressions', function() {
  let grammar = new Grammar;
  grammar
    .addStatement({
      Alias: 'IfStatement',
      Tokens: {
        "if_keyword": Literal('if'),
        "open_parenthesis": Literal('('),
        "condition": ExpressionList,
        "close_parenthesis": Literal(')'),
        "ifStatements": Rule("CodeBlock"),
        "elseStatement": Optional(Or(Rule('ElseIfBlock'), Rule('ElseBlock')))
      },
      Handler: ({ condition, ifStatements, elseStatement }, context) => {
        let result, value;
        for(const expression of condition) {
          value = expression.evaluate(context);
        }

        if (value) {
          return ifStatements.evaluate(context);
        } else if(elseStatement) {
          return elseStatement.evaluate(context);
        }
        return [null, null];
      }
    })
    .addCustom({
      Alias: 'ElseIfBlock',
      Tokens: {
        "else_keyword": Literal("else"),
        "elseIfStatement": Rule("IfStatement"),
      },
      Handler: ({ elseIfStatement }, context) => elseIfStatement.evaluate(context)
    })
    .addCustom({
      Alias: 'ElseBlock',
      Tokens: {
        'else_keyword': Literal("else"),
        'block': Rule("CodeBlock")
      },
      Handler: ({ block }, context) => block.evaluate(context)
    })
    .addStatement({
      Alias: 'CodeBlockStatement',
      Tokens: {
        'block': Rule('CodeBlock')
      },
      Handler: ({ block }, context) => block.evaluate(context)
    })
    .addCustom({
      Alias: 'CodeBlock',
      Tokens: {
        'open_brace': Literal("{"),
        'statements': StatementList,
        'close_brace': Literal("}")
      },
      Handler: ({ statements }) => {
        let result, value;
        for(const statement of statements) {
          [result, value] = statement.evaluate(context);
          if (result === 'return') {
            return [result, value];
          }
        }
        return [null, value];
      }
    })
    .addBinaryExpression({
      Alias: `Assignment`,
      Left: Rule(`Identifier`),
      Operator: `=`,
      //Right: defaults to the current rule (assignment)
      Handler: ({ left, right }, context) => {
        
        //set something to the context and evaluate the right expression relative to the provided context
        return context[left.value] = right.evaluate(context);
      }
    })
    .addBinaryExpression({
      Alias: 'Addition',
      Operator: '+',
      Handler: ({ left, right }, context) => {
        return left.evaluate(context) + right.evaluate(context);
      }
    })
    .addBinaryExpression({
      Alias: 'Subtraction',
      Operator: '-',
      Handler: ({ left, right }, context) => left.evaluate(context) - right.evaluate(context)
    })
    .addUnaryExpression({
      Alias: 'Negative',
      Operator: '-',
      Type: 'left',
      Handler: ({ expression }, context) => -expression.evaluate(context)
    })
    .addBinaryExpression({
      Alias: 'Multiplication',
      Operator: '*',
      Handler: ({ left, right }) => left.evaluate(context) * right.evaluate(context)
    })
    .addBinaryExpression({
      Alias: 'Division',
      Operator: '/',
      Handler: ({ left, right }) => left.evaluate(context) * right.evaluate(context)
    })
    .reserve("if", "else");
  let ex, interpreter;
  try{
    interpreter = grammar.generate();
  } catch(ex) {
    console.log(ex);
    //console.log(grammar.grammar);
  }
  require('fs').writeFileSync('./grammar.pegjs', grammar.grammar, 'utf8');


  it('should evaluate addition', function() {
    expect(interpreter.evaluate('1 + 1', {})).to.equal(2);
  })
  it('should evaluate if statements', function() {
    const result = interpreter.evaluate(`
      if (null) {
        1;
      } else if(1) {
        2;
      }
    `);

    expect(result).to.equal(2);
  });
  it('should do assignments', function() {
    let context = {};
    const result = interpreter.evaluate(`a = 1`, context);
    expect(context).to.deep.equal({ a: 1 });
    expect(result).to.equal(1);
  });
});