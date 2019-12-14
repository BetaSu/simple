// 虚拟机，执行规约过程
module.exports = class Machine {
  constructor(statement, env = {}) {
    this.statement = statement;
    this.env = env;
    this.run();
  }
  step() {
    const {statement, env} = this;
    const result = statement.reduce(env);
    if (Array.isArray(result)) {
      return [this.statement, this.env] = result;
    }
    this.statement = result;
  }
  run() {
    console.log('开始解析代码。。。。。。。。');
    while(this.statement.reducible()) {
      console.log(`表达式：${this.statement} 环境变量：${JSON.stringify(this.env)}`);
      this.step();
    }
    console.log(`表达式：${this.statement} 环境变量：${JSON.stringify(this.env)}`);
    console.log('结束解析代码。。。。。。。。');
  }
}