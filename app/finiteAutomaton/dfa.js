/** 
 * @description 确定性有限状态机（Deterministic Finite Automaton）
 * 满足：
 * 没有冲突：一个状态对于同样的输入，有且只有1个输出
 * 没有遗漏：每个状态都必须针对每个可能的输入字符有至少一个规则
*/

// 批量设置规则
class DFARulebook {
  constructor(rules) {
    this.rules = rules;
  }
  nextState(state, character) {
    return this.ruleFor(state, character).follow();
  }
  ruleFor(state, character) {
    let rule;
    this.rules.some(curRule => {
      const result = curRule.applyTo(state, character);
      if (result) {
        rule = curRule;
      }
      return result;
    });
    return rule;
  }
}

class DFA {
  constructor(currentState, acceptState, ruleBook) {
    this.currentState = currentState;
    this.acceptState = acceptState;
    this.ruleBook = ruleBook;
  }
  accept() {
    const result = this.acceptState.includes(this.currentState);
    console.log('accept:', result);
    return result;
  }
  readCharacter(character) {
    this.currentState = this.ruleBook.nextState(this.currentState, character);
  }
  readString(string) {
    string.split('').forEach(str => this.readCharacter(str));
    return this;
  }
}

class DFADesign {
  constructor(startState, acceptState, ruleBook) {
    this.startState = startState;
    this.acceptState = acceptState;
    this.ruleBook = ruleBook;
  }
  toDFA() {
    return new DFA(this.startState, this.acceptState, this.ruleBook);
  }
  accept(string) {
    return this.toDFA().readString(string).accept();
  }
}

module.exports = {
  DFARulebook,
  DFA,
  DFADesign
}