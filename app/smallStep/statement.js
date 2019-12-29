const {Bool} = require('./dataStructure');
const Struc = require('./base');

/**
 * 语句
 * 所有可规约语句规约的结果都是 [规约结果, 环境]
 */
class StateStruc extends Struc {
  isDoNothing() {
    return Object.getPrototypeOf(this).constructor === DoNothing;
  }
}
/** 
 * 条件语句
 * 如果条件能规约，规约为一个结果和未改变的环境
 * 如果条件规约为true，规约为结果语句和未改变的环境
 * 如果条件规约为false，规约为else语句和未改变的环境
*/
class If extends StateStruc {
  constructor(condition, consequence, alternative) {
    super(true);
    this.condition = condition;
    this.consequence = consequence;
    this.alternative = alternative;
  }
  reduce(env) {
    if (this.condition.reducible()) {
      return [new If(this.condition.reduce(env), this.consequence, this.alternative), env];
    }
    if (this.condition.isEqual(new Bool(true))) {
      return [this.consequence, env];
    }
    return [this.alternative, env];
  }
  toString() {
    const {condition, consequence, alternative} = this;
    return `if (${condition}) { ${consequence} } else { ${alternative} }`;
  }
}

// 用于语句（不是表达式）的最后一步规约，规约成不可规约结果
class DoNothing extends StateStruc {
  constructor() {
    super(false);
  }
  toString() {
    return 'do-nothing';
  }
}

/** 
 * 赋值
 * 如果赋值能规约，对其规约的结果是一个规约了的赋值语句和一个没有改变的环境。
 * 如果赋值不能规约，那么就更新环境把这个表达式与赋值的变量关联起来，得到的结果是一个 do-nothing 语句和一个新的环境
*/
class Assign extends StateStruc {
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

/** 
 * 依次执行2条语句
 * 如果第一条语句是do-nothing，就规约为第二条语句和原始环境
 * 如果第一条句不是do-nothing，就对其规约，得到的结果是一个新的序列（规约后的第一条语句，第二条语句）和规约后的环境
*/
class Sequence extends StateStruc {
  constructor(first, seconed) {
    super(true);
    this.first = first;
    this.seconed = seconed;
  }
  reduce(env) {
    const {first, seconed} = this;
    if (first.isDoNothing()) {
      return [seconed, env];
    }
    const [firstReduceResult, firstReduceResultEnv] = first.reduce(env);
    return [new Sequence(firstReduceResult, seconed), firstReduceResultEnv];
  }
  toString() {
    return `${this.first}; \n${this.seconed};`
  }
}

module.exports = {
  If,
  Assign,
  DoNothing,
  Sequence
}