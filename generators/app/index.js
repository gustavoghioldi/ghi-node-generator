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

    const prompts = [{
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
      },
      {
        type: "confirm",
        name: "mongo",
        message: "Use mongo?"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.props.mongo);

    const pkgJson = {
      dependencies: {
        "body-parser": "^1.18.3",
        compression: "^1.7.2",
        cors: "^2.8.4",
        debug: "^3.1.0",
        express: "^4.16.3",
        "express-routemap": "^1.1.0",
        ioredis: "^4.10.0",
        lodash: "^4.17.11",
        request: "^2.88.0",
        "request-promise": "^4.2.4"
      }
    };

    this.spawnCommand("mkdir", [this.props.projectName]);

    this.fs.copy(
      this.templatePath("nodeStandard/"),
      this.destinationPath("./" + this.props.projectName)
    );

    if (this.props.mongo) {
      pkgJson.dependencies.mongoose = "^5.0.8";

      this.fs.copyTpl(
        this.templatePath("libMongoose/"),
        this.destinationPath("./" + this.props.projectName + "/app/util")
      );

      this.fs.copyTpl(
        this.templatePath("mongooseFiles/controller.js"),
        this.destinationPath(
          "./" +
            this.props.projectName +
            "/app/controllers/crud-example-controller.js"
        )
      );

      this.fs.copyTpl(
        this.templatePath("mongooseFiles/facade.js"),
        this.destinationPath(
          "./" + this.props.projectName + "/app/facades/crud-example-facade.js"
        )
      );

      this.fs.copyTpl(
        this.templatePath("mongooseFiles/schema.js"),
        this.destinationPath(
          "./" + this.props.projectName + "/app/schemas/crud-example-schema.js"
        )
      );
    }

    this.fs.copyTpl(
      this.templatePath("nodeStandard/package.json"),
      this.destinationPath("./" + this.props.projectName + "/package.json"),
      {
        projectName: this.props.projectName
      }
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

    this.fs.extendJSON(
      this.destinationPath("./" + this.props.projectName + "/package.json"),
      pkgJson
    );

    this.spawnCommand("git", ["init", this.props.projectName]);
  }
};
