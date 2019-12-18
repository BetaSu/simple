const Struc = require('./base');

class DataStruc extends Struc {
  constructor(value) {
    super(false);
    this.value = value;
  }
  isEqual(data) {
    return Object.getPrototypeOf(data) === Object.getPrototypeOf(this) && data.value === this.value;
  }
  toString() {
    return `${this.value}`;
  }
}

class Num extends DataStruc {
  
}

class Bool extends DataStruc {
  
}

module.exports = {
  Num,
  Bool
}
