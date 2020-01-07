const {PDAConfiguration, PDARule} = require('./');
const {DPDARulebook, DPDA} = require('./dpda');
const {Stack} = require('../../utils');

test('PDAConfiguration', () => {
    const rule = new PDARule(1, '(', 2, '$', ['b', '$']);
    const config = new PDAConfiguration(1, ['$']);
    expect(rule.applyTo(config, '(')).toBe(true);
})

test('DPDA', () => {
    const rulebook = new DPDARulebook([
        new PDARule(1, '(', 2, '$', ['b', '$']),
        new PDARule(2, '(', 2, 'b', ['b', 'b']),
        new PDARule(2, ')', 2, 'b', []),
        new PDARule(2, null, 1, '$', ['$'])
    ]);
    const dpda = new DPDA(new PDAConfiguration(1, new Stack(['$'])), [1], rulebook);
    expect(dpda.accepting()).toBe(true);
    expect(dpda.readString('(()')).toBe(false);
})