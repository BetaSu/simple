
const {FARule} = require('./base');
const {NFARuleBook, NFA, NFADesign} = require('./nfa');


test('NFA', () => {
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
  expect(nfa.accepts('aa')).toBe(true);
  expect(nfa.accepts('aaa')).toBe(false);
  expect(nfa.accepts('aaaaa')).toBe(false);
  expect(nfa.accepts('aaaaaa')).toBe(true);
})

test('toNFA可以接受当前状态', () => {
  const ruleBook = new NFARuleBook([
    new FARule(1, 'a', 1),
    new FARule(1, 'a', 2),
    new FARule(1, null, 2),
    new FARule(2, 'b', 3),
    new FARule(3, 'b', 1),
    new FARule(3, null, 2)
  ]);
  const nfaDesign = new NFADesign(1, [3], ruleBook);
  const nfa = nfaDesign.toNFA([2, 3]);
  nfa.readCharacter('b');
  const curStates = nfa.currentStates;
  expect(curStates.has(1)).toBe(true);
  expect(curStates.has(2)).toBe(true);
  expect(curStates.has(3)).toBe(true);
})

