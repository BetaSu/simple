// 表达式
const {Num, Bool, DoNothing} = require('./dataStructure');

// 增
class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  reducible() {
    return true;
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
class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  reducible() {
    return true;
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
class LessThan {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  reducible() {
    return true;
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
class Assign {
  constructor(name, expression) {
    this.expression = expression;
    this.name = name;
  }
  reducible() {
    return true;
  }
  reduce(env) {
    const {expression: exp, name} = this;
    if (exp.reducible()) {
      return [new Assign(name, exp.reduce(env)), env];
    }
    return [new DoNothing(), {...env, [name]: exp.value}];
  }
  toString() {
    const {name, expression} = this;
    return `var ${name} - #${expression}`;
  }
}

module.exports = {
  Add,
  Multiply,
  LessThan,
  Assign
}