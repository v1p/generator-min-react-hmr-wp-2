'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const {resolve} = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Minimal React JS app with Webpack2 and HMR' + chalk.red('generator-min-react-hmr-wp-2') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your name',
        default: 'Vipul Bhopal'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.props.name}/package.json`), {
        name: this.props.name,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath(`${this.props.name}/.babelrc`)
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${this.props.name}/README.md`)
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath(`${this.props.name}/webpack.config.js`)
    );
    this.fs.copyTpl(
      this.templatePath('build/index.html'),
      this.destinationPath(`${this.props.name}/build/index.html`)
    );
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath(`${this.props.name}/src/index.js`)
    );
    this.fs.copyTpl(
      this.templatePath('src/components/App/index.js'),
      this.destinationPath(`${this.props.name}/src/components/App/index.js`)
    );
  }

  install() {
    const appDir = resolve(process.cwd(), this.props.name);
    process.chdir(appDir);
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

  end() {
    this.log('All Set! Now run `yarn start');
  }
};
