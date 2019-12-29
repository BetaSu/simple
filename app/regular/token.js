class Pattern {
    bracket(outerPrecedence) {
        const str = this.toString();
        if (this.precedence < outerPrecedence) {
            return '(' + str + ')';
        }
        return str;
    }   
}

class Empty extends Pattern {
    precedence = 3;
    toString() {
        return '';
    }
}

class Literal extends Pattern {
    precedence = 3;
    constructor(character) {
        super(character);
        this.character = character;
    }
    toString() {
        return this.character;
    }
}

class Concatenate extends Pattern {
    precedence = 1;
    constructor(...firstAndSecond) {
        super(...firstAndSecond);
        this.firstAndSecond = firstAndSecond;
    }
    toString() {
        return this.firstAndSecond.map(pattern => pattern.bracket(this.precedence)).join('');
    }
}

class Choose extends Pattern {
    precedence = 0;
    constructor(...firstAndSecond) {
        super(...firstAndSecond);
        this.firstAndSecond = firstAndSecond;
    }
    toString() {
        return this.firstAndSecond.map(pattern => pattern.bracket(this.precedence)).join('|');
    }
}

class Repeat extends Pattern {
    precedence = 2;
    constructor(pattern) {
        super(pattern);
        this.pattern = pattern;
    }
    toString() {
        return this.pattern.bracket(this.precedence) + '*';
    }
}

module.exports = {
    Empty,
    Literal,
    Choose,
    Concatenate,
    Repeat
}