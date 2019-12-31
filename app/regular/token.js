const { NFARuleBook, NFADesign } = require("../finiteAutomaton/nfa");
const { FARule } = require("../finiteAutomaton/base");

class Pattern {
  matches(str) {
    return this.toNFADesign().accepts(str);
  }
  bracket(outerPrecedence) {
    const str = this.toString();
    if (this.precedence < outerPrecedence) {
      return "(" + str + ")";
    }
    return str;
  }
}

class Empty extends Pattern {
  precedence = 3;
  toString() {
    return "";
  }
  toNFADesign() {
    const startState = Symbol(this.toString());
    const acceptState = [startState];
    const rulebook = new NFARuleBook([]);
    return new NFADesign(startState, acceptState, rulebook);
  }
}

// 单个字符
class Literal extends Pattern {
  precedence = 3;
  constructor(character) {
    super(character);
    this.character = character;
  }
  toString() {
    return this.character;
  }
  toNFADesign() {
    const startState = Symbol(this.toString());
    const acceptState = Symbol(this.toString());
    const rule = new FARule(startState, this.character, acceptState);
    const rulebook = new NFARuleBook([rule]);
    return new NFADesign(startState, [acceptState], rulebook);
  }
}

// ab
class Concatenate extends Pattern {
  precedence = 1;
  constructor(...firstAndSecond) {
    super(...firstAndSecond);
    this.firstAndSecond = firstAndSecond;
  }
  toString() {
    return this.firstAndSecond
      .map(pattern => pattern.bracket(this.precedence))
      .join("");
  }
  /**
   * 需要：
   * 第一个NFA的起始状态
   * 第二个NFA的接受状态
   * 2个NFA的所有规则
   * 一些额外的自由移动，可以把第一个NFA旧的接受状态与第二个NFA旧的起始状态连接起来
   */
  toNFADesign() {
    const [first, second] = this.firstAndSecond;
    const firstNFADesign = first.toNFADesign();
    const secondNFADesign = second.toNFADesign();
    const startState = firstNFADesign.startState;
    const acceptStates = secondNFADesign.acceptStates;
    const rules = firstNFADesign.rulebook.rules.concat(
      secondNFADesign.rulebook.rules
		);
    const extraRules = firstNFADesign.acceptStates.map(
      state => new FARule(state, null, secondNFADesign.startState)
    );
    const rulebook = new NFARuleBook(rules.concat(extraRules));
    return new NFADesign(startState, acceptStates, rulebook);
  }
}

// a|b
class Choose extends Pattern {
  precedence = 0;
  constructor(...firstAndSecond) {
    super(...firstAndSecond);
    this.firstAndSecond = firstAndSecond;
  }
  toString() {
    return this.firstAndSecond
      .map(pattern => pattern.bracket(this.precedence))
      .join("|");
	}
	/** 
	 * 需要：
	 * 一个新的起始状态
	 * 2个NFA的所有接受状态
	 * 2个NFA的所有规则
	 * 2个额外自由移动，可以把新的起始状态与NFA旧的起始状态连接起来
	*/
	toNFADesign() {
		const [first, second] = this.firstAndSecond;
    const firstNFADesign = first.toNFADesign();
    const secondNFADesign = second.toNFADesign();
		const startState = Symbol(this.toString());
		const acceptStates = firstNFADesign.acceptStates.concat(secondNFADesign.acceptStates);
		const rules = firstNFADesign.rulebook.rules.concat(secondNFADesign.rulebook.rules);
		const extraRules = [firstNFADesign.startState, secondNFADesign.startState].map(state => {
			return new FARule(startState, null, state);
		})
		const rulebook = new NFARuleBook(rules.concat(extraRules));
		return new NFADesign(startState, acceptStates, rulebook);
	}
}

// a*
class Repeat extends Pattern {
  precedence = 2;
  constructor(pattern) {
    super(pattern);
    this.pattern = pattern;
  }
  toString() {
    return this.pattern.bracket(this.precedence) + "*";
	}
	/** 
	 * 思路：
	 * 从接受状态到开始状态增加一个自由移动，这样就能匹配多于1个
	 * 增加可自由移动到旧的开始状态的新状态，并使其作为接受状态，这样就能匹配空
	 * 需要：
	 * 一个新的起始状态，它也是一个接受状态 注意：之所以不使用旧的起始状态，因为复杂情况（ex: (a*b)*）可能会产生接受除空字符串外其他非匹配字符串
	 * 旧的NFA中所有的接受状态
	 * 旧的NFA中所有的规则
	 * 额外的自由移动，连接旧的接受状态与旧的起始状态
	 * 另一些自由移动，连接新的起始状态与旧的起始状态
	*/
	toNFADesign() {
		const nfaDesign = this.pattern.toNFADesign();
		const oldStartState = nfaDesign.startState;
		const newStartState = Symbol('repeat start');
		const acceptStates = nfaDesign.acceptStates.concat(newStartState);
		const oldRules = nfaDesign.rulebook.rules;
		const rulesForMoreThanOne = acceptStates.map(state => {
			return new FARule(state, null, newStartState);
		})
		const rulesForEmpty = acceptStates.map(state => {
			return new FARule(newStartState, null, state);
		})
		const rules = oldRules.concat(rulesForMoreThanOne, rulesForEmpty, new FARule(newStartState, null, oldStartState));
		return new NFADesign(newStartState, acceptStates, new NFARuleBook(rules));
	}
}

module.exports = {
  Empty,
  Literal,
  Choose,
  Concatenate,
  Repeat
};
