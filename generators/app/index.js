const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Initializing...");

    this.addFile = function (fileName, title) {
      console.log(`${fileName}`);

      if (title) {
        this.fs.copyTpl(
          this.templatePath(`${fileName}`),
          this.destinationPath(`${fileName}`),
          { title }
        );

        return;
      }

      this.fs.copyTpl(
        this.templatePath(`${fileName}`),
        this.destinationPath(`${fileName}`)
      );
    };
  }

  async prompting() {
    this.answers = await this.prompt({
      type: "input",
      name: "name",
      message: "Name of project",
      default: this.appname,
    });

    this.log(`Name of project: ${this.answers.name}`);
  }

  async createFiles() {
    this.destinationRoot(this.answers.name);
    this.addFile("Readme.md", this.answers.name);
    this.addFile("tsconfig.json");
    this.addFile(".gitignore");
    this.addFile(".github/workflow/cd.yml", this.answers.name);
    this.addFile("package.json", this.answers.name);
    this.addFile("tests/tsconfig.json");
    this.addFile("tests/services/exampleService.test.ts");
    this.addFile("src/index.ts");
    this.addFile("src/services/exampleService.ts");
    this.addFile("jest.config.ts");
  }

  async installingDependencies() {
    this.log("Installing dependecies");
    await this.addDevDependencies(["typescript", "@types/jest", "@types/node"]);
    await this.addDependencies(["jest", "ts-node", "ts-jest"]);
  }
};
