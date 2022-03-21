class Prompt {
  constructor(type, name, message) {
    this.type = type;
    this.name = name;
    this.message = message;
  }
}

class Input extends Prompt {
  constructor(name, message, when) {
    super('input', name, message);
    this.when = when;
  }
}

class List extends Prompt {
  constructor(name, message, choices, when) {
    super('list', name, message);
    this.choices = choices;
    this.when = when;
  }
}

module.exports = {
  Input,
  List
}