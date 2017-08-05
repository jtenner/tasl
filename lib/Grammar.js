const Rule = require('./Rule');
const Next = require('./Next');
const Current = require('./Current');
const Literal = require('./Literal');
const Interpreter = require('./Interpreter');
const range = (fr, to) => {
  let result = [];
  for (let i = fr; i <= to; i++) {
    result.push(i);
  }
  return result;
}
module.exports = class Grammar {
  constructor() {
    this.counts = {
      E: -1,
      S: -1,
      C: -1,
      L: -1
    };
    this.handler = {
      E: {},
      S: {},
      C: {}
    };
    this.keywords = [];
    this.terminator = ";";
    this.grammar = require('raw-loader!./Rules.pegjs');
  }
  setTerminator(value) {
    this.terminator = value;
    return this;
  }
  addBinaryExpression(options) {
    return this.addRule({
      Alias: options.Alias,
      Tokens: {
        "left": options.Left || Next,
        "operator": Literal(options.Operator),
        "right": options.Right || Current,
      },
      Type: 'E',
      Handler: options.Handler
    });
  }
  addUnaryExpression(options) {
    return this.addRule({
      Alias: options.Alias,
      Tokens: options.Type === 'right'
        ? { "expression": options.Expression || Next, "operator": Literal(options.Operator) }
        : { "operator": Literal(options.Operator), "expression": options.Expression || Current },
      Type: 'E',
      Handler: options.Handler
    });
  }
  addExpression(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'E',
      Handler
    });
  }
  addStatement(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'S',
      Handler
    });
  }
  addCustom(options) {
    const { Alias, Tokens, Handler } = options;
    return this.addRule({
      Alias,
      Tokens,
      Type: 'C',
      Handler
    });
  }
  addRule(options) {
    
    const { Alias, Tokens, Type, Handler } = options;
    console.log("adding", Alias);
    this.counts[Type] += 1;
    const Name = `${Type}${this.counts[Type]}`;
    this.handler[Type][Name] = Handler;
    const NextName = `${Type}${this.counts[Type] + 1}`;
    this.grammar += `
${Alias ? `${Alias} = ${Name}
` : ``}${Name} = ${this.spliceTokens(Tokens, NextName, Name)} {
  return {
    alias: "${Alias}",
    nodeType: "${Type}",
    type: "${Name}",
    evaluate,
    props: { ${Object.getOwnPropertyNames(Tokens).join(', ')} },
    text: text(),
    location: location()
  };
} ${(Type === 'S' || Type === 'E') ?  `/ ${NextName}` : ``}
`;
    return this;
  }
  addList(options) {
    this.counts.L += 1;
    const ListItemType = `L${this.counts.L}`;
    const TerminatorString = options.Terminator ? `_ "${options.Terminator.replace(/"/g, '\\"')}" ` : ``;
    this.grammar += `
${ListItemType} = ${options.Rule}
${options.Alias} = first:${ListItemType} last:(${TerminatorString} _ ${ListItemType})* ${options.Terminator ? TerminatorString + "?" : ''} {
  return [first, ...last.map(x => x[${options.Terminator ? 3 : 1}])];
}
`;
    return this;
  }
  spliceTokens(Tokens, NextName, CurrentName) {
    let result = '';
    let entries = Object.entries(Tokens);
    for (let i = 0; i < entries.length; i++) {
      let [Key, Token] = entries[i];
      result += (Token.constructor === String ? Literal(Token) : Token).generate(Key, NextName, CurrentName).toString();
    }
    return result;
  }

  reserve(...keywords) {
    this.keywords.push(...keywords);
    return this;
  }
  generate() {
    this.grammar += `

E${this.counts.E + 1} = ExpressionExit
S${this.counts.S + 1} = StatementExit

${this.keywords.length ? `Keyword = (${this.keywords.map(x => `"${x.replace(/"/g, '\\"')}"`).join(' / ')})` : 'Keyword = "1"'} 
Terminator = "${this.terminator}"
`;

    return new Interpreter(this.grammar, this.handler);
  }
};