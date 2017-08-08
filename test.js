let tasl = require('./test/tasl/index');
const log = (x) => console.log(x);

const JR = {
  vars: {
    a: 1,
    b: 2
  }
}

const context = {
  runas: JR
};

tasl.evaluateAsync('a + b', context).then(log);

