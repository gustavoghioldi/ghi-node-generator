"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the glorious ${chalk.red(
          "generator-ghi-node-generator"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "project name?"
      },
      {
        type: "input",
        name: "contextName",
        message: "Context Name?"
      },
      {
        type: "input",
        name: "contextPort",
        message: "Context Port?"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.spawnCommand("mkdir", [this.props.projectName]);
    this.fs.copy(
      this.templatePath("nodeStandard/"),
      this.destinationPath("./" + this.props.projectName)
    );
    this.fs.copyTpl(
      this.templatePath("nodeStandard/package.json"),
      this.destinationPath("./" + this.props.projectName + "/package.json"),
      { projectName: this.props.projectName }
    );

    this.fs.copyTpl(
      this.templatePath("nodeStandard/context/definitions/default.js"),
      this.destinationPath(
        "./" + this.props.projectName + "/context/definitions/default.js"
      ),
      {
        contextName: this.props.contextName,
        contextPort: this.props.contextPort
      }
    );

    this.spawnCommand("git", ["init", this.props.projectName]);
  }
};
