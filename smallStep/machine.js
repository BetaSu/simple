// 小步语义执行的虚拟机，执行规约过程
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
  console() {
    const envFormat = {};
    Object.keys(this.env).forEach(key => {
      envFormat[key] = this.env[key].value;
    })
    console.log(`${this.statement} \nenv：${JSON.stringify(envFormat)}\n`);
  }
  run() {
    console.log('------------开始解析代码------------');
    while(this.statement.reducible()) {
      this.console();
      this.step();
    }
    this.console();
    console.log('------------结束解析代码------------');
  }
}