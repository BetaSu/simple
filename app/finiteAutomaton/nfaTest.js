
const {FARule} = require('./base');
const {NFARuleBook, NFA, NFADesign} = require('./nfa');

const ruleBook = new NFARuleBook([
  new FARule(1, null, 2),
  new FARule(1, null, 4),
  new FARule(2, 'a', 3),
  new FARule(3, 'a', 2),
  new FARule(4, 'a', 5),
  new FARule(5, 'b', 6),
  new FARule(6, 'b', 4)
])

const nfa = new NFADesign(1, [2, 4], ruleBook);

// console.log(nfa.accepts('aa'))
console.log(nfa.accepts('aaa'))
// console.log(nfa.accepts('aaaaa'))
// console.log(nfa.accepts('aaaaaa'))