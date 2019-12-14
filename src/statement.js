const {Bool} = require('./dataStructure');

// 语句

/** 
 * 条件语句
 * 如果条件能规约，规约为一个结果和未改变的环境
 * 如果条件规约为true，规约为结果语句和未改变的环境
 * 如果条件规约为false，规约为else语句和未改变的环境
*/
class If {
  constructor(condition, consequence, alternative) {
    this.condition = condition;
    this.consequence = consequence;
    this.alternative = alternative;
  }
  reducible() {
    return true;
  }
  reduce(env) {
    if (this.condition.reducible()) {
      return [new If(this.condition.reduce(env), this.consequence, this.alternative), env];
    }
    if (this.condition.value === new Bool(true).value) {
      return [this.consequence, env];
    }
    return [this.alternative, env];
  }
  toString() {
    const {condition, consequence, alternative} = this;
    return `if (${condition}) { #${consequence} } else { #${alternative} }`;
  }
}

module.exports = {
  If
}