/** 
 * @description 非确定性有限状态机
 * 一台DFA的下一个状态总是完全由他的当前状态和输入决定，但是一台NFA在向下一个状态转移时会有多种可能性，并且有时候根本无法转移
 * 如果存在某条路径能让NFA按照他的某些规则执行并终止于一个接受状态，那他就能接受这个字符串
*/

class NFARuleBook {
  constructor(rules) {
    this.rules = rules;
  }
  nextStates(states, character) {
    
  }
}