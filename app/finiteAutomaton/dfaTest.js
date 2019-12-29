const {FARule} = require('./base');
const {DFARulebook, DFA, DFADesign} = require('./dfa');

const ruleBook = new DFARulebook([
  new FARule(1, 'a', 2),
  new FARule(1, 'b', 1),
  new FARule(2, 'a', 2),
  new FARule(2, 'b', 3),
  new FARule(3, 'a', 3),
  new FARule(3, 'b', 3)
])

const dfa = new DFADesign(1, [3], ruleBook);

dfa.accept('bbab');