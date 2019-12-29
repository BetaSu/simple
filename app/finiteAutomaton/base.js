class FARule {
  // 如果character为null，则表示是NFA的自由移动（free move）状态，代表初始时有可能为几个状态中的一个
  constructor(state, character, nextState) {
    this.state = state;
    this.character = character;
    this.nextState = nextState;
  }
  // 是否可以应用于
  applyTo(state, character) {
    return this.state === state && this.character === character;
  }
  follow() {
    // console.log('next:', this.nextState);
    return this.nextState;
  }
}

module.exports = {
  FARule
}