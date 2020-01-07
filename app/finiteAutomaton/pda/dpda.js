class DPDARulebook {
	constructor(rules) {
		this.rules = rules;
	}
	nextConfiguration(configuration, character) {
    const rule = this.ruleFor(configuration, character);
		if (!rule) return;
		return rule.follow(configuration);
	}
	ruleFor(configuration, character) {
		for (let i = 0; i < this.rules.length; i++) {
			const rule = this.rules[i];
			if (rule.applyTo(configuration, character)) {
				return rule;
			}
		}
	}
}

class DPDA {
  constructor(currentConfiguration, acceptStates, rulebook) {
    this.currentConfiguration = currentConfiguration;
    this.acceptStates = acceptStates;
    this.rulebook = rulebook;
  }
  accepting() {
    return this.acceptStates.includes(this.currentConfiguration.state);
  }
  readCharacter(character) {
    this.currentConfiguration = this.rulebook.nextConfiguration(this.currentConfiguration, character);
    return this;
  }
  readString(string) {
    return string.split('').forEach(str => this.readCharacter(str));
  }
}

module.exports = {
  DPDARulebook,
  DPDA
}