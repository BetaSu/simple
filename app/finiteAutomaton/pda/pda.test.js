const {PDAConfiguration, PDARule} = require('./');

test('PDAConfiguration', () => {
    const rule = new PDARule(1, '(', 2, '$', ['b', '$']);
    const config = new PDAConfiguration(1, ['$']);
    expect(rule.applyTo(config, '(')).toBe(true);
})