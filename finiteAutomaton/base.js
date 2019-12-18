class FARule {
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
    console.log('next:', this.nextState);
    return this.nextState;
  }
}

module.exports = {
  FARule
}