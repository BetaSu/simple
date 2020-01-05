const {Stack} = require('../../utils');

// 下推自动机

class PDAConfiguration {
	constructor(state, stack) {
		this.state = state;
		this.stack = new Stack(stack);
	}
}

class PDARule {
	constructor(state, character, nextState, popCharacter, pushCharacters) {
		this.state = state;
		this.character = character;
		this.nextState = nextState;
		this.popCharacter = popCharacter;
		this.pushCharacters = pushCharacters;
	}
	applyTo(configuration, character) {
		return this.state === configuration.state 
			&& this.popCharacter === configuration.stack.top 
			&& this.character === character;
	}
	follow() {
		
	}
}

const rule = new PDARule(1, '(', 2, '$', ['b', '$']);
const config = new PDAConfiguration(1, ['$']);
console.log(rule.applyTo(config, '('))

module.exports = {
	PDAConfiguration,
	PDARule
}