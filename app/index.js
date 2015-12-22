var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    var cwd = this.env.cwd;
    this.commands = this.fs.exists(cwd + '/ho.json') ? require(cwd + '/ho.json') : {};
    var description ='Available commands to invoke:\n\n';
    for(var command in this.commands) {
      description += '           + ' + command;
      description += ' (yo ' + this.commands[command].generator;
      description += this.commands[command].subgen ? ':' + this.commands[command].subgen : '';
      description += ')\n';
    }
    description += '\n         ';

    this.argument('command', {
      type: String,
      required: true,
      desc: description
    });
  },

  initializing: function() {},
  prompting: {},
  configuring: {},
  default: {
    invoke: function() {
      var chosen = this.commands[this.args.shift()];
      var command = [
        'yo',
        chosen.generator +
        (chosen.subgen ? ':' + chosen.subgen : '')
      ].concat(this.args).join(' ');
    }
  },
  writing: {},
  conflicts: {},
  install: {},
  end: {}
});
