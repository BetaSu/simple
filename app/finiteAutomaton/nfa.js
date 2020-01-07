const {Set} = require('../utils');

/** 
 * @description 非确定性有限状态机
 * 一台DFA的下一个状态总是完全由他的当前状态和输入决定，但是一台NFA在向下一个状态转移时会有多种可能性，并且有时候根本无法转移
 * 如果存在某条路径能让NFA按照他的某些规则执行并终止于一个接受状态，那他就能接受这个字符串
*/

class NFARuleBook {
  constructor(rules) {
    this.rules = rules;
  }
  // 处于 states 中的几种状态之一，读取了一个字符后，可能的下一个状态是？
  nextStates(states, character) {
    const result = new Set();
    states.forEach(state => {
      result.union(this.followRulesFor(state, character));
    })
    return result;
  }
  followRulesFor(state, character) {
    const follows = new Set();
    this.rules.forEach(curRule => {
      const canApply = curRule.applyTo(state, character);
      if (canApply) {
        follows.add(curRule.follow());
      }
    });
    return follows;
  }
  followFreeMoves(states) {
    states = Set.from(states);
    const moreStates = this.nextStates(states, null);
    if (states.isSuperset(moreStates)) {
      return states;
    }
    return this.followFreeMoves(states.union(moreStates));
  }
}

class NFA {
  constructor(currentStates, acceptStates, rulebook) {
    // 当前状态到获取需要使用自由移动后的值
    this._currentStates = currentStates;
    this.acceptStates = new Set(acceptStates);
    this.rulebook = rulebook;
  }
  get currentStates() {
    return this.rulebook.followFreeMoves(this._currentStates);
  }
  accepting() {
    return this.currentStates.intersection(this.acceptStates).size !== 0;
  }
  readCharacter(character) {
    this._currentStates = this.rulebook.nextStates(this.currentStates, character);
  }
  readString(string) {
    string.split('').forEach(str => {
      // console.log('read str', str);
      this.readCharacter(str);
    })
  }
}

class NFADesign {
  constructor(startState, acceptStates, rulebook) {
    this.startState = startState;
    this.acceptStates = acceptStates;
    this.rulebook = rulebook;
  }
  toNFA(currentStates = [this.startState]) {
    return new NFA(currentStates, this.acceptStates, this.rulebook);
  }
  accepts(string) {
    const nfa = this.toNFA();
    nfa.readString(string);
    return nfa.accepting();
  }
}

module.exports = {
  NFARuleBook,
  NFA,
  NFADesign
}