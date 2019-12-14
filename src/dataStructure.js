class Num {
  constructor(value) {
    this.value = value;
  }
  // 是否可被规约
  reducible() {
    return false;
  }
  toString() {
    return `${this.value}`;
  }
}

class Bool {
  constructor(value) {
    this.value = value;
  }
  reducible() {
    return false;
  }
  toString() {
    return `${this.value}`;
  }
}

// 用于语句（不是表达式）的最后一步规约，规约成不可规约结果
class DoNothing {
  toString() {
    return 'do-nothing';
  }
  reducible() {
    return false;
  }
}

// 变量，规约成当前环境变量对应的值
class Variable {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return `var ${name}`;
  }
  reducible() {
    return true;
  }
  // 变量名只能映射到不可规约的值上
  reduce(env) {
    return env[this.name];
  }
}

module.exports = {
  Num,
  Bool,
  DoNothing,
  Variable
}
