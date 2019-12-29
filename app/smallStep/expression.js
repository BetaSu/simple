// 表达式
const {Num, Bool} = require('./dataStructure');
const {DoNothing} = require('./statement');
const Struc = require('./base');

// 增
class Add extends Struc {
  constructor(left, right) {
    super(true);
    this.left = left;
    this.right = right;
  }
  reduce(env) {
    const {left, right} = this;
    if (left.reducible()) {
      return new Add(left.reduce(env), right);
    }
    if (right.reducible()) {
      return new Add(left, right.reduce(env));
    }
    return new Num(left.value + right.value);
  }
  toString() {
    return `${this.left} + ${this.right}`;
  }
}
// 乘
class Multiply extends Struc {
  constructor(left, right) {
    super(true);
    this.left = left;
    this.right = right;
  }
  reduce(env) {
    const {left, right} = this;
    if (left.reducible()) {
      return new Multiply(left.reduce(env), right);
    }
    if (right.reducible()) {
      return new Multiply(left, right.reduce(env));
    }
    return new Num(left.value * right.value);
  }
  toString() {
    return `${this.left} * ${this.right}`;
  }
}
// 小于
class LessThan  extends Struc {
  constructor(left, right) {
    super(true);
    this.left = left;
    this.right = right;
  }
  reduce(env) {
    const {left, right} = this;
    if (left.reducible()) {
      return new LessThan(left.reduce(env), right);
    }
    if (right.reducible()) {
      return new LessThan(left, right.reduce(env));
    }
    return new Bool(left.value < right.value);
  }
  toString() {
    return `${this.left} < ${this.right}`;
  }
}

// 变量，规约成当前环境变量对应的值
class Variable extends Struc {
  constructor(name) {
    super(true);
    this.name = name;
  }
  toString() {
    return `${this.name}`;
  }
  // 变量名只能映射到不可规约的值上
  reduce(env) {
    return env[this.name];
  }
}

module.exports = {
  Add,
  Multiply,
  LessThan,
  Variable
}