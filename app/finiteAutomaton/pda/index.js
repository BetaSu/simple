const {Stack} = require('../../utils');

// 下推自动机

class PDAConfiguration {
	constructor(state, stack) {
		this.state = state;
		this.stack = new Stack(stack);
	}
}

class PDARule {
	/**
	 * @description pda规则
	 * @param {*} state 当前状态
	 * @param {*} character 接受的字符
	 * @param {*} nextState 下一个状态
	 * @param {*} popCharacter 弹出的字符
	 * @param {*} pushCharacters 入栈的字符
	 * @memberof PDARule
	 */
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
	follow(configuration) {
		return new PDAConfiguration(this.nextState, this.nextStack(configuration));
	}
	nextStack(configuration) {
		let poped = configuration.stack.pop();
		this.pushCharacters.reverse().forEach(character => poped = poped.push(character));
		return poped;
	}
}



// const rule = new PDARule(1, '(', 2, '$', ['b', '$']);
// const config = new PDAConfiguration(1, ['$']);
// console.log(rule.follow(config).stack)


module.exports = {
	PDAConfiguration,
	PDARule
}