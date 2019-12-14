// 基础结构
module.exports = class Struc {
  constructor(reducible) {
    this._reducible = reducible;
  }
  reducible() {
    return this._reducible;
  }
}