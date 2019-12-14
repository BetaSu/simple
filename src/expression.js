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

/** 
 * 赋值表达式
 * 如果赋值表达式能规约，对其规约的结果是一个规约了的赋值语句和一个没有改变的环境。
 * 如果赋值表达式不能规约，那么就更新环境把这个表达式与赋值的变量关联起来，得到的结果是一个 do-nothing 语句和一个新的环境
*/
class Assign extends Struc {
  constructor(name, expression) {
    super(true);
    this.expression = expression;
    this.name = name;
  }
  reduce(env) {
    const {expression: exp, name} = this;
    if (exp.reducible()) {
      return [new Assign(name, exp.reduce(env)), env];
    }
    return [new DoNothing(), {...env, [name]: exp}];
  }
  toString() {
    const {name, expression} = this;
    return `var ${name} = ${expression}`;
  }
}

// 变量，规约成当前环境变量对应的值
class Variable extends Struc {
  constructor(name) {
    super(true);
    this.name = name;
  }
  toString() {
    return `var ${this.name}`;
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
  Assign,
  Variable
}